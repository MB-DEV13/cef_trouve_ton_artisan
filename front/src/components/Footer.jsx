export default function Footer() {
  return (
    <footer className="bg-light py-4 mt-5">
      <div className="container">
        <div className="mb-3">
          <a href="/mentions-legales">Mentions légales</a> •
          <a href="/donnees-personnelles"> Données personnelles</a> •
          <a href="/accessibilite"> Accessibilité</a> •
          <a href="/cookies"> Cookies</a>
        </div>
        <address>
          101 cours Charlemagne · CS 20033 · 69269 LYON CEDEX 02 · France
          <br />
          +33 (0)4 26 73 40 00
        </address>
      </div>
    </footer>
  );
}
