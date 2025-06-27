import { Link } from "react-router-dom";
import "../styles/footer.scss";

/* Composant Footer */

export default function Footer() {
  const logoUrl = "/img/logo-blanc.png";

  return (
    <footer className="site-footer">
      {/* Bulle blanche arrondie en haut du footer */}
      <div className="footer-bubble" />

      {/* Logo avec flèche */}
      <div className="footer-logo">
        <img src={logoUrl} alt="Logo Trouve ton artisan" />
      </div>

      {/* Adresse et téléphone */}
      <div className="footer-main container">
        <div className="footer-address">
          <h5>LYON</h5>
          <p>
            101 cours Charlemagne
            <br />
            CS 20033
            <br />
            69269 LYON CEDEX 02
          </p>
          <p className="footer-phone">
            <i className="bi bi-telephone-fill me-2" aria-hidden="true" />
            +33 (0)4 26 73 40 00
          </p>
        </div>
      </div>

      {/* Séparateur blanc */}
      <div className="footer-separator" />

      {/* Liens légaux */}
      <div className="footer-links container">
        <ul>
          <li>
            <Link to="/loading">Cookies</Link>
          </li>
          <li>
            <Link to="/loading">Accessibilité</Link>
          </li>
          <li>
            <Link to="/loading">Mentions légales</Link>
          </li>
          <li>
            <Link to="/loading">Données personnelles</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
