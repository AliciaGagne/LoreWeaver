const button = document.getElementById("welcome-button");
const message = document.getElementById("message");

button.addEventListener("click", () => {
  message.textContent =
    "Bienvenue ! Votre aventure commence ici.";
});
