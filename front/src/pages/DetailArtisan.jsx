import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import RatingStars from "../components/RatingStars";
import "../styles/detail-artisan.scss";

export default function DetailArtisan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [userRating, setUserRating] = useState(0);

  // État du formulaire de contact
  const [form, setForm] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
  });

  // Chargement des données de l’artisan
  useEffect(() => {
    api
      .get(`/artisans/${id}`)
      .then((res) => {
        setArtisan(res.data);
        setUserRating(res.data.note || 0);
      })
      .catch((err) => console.error("Erreur fetch artisan :", err))
      .finally(() => setLoading(false));
  }, [id]);

  // Soumettre une nouvelle note et mettre à jour la moyenne
  function handleRate(value) {
    api
      .post(`/artisans/${id}/rating`, { note: value })
      .then((res) => {
        if (res.data.newAverage != null) {
          setArtisan((a) => ({ ...a, note: res.data.newAverage }));
        }
        setUserRating(value);
      })
      .catch((err) => console.error("Erreur envoi note :", err));
  }

  // Mise à jour contrôlée des champs du formulaire
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  // Envoi du formulaire de contact
  function handleSubmit(e) {
    e.preventDefault();
    setStatus("Envoi en cours…");
    api
      .post("/contact", { ...form, artisanId: Number(id) })
      .then(() => setStatus("Message envoyé !"))
      .catch((err) => {
        console.error("Erreur contact :", err);
        setStatus("Erreur lors de l’envoi.");
      });
  }

  // Affiche un loader si on attend la réponse
  if (loading) return <p className="text-center mt-5">Chargement…</p>;
  if (!artisan) return null;

  return (
    <div className="detail-artisan">
      {/* --- INFOS + PHOTO + NOTE --- */}
      <div className="detail-card">
        <div className="detail-inner container">
          <div className="row g-4">
            {/* Colonne gauche : nom, étoiles, métadonnées */}
            <div className="col-lg-6 detail-info">
              <h1 className="section-title text-start underline-green mb-3">
                {artisan.nom}
              </h1>
              <div className="stars mb-3">
                {Array.from({ length: 5 }, (_, i) => {
                  const full = i < Math.floor(artisan.note);
                  const half = !full && i < artisan.note;
                  return (
                    <i
                      key={i}
                      className={
                        full
                          ? "bi bi-star-fill"
                          : half
                          ? "bi bi-star-half"
                          : "bi bi-star"
                      }
                    />
                  );
                })}
                <span className="average ms-2">
                  {(Math.round(artisan.note * 10) / 10).toFixed(1)}
                </span>
              </div>
              <p className="meta">
                <strong>Spécialité :</strong> {artisan.specialite}
              </p>
              <p className="meta">
                <strong>Localisation :</strong> {artisan.ville}
              </p>
              {artisan.site_web && (
                <p className="meta">
                  <strong>Site web :</strong>{" "}
                  <a
                    href={artisan.site_web}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {artisan.site_web}
                  </a>
                </p>
              )}
              <h5>À propos</h5>
              <p>{artisan.a_propos}</p>
            </div>

            {/* Colonne droite : photo + laisser une note */}
            <div className="col-lg-6 text-center">
              {artisan.photo_profil && (
                <div className="photo mb-3">
                  <img
                    src={artisan.photo_profil}
                    alt={artisan.nom}
                    className="rounded-circle"
                  />
                </div>
              )}
              <div className="leave-note mb-4">
                <p>Laissez une note :</p>
                <RatingStars initialRating={userRating} onRate={handleRate} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FORMULAIRE --- */}
      <div className="form-card-wrapper">
        <div className="form-card">
          <div className="container">
            <h2 className="section-title text-start underline-red mb-3">
              Contactez cet artisan :
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Votre nom */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="nom" className="col-md-4 col-form-label">
                  Votre nom :
                </label>
                <div className="col-md-8">
                  <input
                    id="nom"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Votre nom"
                    required
                  />
                </div>
              </div>

              {/* Votre email */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="email" className="col-md-4 col-form-label">
                  Votre email :
                </label>
                <div className="col-md-8">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Votre email"
                    required
                  />
                </div>
              </div>

              {/* Objet */}
              <div className="row mb-3 align-items-center">
                <label htmlFor="objet" className="col-md-4 col-form-label">
                  Objet :
                </label>
                <div className="col-md-8">
                  <input
                    id="objet"
                    name="objet"
                    value={form.objet}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Objet"
                    required
                  />
                </div>
              </div>

              {/* Votre message */}
              <div className="row mb-4">
                <label htmlFor="message" className="col-md-4 col-form-label">
                  Votre message :
                </label>
                <div className="col-md-8">
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Votre message"
                    required
                  />
                </div>
              </div>

              {/* Boutons de navigation et envoie */}
              <div className="row">
                <div className="col-md-4" />
                <div className="col-md-8 d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/artisans")}
                  >
                    Retour page artisans <i className="bi bi-arrow-left ms-1" />
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Envoyer ma demande <i className="bi bi-send ms-1" />
                  </button>
                </div>
              </div>

              {status && <p className="status mt-3">{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
