import test from "node:test";
import assert from "node:assert/strict";

import app from "../src/app.js";

// Fonction pour demarrer et fermer un serveur temporaire
async function withTestServer(callback) {
  const server = app.listen(0);

  try {
    const port = server.address().port;
    const baseUrl = `http://127.0.0.1:${port}`;

    await callback(baseUrl);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

// Test de la route de verification
test("La route health fonctionne", async () => {
  await withTestServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/health`);

    assert.equal(response.status, 200);

    const data = await response.json();

    assert.equal(data.status, "ok");
    assert.equal(data.application, "Lore Weaver");
  });
});

// Test de la page d'accueil
test("La page d'accueil est accessible", async () => {
  await withTestServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/`);

    assert.equal(response.status, 200);

    const html = await response.text();

    assert.match(html, /Lore Weaver/);
  });
});