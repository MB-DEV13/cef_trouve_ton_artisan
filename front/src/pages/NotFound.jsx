import React from "react";
import { Link } from "react-router-dom";
import "../styles/notfound.scss";

// Page affichée lorsque l’utilisateur atteint une route inexistante (404).

export default function NotFound() {
  return (
    <>
      <div className="section-title text-start underline-red mb-4">
        <h1>Erreur de page ...</h1>
      </div>

      <div className="notfound-container">
        <div className="notfound-inner">
          {/* Illustration 404 */}
          <img
            src="/img/404-illustration.png"
            alt="Page non trouvée"
            className="notfound-illustration"
          />

          {/* Titre souligné en rouge */}
          <h2 className="section-title text-start underline-red mb-4">
            404 – Page non trouvée
          </h2>

          {/* Texte informatif */}
          <p className="notfound-text text-start">
            La page que vous recherchez n’existe pas.
          </p>

          {/* Lien de retour vers l’accueil */}
          <Link to="/" className="btn btn-primary notfound-button text-start">
            Retour à l’accueil <i className="bi bi-arrow-counterclockwise" />
          </Link>
        </div>
      </div>
    </>
  );
}
