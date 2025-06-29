-- create_schema.sql


-- Création de la base
CREATE DATABASE trouve_ton_artisan DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE trouve_ton_artisan;

-- Table des catégories
CREATE TABLE categorie (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL UNIQUE
);

-- Table des spécialités
CREATE TABLE specialite (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL UNIQUE,
  categorie_id INT NOT NULL,
  CONSTRAINT fk_specialite_categorie
    FOREIGN KEY (categorie_id) REFERENCES categorie(id)
);

-- Table des artisans
CREATE TABLE artisan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(200) NOT NULL,
  note DECIMAL(2,1) NOT NULL CHECK (note BETWEEN 0 AND 5),
  photo_profil VARCHAR(255),
  ville VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  site_web VARCHAR(255),
  a_propos TEXT,
  top BOOLEAN NOT NULL DEFAULT FALSE,
  specialite_id INT NOT NULL,
  CONSTRAINT fk_artisan_specialite
    FOREIGN KEY (specialite_id) REFERENCES specialite(id)
);
