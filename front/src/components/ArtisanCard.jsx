// src/components/ArtisanCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles/artisan-card.scss";

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
      >
        <div className="card-body position-relative d-flex flex-column">
          {/* 1) spécialité en haut à droite */}
          <span className="speciality">{specialite}</span>

          {/* 2) photo sous la spécialité (si présente) */}
          {photo && (
            <div className="profile-img">
              <img src={photo} alt={nom} />
            </div>
          )}

          {/* 3) nom, note & ville alignés à gauche */}
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
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  nom: PropTypes.string.isRequired,
  specialite: PropTypes.string.isRequired,
  note: PropTypes.number.isRequired,
  ville: PropTypes.string.isRequired,
  photo: PropTypes.string,
};

ArtisanCard.defaultProps = {
  photo: null,
};
