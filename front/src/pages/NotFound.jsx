// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import "../styles/notfound.scss";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-inner">
        <img
          src="/img/404-illustration.png"
          alt="Page non trouvée"
          className="notfound-illustration"
        />
        <h2 className="notfound-title">404 – Page non trouvée</h2>
        <p className="notfound-text">
          La page que vous recherchez n’existe pas.
        </p>
        <Link to="/" className="btn btn-primary notfound-button">
          Retour à l’accueil <i className="bi bi-arrow-turn-left ms-1" />
        </Link>
      </div>
    </div>
  );
}
