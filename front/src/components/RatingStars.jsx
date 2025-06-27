import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

/*Composant d’affichage et de sélection d’une note par étoiles.*/

export default function RatingStars({ initialRating = 0, max = 5, onRate }) {
  // Étoile survolée par la souris
  const [hovered, setHovered] = useState(0);
  // Note actuellement sélectionnée
  const [rating, setRating] = useState(initialRating);

  // À chaque changement de la prop initialRating, on met à jour le state
  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  // Quand l’utilisateur clique sur une étoile
  function handleClick(value) {
    setRating(value);
    if (onRate) {
      onRate(value);
    }
  }

  return (
    <div className="rating-stars">
      {Array.from({ length: max }, (_, i) => {
        const value = i + 1;
        const filled = value <= (hovered || rating);
        return (
          <i
            key={value}
            className={`bi ${filled ? "bi-star-fill" : "bi-star"}`}
            onMouseEnter={() => setHovered(value)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => handleClick(value)}
            style={{ cursor: "pointer" }}
            aria-label={`${value} étoile${value > 1 ? "s" : ""}`}
          />
        );
      })}
    </div>
  );
}

RatingStars.propTypes = {
  initialRating: PropTypes.number,
  max: PropTypes.number,
  onRate: PropTypes.func,
};
