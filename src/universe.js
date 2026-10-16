export function createUniverse(name, description) {
  if (typeof name !== "string" || name.trim() === "") {
    throw new Error("Le nom de l'univers est obligatoire.");
  }

  if (typeof description !== "string") {
    throw new Error("La description doit etre du texte.");
  }

  return {
    name: name.trim(),
    description: description.trim(),
    isPublic: false
  };
}
