// src/pages/DetailArtisan.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/detail-artisan.scss";

export default function DetailArtisan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
  });

  useEffect(() => {
    api
      .get(`/artisans/${id}`)
      .then((res) => {
        setArtisan(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("Envoi en cours…");
    api
      .post("/contact", { ...form, artisanId: Number(id) })
      .then(() => setStatus("Message envoyé !"))
      .catch(() => setStatus("Erreur lors de l’envoi."));
  }

  if (loading) return <p className="text-center mt-5">Chargement…</p>;
  if (!artisan) return null;

  return (
    <div className="detail-artisan">
      <div className="detail-card">
        {/* Ce pseudo-élément fera le fond blanc plein largeur */}
        <div className="detail-inner container">
          <div className="row g-4">
            {/* Colonne gauche */}
            <div className="col-lg-6 detail-info">
              <h2 className="name">{artisan.nom}</h2>
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
                  <a href={artisan.site_web} target="_blank" rel="noopener">
                    {artisan.site_web}
                  </a>
                </p>
              )}
              <h5>À propos</h5>
              <p>{artisan.a_propos}</p>
            </div>
            {/* Colonne droite */}
            <div className="col-lg-6 detail-form">
              {artisan.photo_profil && (
                <div className="photo mb-3 text-center">
                  <img
                    src={artisan.photo_profil}
                    alt={artisan.nom}
                    className="rounded-circle"
                  />
                </div>
              )}
              <div className="leave-note mb-4 text-center">
                <p>Laissez une note :</p>
                <div className="stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <i key={i} className="bi bi-star" />
                  ))}
                </div>
              </div>

              <h5>Contactez cet artisan</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Votre email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    name="objet"
                    value={form.objet}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Objet"
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Votre message"
                    required
                  />
                </div>
                <div className="d-flex justify-content-between mt-4">
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
                {status && <p className="status mt-3">{status}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
