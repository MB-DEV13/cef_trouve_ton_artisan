// src/components/Header.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/header.scss";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch(console.error);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const q = searchTerm.trim();
    navigate(`/artisans${q ? `?search=${encodeURIComponent(q)}` : ""}`);
    setOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner container">
          {/* logo */}
          <Link to="/" className="logo">
            <img src="/img/Logo.png" alt="Logo Trouve ton artisan" />
          </Link>

          {/* desktop search */}
          <form className="search-form desktop" onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="Recherche artisan…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Go</button>
          </form>

          {/* burger */}
          <button
            className="burger-btn"
            aria-label="Ouvrir le menu"
            onClick={() => setOpen((o) => !o)}
          >
            <i className="bi bi-list" />
          </button>

          {/* nav */}
          <nav className={`nav-links ${open ? "open" : ""}`}>
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

      {/* recherche mobile */}
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
