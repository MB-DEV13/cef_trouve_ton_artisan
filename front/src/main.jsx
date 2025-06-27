import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/main.scss";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Crée le root React et mettre en mode Strict pour détecter d'éventuels problèmes
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
