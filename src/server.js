import app from "./app.js";
import pool from "./config/database.js";

// Port utilise par le serveur
const PORT = process.env.PORT || 3000;

// Demarrage de l'application

async function startServer() {
  try {
    // Verification de l'accessibilité de PostgreSQL
    await pool.query("SELECT 1");

    console.log("Connexion PostgreSQL reussie !");

  // Demarrer le serveur Express
  app.listen(PORT, () => {
    console.log(
      `Lore Weaver fonctionne sur http://localhost:${PORT}`
    );
  });

} catch (error) {
  console.error (
    "Erreur de connexion PostgreSQL :",
    error.message
  );

  await pool.end();
  process.exitCode = 1;
  }
}

startServer();
