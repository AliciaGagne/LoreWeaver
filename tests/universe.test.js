
import test from "node:test";
import assert from "node:assert/strict";

import { createUniverse } from "../src/universe.js";

// Test 1 : Creer un univers valide
test("Creer un univers avec un nom et une description", () => {
  const universe = createUniverse(
    "Eldoria",
    "Un monde fantastique"
  );

  assert.equal(universe.name, "Eldoria");
  assert.equal(universe.description, "Un monde fantastique");
});

// Test 2 : Verifier la confidentialite par defaut
test("Un nouvel univers est prive par defaut", () => {
  const universe = createUniverse("Eldoria", "");

  assert.equal(universe.isPublic, false);
});

// Test 3 : Refuser un nom vide
test("Impossible de creer un univers sans nom", () => {
  assert.throws(() => {
    createUniverse("", "Un monde fantastique");
  }, /obligatoire/);
});

// Test 4 : Nettoyer les espaces inutiles
test("Supprimer les espaces autour du nom", () => {
  const universe = createUniverse("  Eldoria  ", "");

  assert.equal(universe.name, "Eldoria");
});

// Test 5 : Refuser une description invalide
test("La description doit etre du texte", () => {
  assert.throws(() => {
    createUniverse("Eldoria", null);
  }, /texte/);
});
