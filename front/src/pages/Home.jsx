// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import ArtisanCard from "../components/ArtisanCard";
import "../styles/home.scss";

export default function Home() {
  const [topArtisans, setTopArtisans] = useState([]);

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
          <h2 className="section-title text-start mb-4">
            Comment trouver mon artisan ?
          </h2>
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

      {/* Artisans du mois */}
      <section className="top-section py-5 bg-white">
        <div className="container-fluid px-0">
          <div className="container">
            <h2 className="section-title mb-4 text-start">
              Artisans du mois :
            </h2>
            <div className="cards-block row g-4">
              {topArtisans.map((a) => (
                <ArtisanCard
                  key={a.id}
                  id={a.id}
                  nom={a.nom}
                  specialite={a.specialite}
                  note={a.note}
                  ville={a.ville}
                  photo={a.photo_profil}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
