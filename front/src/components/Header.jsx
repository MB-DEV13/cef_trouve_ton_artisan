import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Header() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCategories(res.data);
        } else {
          console.error("Réponse inattendue pour /categories:", res.data);
        }
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des catégories", err);
      });
  }, []);

  return (
    <header className="bg-white shadow-sm mb-4">
      <nav className="navbar navbar-expand-lg container">
        <Link className="navbar-brand" to="/">
          <img src="/logo.png" alt="Logo" height="40" />
        </Link>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto">
            {categories.map((cat) => (
              <li key={cat.id} className="nav-item">
                <Link
                  className="nav-link"
                  to={`/artisans?categorieId=${cat.id}`}
                >
                  {cat.nom}
                </Link>
              </li>
            ))}
          </ul>
          <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Recherche artisan…"
            />
            <button className="btn btn-outline-primary">Go</button>
          </form>
        </div>
      </nav>
    </header>
  );
}
