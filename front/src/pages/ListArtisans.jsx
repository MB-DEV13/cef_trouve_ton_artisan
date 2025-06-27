import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import ArtisanCard from "../components/ArtisanCard";
import "../styles/list-artisans.scss";

// Page de liste des artisans avec filtres.

export default function ListArtisans() {
  const [artisans, setArtisans] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [locationsList, setLocationsList] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    noteMin: "",
    categorieId: "",
    ville: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const fetchArtisans = useCallback(async (params) => {
    try {
      const response = await api.get("/artisans", { params });
      setArtisans(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Erreur chargement artisans :", err);
      setArtisans([]);
    }
  }, []);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategoriesList(res.data || []))
      .catch((err) => console.error("Erreur catégories :", err));

    api
      .get("/artisans")
      .then((res) => {
        const villes = Array.from(
          new Set(res.data.map((a) => a.ville).filter(Boolean))
        ).sort();
        setLocationsList(villes);
      })
      .catch((err) => console.error("Erreur villes :", err));

    const qs = new URLSearchParams(location.search);
    const initial = {
      search: qs.get("search") || "",
      noteMin: qs.get("noteMin") || "",
      categorieId: qs.get("categorieId") || "",
      ville: qs.get("ville") || "",
    };
    setFilters(initial);
    fetchArtisans(initial);
  }, [location.search, fetchArtisans]);

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  function handleSearch() {
    // Si tous les filtres sont vides, on affiche un message
    if (
      !filters.search &&
      !filters.noteMin &&
      !filters.categorieId &&
      !filters.ville
    ) {
      setErrorMsg("Veuillez remplir au moins un critère de recherche.");
      return;
    }
    setErrorMsg("");
    const query = new URLSearchParams(filters).toString();
    navigate(`/artisans?${query}`);
    fetchArtisans(filters);
  }

  return (
    <>
      {/* ---- FILTRES ---- */}
      <div className="filters-card mb-5 p-4">
        <div className="row g-2 mb-3">
          <div className="col-md-4">
            <input
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              className="form-control"
              placeholder="Par nom…"
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
          <div className="col-md-4">
            <select
              name="categorieId"
              value={filters.categorieId}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="">Toutes spécialités</option>
              {categoriesList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nom}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row g-2 align-items-center">
          <div className="col-md-4">
            <select
              name="ville"
              value={filters.ville}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="">Toutes villes</option>
              {locationsList.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div className="col-auto">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSearch}
            >
              <i className="bi bi-search me-1" /> Rechercher
            </button>
          </div>
          <div className="col-auto">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setFilters({
                  search: "",
                  noteMin: "",
                  categorieId: "",
                  ville: "",
                });
                setErrorMsg("");
                navigate("/artisans");
                fetchArtisans({});
              }}
            >
              <i className="bi bi-arrow-counterclockwise me-1" /> Tout afficher
            </button>
          </div>
        </div>

        {/* Affichage du message d’erreur si nécessaire */}
        {errorMsg && <p className="text-danger mt-2">{errorMsg}</p>}
      </div>

      {/* ---- CARDS ---- */}
      <div className="cards-block row g-4 py-4">
        <h2 className="section-title text-start underline-green">
          Résultats de la recherche
        </h2>
        {artisans.map((a) => (
          <ArtisanCard
            key={a.id}
            id={a.id}
            nom={a.nom}
            specialite={a.specialite}
            note={a.note}
            ville={a.ville}
            photo={a.photo_profil}
          />
        ))}
      </div>
    </>
  );
}
