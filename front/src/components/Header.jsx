import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/header.scss";

/* Composant Header */

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  /* Récupère les catégories au montage */
  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data || []))
      .catch((err) => console.error("Erreur chargement catégories :", err));
  }, []);

  /* Soumet la recherche et navigue vers /artisans */
  function handleSubmit(e) {
    e.preventDefault();
    const q = searchTerm.trim();
    navigate(`/artisans${q ? `?search=${encodeURIComponent(q)}` : ""}`);
    setOpen(false);
  }

  return (
    <>
      {/* En-tête fixe */}
      <header className="site-header">
        <div className="header-inner container">
          {/* Logo cliquable */}
          <Link to="/" className="logo">
            <img src="/img/Logo.png" alt="Logo Trouve ton artisan" />
          </Link>

          {/* Formulaire de recherche */}
          <form className="search-form desktop" onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="Recherche artisan…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Go</button>
          </form>

          {/* Bouton burger (mobile) */}
          <button
            className="burger-btn"
            aria-label="Ouvrir le menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            <i className="bi bi-list" />
          </button>

          {/* Liens de navigation */}
          <nav className={`nav-links${open ? " open" : ""}`}>
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/artisans?categorieId=${c.id}`}
                className="nav-link"
                onClick={() => setOpen(false)}
              >
                {c.nom}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Recherche mobile affichée sous le header */}
      <div className="mobile-search">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Recherche artisan…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Go</button>
        </form>
      </div>
    </>
  );
}
