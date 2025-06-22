// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap-icons/font/bootstrap-icons.css";
// Ton fichier SCSS principal importe Bootstrap et tes overrides
import "./styles/main.scss";

// Pour le JS de Bootstrap (navbar responsive, modals, tooltips…)
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
