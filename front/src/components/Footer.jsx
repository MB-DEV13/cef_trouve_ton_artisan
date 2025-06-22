import { Link } from "react-router-dom";
import "../styles/footer.scss";

export default function Footer() {
  const logoUrl = "/img/logo-blanc.png"; // à adapter

  return (
    <footer className="site-footer">
      {/* bulle blanche arrondie */}
      <div className="footer-bubble" />

      {/* logo + flèche */}
      <div className="footer-logo">
        <img src={logoUrl} alt="Logo Trouve ton artisan" />
      </div>

      {/* adresse centrée */}
      <div className="footer-main container">
        <div className="footer-address ">
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

      <div className="footer-separator"></div>

      <div className="footer-links container">
        <ul>
          <li>
            <Link to="/cookies">Cookies</Link>
          </li>
          <li>
            <Link to="/accessibilite">Accessibilité</Link>
          </li>
          <li>
            <Link to="/mentions">Mentions légales</Link>
          </li>
          <li>
            <Link to="/donnees">Données personnelles</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
