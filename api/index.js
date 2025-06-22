// api/index.js
require("dotenv").config();
const express = require("express");
const { Sequelize } = require("sequelize");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const app = express();

// Configuration Sequelize
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

// Middlewares
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Limiteur pour /api/contact
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

  // Route de test
  app.get("/api/ping", (req, res) => res.json({ pong: true }));

  // **NOUVEAU** GET /api/categories
  app.get("/api/categories", async (req, res) => {
    try {
      const [results] = await sequelize.query(
        `SELECT id, nom
         FROM categorie
         ORDER BY nom;`
      );
      res.json(results);
    } catch (err) {
      console.error("Erreur /api/categories :", err);
      res.status(500).json({ error: "Impossible de charger les catégories" });
    }
  });

  // GET /api/artisans — liste jusqu’à 5 artisans
  app.get("/api/artisans", async (req, res) => {
    try {
      const [results] = await sequelize.query(
        `SELECT a.id, a.nom, a.note, a.photo_profil, a.ville,
                s.nom AS specialite, c.nom AS categorie
         FROM artisan a
         JOIN specialite s ON a.specialite_id = s.id
         JOIN categorie c ON s.categorie_id = c.id
         LIMIT 5;`
      );
      res.json(results);
    } catch (err) {
      console.error("Erreur /api/artisans :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

  // GET /api/artisans/:id — détail d’un artisan
  app.get("/api/artisans/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const [results] = await sequelize.query(
        `SELECT a.id, a.nom, a.note, a.photo_profil, a.ville, a.a_propos,
                a.email, a.site_web,
                s.id AS specialite_id, s.nom AS specialite,
                c.id AS categorie_id, c.nom AS categorie
         FROM artisan a
         JOIN specialite s ON a.specialite_id = s.id
         JOIN categorie c ON s.categorie_id = c.id
         WHERE a.id = :id;`,
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

  // POST /api/contact — envoi d’email à l’artisan
  app.post("/api/contact", contactLimiter, async (req, res) => {
    const { nom, email, objet, message, artisanId } = req.body;
    // TODO : ajouter express-validator pour valider et sanitize
    try {
      console.log(`Envoyer email à l’artisan #${artisanId} :
        De ${nom} <${email}> — ${objet}
        Message : ${message}`);
      res
        .status(201)
        .json({ success: true, message: "Email envoyé à l’artisan." });
    } catch (err) {
      console.error("Erreur /api/contact :", err);
      res.status(500).json({ error: "Erreur lors de l’envoi de l’email." });
    }
  });

  // Démarrage du serveur
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`API démarrée sur http://localhost:${PORT}`);
  });
}

start();
