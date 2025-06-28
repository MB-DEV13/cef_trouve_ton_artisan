import React from "react";
import { Link } from "react-router-dom";
import "../styles/notfound.scss";

// Page « En construction » affichée pour les routes non encore développées.

export default function UnderConstruction() {
  return (
    <>
      <div className="section-title text-start underline-red mb-4">
        <h1>Page non disponible ...</h1>
      </div>
      <div className="notfound-container">
        <div className="notfound-inner">
          {/* Illustration 404 */}
          <img
            src="/img/404-illustration.png"
            alt="Page en construction"
            className="notfound-illustration"
          />

          {/* Titre souligné en rouge */}
          <h2 className="section-title text-start underline-red mb-4">
            Page en construction
          </h2>

          {/* Message d’information */}
          <p className="notfound-text text-start">
            Veuillez patienter, cette page n'est pas encore disponible...
          </p>

          {/* Lien de retour */}
          <Link to="/" className="btn btn-primary notfound-button text-start">
            Retour à l’accueil <i className="bi bi-arrow-counterclockwise" />
          </Link>
        </div>
      </div>
    </>
  );
}
