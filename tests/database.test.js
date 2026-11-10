import test from "node:test";
import assert from "node:assert/strict";

// Charger les variables d'environnement locales
import "dotenv/config";

const databaseEnabled = process.env.TEST_DATABASE === "true";

test(
  "La connexion PostgreSQL fonctionne",
  {
    skip: !databaseEnabled
  },
  async () => {
    // Importer la connexion seulement si le test est active
    const { default: pool } = await import(
      "../src/config/database.js"
    );

    try {
      const result = await pool.query(
        "SELECT 1 AS resultat"
      );

      assert.equal(result.rows.length, 1);
      assert.equal(result.rows[0].resultat, 1);

    } finally {
      // Fermer les connexions PostgreSQL
      await pool.end();
    }
  }
);
