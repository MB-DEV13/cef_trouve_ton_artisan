import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ListArtisans() {
  const [artisans, setArtisans] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    noteMin: "",
    categorieId: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  // Fonction stable pour interroger l'API
  const fetchArtisans = useCallback((f) => {
    api
      .get("/artisans", { params: f })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setArtisans(res.data);
        } else {
          console.error("Réponse inattendue pour /artisans:", res.data);
          setArtisans([]);
        }
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des artisans", err);
        setArtisans([]);
      });
  }, []);

  // Pré-remplir et charger à chaque changement de query string
  useEffect(() => {
    const qs = new URLSearchParams(location.search);
    const initial = {
      search: qs.get("search") || "",
      noteMin: qs.get("noteMin") || "",
      categorieId: qs.get("categorieId") || "",
    };
    setFilters(initial);
    fetchArtisans(initial);
  }, [location.search, fetchArtisans]);

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((f) => ({ ...f, [name]: value }));
  }

  return (
    <>
      {/* Zone filtres */}
      <div className="card mb-4 p-3">
        <div className="row g-2">
          <div className="col-md-3">
            <input
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              className="form-control"
              placeholder="Nom"
            />
          </div>
          <div className="col-md-2">
            <input
              name="noteMin"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={filters.noteMin}
              onChange={handleFilterChange}
              className="form-control"
              placeholder="Note ≥"
            />
          </div>
          <div className="col-md-3">
            <input
              name="categorieId"
              value={filters.categorieId}
              onChange={handleFilterChange}
              className="form-control"
              placeholder="Catégorie"
            />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-primary w-100"
              onClick={() => fetchArtisans(filters)}
            >
              Recherche
            </button>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-secondary w-100"
              onClick={() => {
                setFilters({ search: "", noteMin: "", categorieId: "" });
                fetchArtisans({});
              }}
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="row g-3">
        {artisans.map((a) => (
          <div key={a.id} className="col-lg-3 col-md-4">
            <div
              className="card h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/artisans/${a.id}`)}
            >
              <img
                src={a.photo_profil || "/placeholder.png"}
                className="card-img-top"
                alt={a.nom}
              />
              <div className="card-body">
                <h5 className="card-title">{a.nom}</h5>
                <p className="card-text">{a.specialite}</p>
                <p className="card-text">
                  <small>{a.ville}</small>
                </p>
                <p className="card-text">Note : {a.note}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
