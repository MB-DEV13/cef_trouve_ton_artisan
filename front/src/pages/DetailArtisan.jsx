import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function DetailArtisan() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  // State du formulaire
  const [form, setForm] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
  });

  // 1) Charger les données de l’artisan
  useEffect(() => {
    api
      .get(`/artisans/${id}`)
      .then((res) => {
        setArtisan(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger l’artisan.");
        setLoading(false);
      });
  }, [id]);

  // 2) Gestion du formulaire
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("Envoi en cours…");
    api
      .post("/contact", { ...form, artisanId: parseInt(id, 10) })
      .then(() => setStatus("Message envoyé !"))
      .catch(() => setStatus("Erreur lors de l’envoi."));
  }

  if (loading) return <p>Chargement…</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="row g-4">
      {/* Colonne gauche : infos */}
      <div className="col-lg-6">
        <h2>{artisan.nom}</h2>
        <img
          src={artisan.photo_profil || "/placeholder.png"}
          alt={artisan.nom}
          className="img-fluid rounded mb-3"
        />
        <p>Note : {artisan.note} ⭐</p>
        <p>Spécialité : {artisan.specialite}</p>
        <p>Ville : {artisan.ville}</p>
        {artisan.site_web && (
          <p>
            Site web :{" "}
            <a
              href={artisan.site_web}
              target="_blank"
              rel="noopener noreferrer"
            >
              {artisan.site_web}
            </a>
          </p>
        )}
        <h4>À propos</h4>
        <p>{artisan.a_propos}</p>
      </div>

      {/* Colonne droite : formulaire */}
      <div className="col-lg-6">
        <h4>Contactez cet artisan</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">Votre nom</label>
            <input
              name="nom"
              value={form.nom}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Votre email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Objet</label>
            <input
              name="objet"
              value={form.objet}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Envoyer
          </button>
        </form>
        {status && <p className="mt-3">{status}</p>}
      </div>
    </div>
  );
}
