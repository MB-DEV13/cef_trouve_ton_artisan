import React, { useEffect, useState } from "react";
import api from "../services/api";
import ArtisanCard from "../components/ArtisanCard";
import "../styles/home.scss";

//Affiche les 3 artisans “du mois”

export default function Home() {
  const [topArtisans, setTopArtisans] = useState([]);

  useEffect(() => {
    api
      .get("/artisans", { params: { top: true } })
      .then((res) => {
        setTopArtisans(Array.isArray(res.data) ? res.data.slice(0, 3) : []);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des artisans du mois :", err);
        setTopArtisans([]);
      });
  }, []);

  const steps = [
    { number: 1, text: "Choisir la catégorie d'artisanat dans le menu." },
    { number: 2, text: "Sélectionner un artisan." },
    { number: 3, text: "Remplir le formulaire de contact." },
    { number: 4, text: "Recevoir une réponse sous 48 h." },
  ];

  return (
    <>
      {/* ---- Section “Comment ça marche” ---- */}

      <section className="steps-section py-5">
        <div className="container">
          <h1 className="section-title text-start mb-5 underline-green">
            Comment trouver mon artisan ?
          </h1>
          <div className="row align-items-center">
            {/* Liste des étapes */}
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
            {/* Illustration */}
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

      {/* ----  Section “Artisans du mois”  ---- */}

      <section className="top-section py-5 bg-white">
        <div className="container-fluid px-0">
          <div className="container">
            <h2 className="section-title text-start underline-red">
              Artisans du mois :
            </h2>

            {/* Liste des cartes */}
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
