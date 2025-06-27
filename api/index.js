require("dotenv").config();
const express = require("express");
const { Sequelize } = require("sequelize");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

const app = express();

// 1. Connexion Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    logging: false,
  }
);

// 2. Middlewares
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const contactLimiter = rateLimit({
  windowMs: 60_000,
  max: 5,
  message: { error: "Trop de requêtes. Réessayez plus tard." },
});

async function start() {
  try {
    await sequelize.authenticate();
    console.log("✅ BDD connectée avec succès !");
  } catch (err) {
    console.error("❌ Impossible de se connecter à la BDD :", err);
    process.exit(1);
  }

  // 3.1 Test ping
  app.get("/api/ping", (req, res) => res.json({ pong: true }));

  // 3.2 GET /api/categories
  app.get("/api/categories", async (req, res) => {
    try {
      const [results] = await sequelize.query(
        `SELECT id, nom FROM categorie ORDER BY nom;`
      );
      res.json(results);
    } catch (err) {
      console.error("Erreur /api/categories :", err);
      res.status(500).json({ error: "Impossible de charger les catégories" });
    }
  });

  // 3.3 GET /api/specialites?categorieId=
  app.get("/api/specialites", async (req, res) => {
    try {
      const { categorieId } = req.query;
      let sql = `SELECT id, nom, categorie_id FROM specialite`;
      const replacements = {};
      if (categorieId) {
        sql += ` WHERE categorie_id = :categorieId`;
        replacements.categorieId = parseInt(categorieId, 10);
      }
      sql += ` ORDER BY nom;`;
      const [results] = await sequelize.query(sql, { replacements });
      res.json(results);
    } catch (err) {
      console.error("Erreur /api/specialites :", err);
      res.status(500).json({ error: "Impossible de charger les spécialités" });
    }
  });

  // 3.4 GET /api/artisans avec filtres dynamiques + top + limit
  app.get("/api/artisans", async (req, res) => {
    try {
      const { search, noteMin, ville, categorieId, top, limit } = req.query;
      const clauses = [];
      const repl = {};

      if (search) {
        clauses.push(`a.nom LIKE :search`);
        repl.search = `%${search}%`;
      }
      if (noteMin) {
        clauses.push(`a.note >= :noteMin`);
        repl.noteMin = parseFloat(noteMin);
      }
      if (ville) {
        clauses.push(`a.ville LIKE :ville`);
        repl.ville = `%${ville}%`;
      }
      if (categorieId) {
        clauses.push(`c.id = :categorieId`);
        repl.categorieId = parseInt(categorieId, 10);
      }
      if (top === "true") {
        clauses.push(`a.top = true`);
      }

      const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
      const sql = `
        SELECT
          a.id, a.nom, a.note, a.photo_profil, a.ville,
          s.nom AS specialite,
          c.nom AS categorie
        FROM artisan a
        JOIN specialite s ON a.specialite_id = s.id
        JOIN categorie c ON s.categorie_id = c.id
        ${where}
        ORDER BY a.nom
        LIMIT :limit
      `;
      repl.limit = parseInt(limit, 10) || 100;

      const [results] = await sequelize.query(sql, { replacements: repl });
      res.json(results);
    } catch (err) {
      console.error("Erreur /api/artisans :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

  // 3.5 GET /api/artisans/:id
  app.get("/api/artisans/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const [results] = await sequelize.query(
        `
        SELECT
          a.id, a.nom, a.note, a.photo_profil, a.ville, a.a_propos,
          a.email, a.site_web,
          s.id AS specialite_id, s.nom AS specialite,
          c.id AS categorie_id, c.nom AS categorie
        FROM artisan a
        JOIN specialite s ON a.specialite_id = s.id
        JOIN categorie c ON s.categorie_id = c.id
        WHERE a.id = :id;
        `,
        { replacements: { id } }
      );
      if (!results.length) {
        return res.status(404).json({ error: "Artisan non trouvé" });
      }
      res.json(results[0]);
    } catch (err) {
      console.error("Erreur /api/artisans/:id :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

  // 3.6 POST /api/contact — envoi direct à l'artisan
  app.post(
    "/api/contact",
    contactLimiter,
    body("nom").notEmpty(),
    body("email").isEmail(),
    body("objet").notEmpty(),
    body("message").notEmpty(),
    body("artisanId").isInt(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { nom, email, objet, message, artisanId } = req.body;

      try {
        // 1) Récupérer l'email de l'artisan en base
        const [rows] = await sequelize.query(
          "SELECT email FROM artisan WHERE id = :id",
          { replacements: { id: artisanId } }
        );
        if (!rows.length) {
          return res.status(404).json({ error: "Artisan non trouvé" });
        }
        const artisanEmail = rows[0].email;

        // 2) Créer le transporter SMTP
        let transporter;
        if (
          !process.env.SMTP_HOST ||
          !process.env.SMTP_USER ||
          !process.env.SMTP_PASS
        ) {
          // Fallback Ethereal
          const testAccount = await nodemailer.createTestAccount();
          transporter = nodemailer.createTransport({
            ...testAccount.smtp,
            auth: {
              user: testAccount.user,
              pass: testAccount.pass,
            },
          });
          console.log("⚠️ Using Ethereal account:", {
            user: testAccount.user,
            pass: testAccount.pass,
            smtp: testAccount.smtp,
          });
        } else {
          transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT, 10),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });
        }

        // Vérifier la configuration SMTP
        await transporter.verify();

        // 3) Envoi du mail à l'artisan
        const info = await transporter.sendMail({
          from: `"${nom}" <${email}>`,
          to: artisanEmail,
          subject: objet,
          text: message,
        });

        console.log("Message envoyé :", info.messageId);
        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) console.log("Preview URL:", previewUrl);

        res
          .status(201)
          .json({ success: true, message: "Email envoyé à l’artisan." });
      } catch (err) {
        console.error("Erreur /api/contact :", err);
        res.status(500).json({ error: "Erreur lors de l’envoi de l’email." });
      }
    }
  );

  // 4. Démarrage du serveur
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`API démarrée sur http://localhost:${PORT}`);
  });
}

start();
