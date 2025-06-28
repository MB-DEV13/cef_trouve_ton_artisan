# Trouve ton Artisan

## Présentation

**Trouve ton Artisan** est une application web qui permet aux utilisateurs de rechercher des artisans, filtrer par spécialité, note et localisation, et contacter directement un artisan.

## Prérequis

- Node.js (>=14)
- npm ou yarn
- Une base de données MySQL
- Variables d’environnement configurées dans un fichier `.env`

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/MB-DEV13/cef_trouve_ton_artisan.git
   cd ton-artisan/front
   ```
2. Installez les dépendances front :
   ```bash
   npm install
   # ou
   yarn install
   ```
3. Installez les dépendances back :

   ```bash
   cd ../api
   npm install
   ```

4. Installez la base de donnée :
   ```bash
   sur MYSQL importer "1_create_schema.sql" qui va créer la BDD et la structure
   puis importer "2_seed_data.sql" qui contient les données
   ```

## Configuration

Dans `api/.env`, définissez les variables :

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=trouve_ton_artisan
DB_USER=root
DB_PASS=

# Pour SMTP (optionnel, sinon Ethereal sera utilisé)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre_user
SMTP_PASS=votre_pass
```

## Lancement

### API

```bash
cd api
node index.js
```

Sortie attendue :

```
✅ BDD connectée avec succès !
API démarrée sur http://localhost:3000
```

### Front-end

```bash
cd front
npm run dev
# ou
yarn dev
```

L’application sera accessible sur `http://localhost:5173`.

## Sécurité

- Les inputs du formulaire de contact sont validés côté serveur via `express-validator`.
- Un rate limiter (`express-rate-limit`) limite les requêtes sur l’endpoint de contact.
- Les requêtes SQL sont paramétrées pour éviter les injections SQL.

## Organisation du projet

```
ton-artisan/
├─ api/               # Back-end (Express + Sequelize)
│  ├─ index.js
│  ├─ package.json
│  └─ .env
├─ front/             # Front-end (React + Vite)
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
      ├─ services/
│  │  └─ styles/
│  └─ vite.config.js
├─ README.md
└─ package.json
```

---

_Ayé, j'ai fini_
