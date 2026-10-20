import app from "./app.js";

// Port utilise par le serveur
const PORT = process.env.PORT || 3000;

// Demarrage du serveur
app.listen(PORT, () => {
  console.log(
    `Lore Weaver fonctionne sur http://localhost:${PORT}`
  );
});
