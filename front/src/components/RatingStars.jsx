// src/components/RatingStars.jsx
import React, { useState, useEffect } from "react";

export default function RatingStars({ initialRating = 0, max = 5, onRate }) {
  const [hovered, setHovered] = useState(0);
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  function handleClick(value) {
    setRating(value);
    if (onRate) onRate(value);
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
          />
        );
      })}
    </div>
  );
}
