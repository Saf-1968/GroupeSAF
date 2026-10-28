const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotWindow = document.getElementById("chatbot-window");
const chatClose = document.getElementById("chat-close");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
const chatTyping = document.getElementById("chat-typing");
const chatBadge = document.getElementById("chat-badge");

let lastScrollTop = 0;
const header = document.querySelector("header");
const scrollThreshold = 50;

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop <= scrollThreshold) {
    header.classList.remove("nav-hidden");
    return;
  }

  if (scrollTop > lastScrollTop) {
    header.classList.add("nav-hidden");
  } else {
    header.classList.remove("nav-hidden");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

function filterProducts(category, event) {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));

  if (event) {
    event.target.classList.add("active");
  }

  const products = document.querySelectorAll(".product-card");
  products.forEach((product) => {
    if (category === "all" || product.dataset.category === category) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

chatbotToggle.addEventListener("click", () => {
  chatbotWindow.classList.toggle("chatbot-hidden");
  if (chatBadge) chatBadge.style.display = "none";
});

chatClose.addEventListener("click", () => {
  chatbotWindow.classList.add("chatbot-hidden");
});

function addMessage(text, sender) {
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const msDiv = document.createElement("div");
  msDiv.classList.add("message", `${sender}-message`);
  msDiv.innerHTML = `<p>${text}</p><span class="chat-time">${time}</span>`;

  chatMessages.appendChild(msDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userText = chatInput.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  chatInput.value = "";

  chatTyping.classList.remove("typing-hidden");

  setTimeout(() => {
    chatTyping.classList.add("typing-hidden");
    generateBotResponse(userText);
  }, 1000);
});

function askQuestion(type) {
  let = questionText = "";
  if (type === "Produits") questionText = "Quels sont vos produits ?";
  if (type === "Devis") questionText = "Comment obtenir un devis ?";
  if (type === "Contact") questionText = "Où êtes-vous situées ?";

  addMessage(questionText, "user");
  chatTyping.classList.remove("typinghidden");

  setTimeout(() => {
    chatTyping.classList.add("typing-hidden");
    generateBotResponse(questionText);
  }, 1000);
}

function generateBotResponse(input) {
  const text = input.toLowerCase();
  let reply = "";

  if (
    text.includes("produit") ||
    text.includes("crevete") ||
    text.includes("poisson") ||
    text.includes("acoupa") ||
    text.includes("vivaneau")
  ) {
    reply =
      "Nous proposons des **Crevette Sauvages d'exception** (zone FAO 31) ainsi que des poissons nobles comme l'**acoupa Rouge** et le **Vivaneau Rouge**, surgelés directement après capture.";
  } else if (
    text.includes("devis") ||
    text.includes("prix") ||
    text.includes("tarif") ||
    text.includes("commender")
  ) {
    reply =
      "Pour obtenir une catotion ou un devis personnalisé, vous pouver remplir notre formulaire de contact ci-desous ou écrire à **direction@abcheesaf.fr**.";
  } else if (
    text.includes("adresse") ||
    text.includes("contact") ||
    text.includes("où") ||
    text.includes("telephone") ||
    text.includes("téléphone") ||
    text.includes("site")
  ) {
    reply =
      "Le groupe est implanté à Cayenne (Usine & Siège social au Vieux port) et à Matoury (Armement au port du Larivot). Tél: (+594) 0594 28 29 90.";
  } else if (
    text.includes("horaire") ||
    text.includes("ouvert") ||
    text.includes("heure")
  ) {
    reply =
      "Nos équipes vous acceuillent du Lundi au Vendredi de 7h00 à 15h00 (Heure de Guyane)";
  } else if (
    text.includes("bonjour") ||
    text.includes("salut") ||
    text.includes("coucou")
  ) {
    reply =
      "Bonjour ! Comment puis-je vous renseigner sur la SAF ou nos filiales (SPGS, A-FISH) ?";
  } else {
    reply =
      "Merci pour votre message. Pour une demande spécifique, nous vous invitons à nous contacter directement au **(+594) 0594 28 29 90** ou par mail à **direction@abcheesaf.fr**.";
  }
  addMessage(reply, "bot");
}
