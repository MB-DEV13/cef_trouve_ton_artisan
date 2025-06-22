// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/home.scss";

export default function Home() {
  const [topArtisans, setTopArtisans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/artisans", { params: { top: true } })
      .then((res) => setTopArtisans(res.data.slice(0, 3)))
      .catch(console.error);
  }, []);

  const steps = [
    { number: 1, text: "Choisir la catégorie d'artisanat dans le menu." },
    { number: 2, text: "Sélectionner un artisan." },
    { number: 3, text: "Remplir le formulaire de contact." },
    { number: 4, text: "Recevoir une réponse sous 48 h." },
  ];

  return (
    <>
      {/* Comment trouver mon artisan ? */}
      <section className="steps-section py-5">
        <div className="container">
          <h1 className="section-title text-center mb-5">
            Comment trouver mon artisan ?
          </h1>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="d-grid gap-3">
                {steps.map((s) => (
                  <div key={s.number} className="step-box p-3 d-flex">
                    <div className="step-number">{s.number}</div>
                    <div className="step-text ms-3">{s.text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img
                src="/img/home-illustration.png"
                alt="Illustration Comment trouver mon artisan"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Artisans du mois : plein écran */}
      <section className="top-section">
        <div className="container">
          <h2 className="section-title mb-4 text-start">Artisans du mois :</h2>
          <div className="row g-4">
            {topArtisans.map((a) => (
              <div key={a.id} className="col-md-4">
                <div
                  className="card top-card h-100"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/artisans/${a.id}`)}
                >
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between mb-2">
                      <h5 className="card-title mb-0">{a.nom}</h5>
                      <small className="text-muted">{a.specialite}</small>
                    </div>
                    <div className="rating mb-2">
                      {"★".repeat(Math.floor(a.note))}
                      {a.note % 1 >= 0.5 ? "½" : ""}
                    </div>
                    <p className="card-text mt-auto">
                      <small className="text-muted">{a.ville}</small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
