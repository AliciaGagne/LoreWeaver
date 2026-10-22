import test from "node:test";
import assert from "node:assert/strict";

import app from "../app.js";

// Test de la route de verification
test("La route health fonctionne", async (t) => {
  const server = app.listen(0);

  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) reject(error);
      else resolve();
    });
  }));

  const port = server.address().port;

  const response = await fetch(
    `http://127.0.0.1:${port}/api/health`
  );

  assert.equal(response.status, 200);

  const data = await response.json();

  assert.equal(data.status, "ok");
  assert.equal(data.application, "Lore Weaver");
});

// Test de la page d'accueil
test("La page d'accueil est accessible", async (t) => {
  const server = app.listen(0);

  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) reject(error);
      else resolve();
    });
  }));

  const port = server.address().port;

  const response = await fetch(
    `http://127.0.0.1:${port}/`
  );

  assert.equal(response.status, 200);

  const html = await response.text();

  assert.match(html, /Lore Weaver/);
});
