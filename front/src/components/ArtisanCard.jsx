// src/components/ArtisanCard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles/artisan-card.scss";

/**
 * Affiche une carte d’artisan réutilisable.
 * - Clique sur la carte → navigue vers /artisans/:id
 * - Montre spécialité, photo (si fournie), nom, note et ville.
 */
export default function ArtisanCard({
  id,
  nom,
  specialite,
  note,
  ville,
  photo,
}) {
  const navigate = useNavigate();

  return (
    <div className="col-lg-4 col-md-6">
      <div
        className="card artisan-card h-100"
        onClick={() => navigate(`/artisans/${id}`)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === "Enter" && navigate(`/artisans/${id}`)}
      >
        <div className="card-body position-relative d-flex flex-column">
          {/* 1) Spécialité en haut à droite */}
          <span className="speciality">{specialite}</span>

          {/* 2) Photo sous la spécialité, alignée bas-droite */}
          {photo && (
            <div className="profile-img">
              <img src={photo} alt={`Photo de ${nom}`} />
            </div>
          )}

          {/* 3) Nom, note (étoiles) et ville alignés à gauche */}
          <h5 className="card-title">{nom}</h5>
          <div className="rating my-2">
            {Array.from({ length: 5 }, (_, i) => {
              const full = i < Math.floor(note);
              const half = !full && i < note;
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
                  aria-hidden="true"
                />
              );
            })}
          </div>
          <p className="text-muted mb-0">{ville}</p>
        </div>
      </div>
    </div>
  );
}

ArtisanCard.propTypes = {
  /** Identifiant unique de l’artisan */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** Nom complet de l’artisan */
  nom: PropTypes.string.isRequired,
  /** Spécialité affichée sur la carte */
  specialite: PropTypes.string.isRequired,
  /** Note moyenne (nombre entre 0 et 5) */
  note: PropTypes.number.isRequired,
  /** Ville de l’artisan */
  ville: PropTypes.string.isRequired,
  /** URL de la photo de profil (facultatif) */
  photo: PropTypes.string,
};

ArtisanCard.defaultProps = {
  photo: null,
};
