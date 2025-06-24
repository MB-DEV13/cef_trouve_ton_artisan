// src/pages/ListArtisans.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import ArtisanCard from "../components/ArtisanCard";
import "../styles/list-artisans.scss";

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
  const navigate = useNavigate();
  const location = useLocation();

  const fetchArtisans = useCallback((f) => {
    api
      .get("/artisans", { params: f })
      .then((res) => setArtisans(Array.isArray(res.data) ? res.data : []))
      .catch(() => setArtisans([]));
  }, []);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategoriesList(res.data))
      .catch(() => {});
    api
      .get("/artisans")
      .then((res) => {
        const villes = Array.from(
          new Set(res.data.map((a) => a.ville).filter(Boolean))
        ).sort();
        setLocationsList(villes);
      })
      .catch(() => {});

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
    setFilters((f) => ({ ...f, [name]: value }));
  }

  function handleSearch() {
    const query = new URLSearchParams(filters).toString();
    navigate(`/artisans?${query}`);
    fetchArtisans(filters);
  }

  return (
    <>
      {/* ---- FILTRES ---- */}
      <div className="filters-card mb-5 p-4">
        {/* Ligne 1 */}
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
              placeholder="Par note"
            />
          </div>
          <div className="col-md-4">
            <select
              name="categorieId"
              value={filters.categorieId}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="">Par spécialité</option>
              {categoriesList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nom}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ligne 2 */}
        <div className="row g-2 align-items-center">
          <div className="col-md-4">
            <select
              name="ville"
              value={filters.ville}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="">Par localisation</option>
              {locationsList.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div className="col-auto">
            <button className="btn btn-primary" onClick={handleSearch}>
              Recherche un artisan&nbsp;&nbsp;{" "}
              <i className="bi bi-search ms-1" />
            </button>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setFilters({
                  search: "",
                  noteMin: "",
                  categorieId: "",
                  ville: "",
                });
                navigate("/artisans");
                fetchArtisans({});
              }}
            >
              <i className="bi bi-arrow-counterclockwise me-1" />
              &nbsp;&nbsp;Afficher tous les artisans
            </button>
          </div>
        </div>
      </div>

      {/* ---- CARDS ---- */}
      <div className="cards-block row g-4 py-4">
        <h2 className="section-title mb-4">Résultats de recherche :</h2>
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
