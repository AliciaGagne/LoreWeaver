import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pool from "./config/database.js";

// Creation de l'application Express
const app = express();

// Localisation du dossier public
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Permet de recevoir des donnees JSON
app.use(express.json());

// Rend les fichiers HTML, CSS et JS accessibles
app.use(express.static(path.join(__dirname, "public")));

// Route de verification de l'application
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    application: "Lore Weaver"
  });
});

// Tester la connexion PostgreSQL
pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("Erreur PostgreSQL :", err);
  } else {
    console.log("Connexion PostgreSQL réussie !");
    console.log(result.rows);
  }
});

export default app;
