// Dados simulados
const professionals = [
  { id: "p1", name: "Dr. João Silva", category: "Medicina", location: "São Paulo", description: "Médico experiente em clínica geral.", rating: 4.5 },
  { id: "p2", name: "Ana Costa", category: "Tecnologia", location: "Rio de Janeiro", description: "Desenvolvedora full-stack.", rating: 4.8 },
];

const services = [
  { id: "s1", name: "Consulta Médica", category: "Saúde", location: "São Paulo", description: "Consulta com especialistas.", rating: 4.7 },
  { id: "s2", name: "Reparos Domésticos", category: "Reparos", location: "Curitiba", description: "Serviços de encanamento e elétrica.", rating: 4.3 },
];

const places = [
  { id: "l1", name: "Parque Ibirapuera", category: "Parque", location: "São Paulo", description: "Ótimo para caminhadas.", rating: 4.9 },
  { id: "l2", name: "Museu do Amanhã", category: "Museu", location: "Rio de Janeiro", description: "Arquitetura moderna e exposições interativas.", rating: 4.6 },
];

// Função para carregar profissionais
function loadProfessionals() {
  const list = document.getElementById("professionals-list");
  if (!list) return;
  list.innerHTML = "";
  professionals.forEach(pro => {
    const article = document.createElement("article");
    article.className = "bg-white p-6 rounded-lg shadow-md card";
    article.innerHTML = `
      <h2 class="text-lg font-semibold">${pro.name}</h2>
      <p class="mt-2">${pro.description}</p>
      <p class="mt-1"><strong>Área:</strong> ${pro.category}</p>
      <p class="mt-1"><strong>Local:</strong> ${pro.location}</p>
      <p class="mt-1"><strong>Avaliação:</strong> <span class="text-yellow-500">${"★".repeat(Math.round(pro.rating))}</span></p>
      <a href="detalhe.html?id=${pro.id}&type=professional" class="text-blue-700 hover:underline mt-2 inline-block">Ver detalhes</a>
    `;
    list.appendChild(article);
  });
}

// Função para carregar serviços
function loadServices() {
  const list = document.getElementById("services-list");
  if (!list) return;
  list.innerHTML = "";
  services.forEach(service => {
    const article = document.createElement("article");
    article.className = "bg-white p-6 rounded-lg shadow-md card";
    article.innerHTML = `
      <h2 class="text-lg font-semibold">${service.name}</h2>
      <p class="mt-2">${service.description}</p>
      <p class="mt-1"><strong>Categoria:</strong> ${service.category}</p>
      <p class="mt-1"><strong>Local:</strong> ${service.location}</p>
      <p class="mt-1"><strong>Avaliação:</strong> <span class="text-yellow-500">${"★".repeat(Math.round(service.rating))}</span></p>
      <a href="detalhe.html?id=${service.id}&type=service" class="text-blue-700 hover:underline mt-2 inline-block">Ver detalhes</a>
    `;
    list.appendChild(article);
  });
}

// Função para carregar lugares
function loadPlaces() {
  const list = document.getElementById("places-list");
  if (!list) return;
  list.innerHTML = "";
  places.forEach(place => {
    const article = document.createElement("article");
    article.className = "bg-white p-6 rounded-lg shadow-md card";
    article.innerHTML = `
      <h2 class="text-lg font-semibold">${place.name}</h2>
      <p class="mt-2">${place.description}</p>
      <p class="mt-1"><strong>Tipo:</strong> ${place.category}</p>
      <p class="mt-1"><strong>Local:</strong> ${place.location}</p>
      <p class="mt-1"><strong>Avaliação:</strong> <span class="text-yellow-500">${"★".repeat(Math.round(place.rating))}</span></p>
      <a href="detalhe.html?id=${place.id}&type=place" class="text-blue-700 hover:underline mt-2 inline-block">Ver detalhes</a>
    `;
    list.appendChild(article);
  });
}

// Função para carregar detalhes
function loadDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const type = urlParams.get("type");
  let item;
  if (type === "professional") item = professionals.find(p => p.id === id);
  else if (type === "service") item = services.find(s => s.id === id);
  else if (type === "place") item = places.find(l => l.id === id);

  if (item) {
    document.getElementById("item-name").textContent = item.name;
    document.getElementById("item-description").textContent = item.description;
    document.getElementById("item-category").textContent = `Categoria: ${item.category}`;
    document.getElementById("item-location").textContent = `Local: ${item.location}`;
    document.getElementById("item-rating").textContent = "★".repeat(Math.round(item.rating));
  }

  // Carregar avaliações
  const reviews = JSON.parse(localStorage.getItem(`reviews_${type}_${id}`)) || [];
  const reviewsList = document.getElementById("reviews-list");
  reviewsList.innerHTML = reviews.length ? reviews.map(r => `
    <article class="mt-2">
      <p class="text-yellow-500">${"★".repeat(r.rating)}</p>
      <p>${r.comment}</p>
    </article>
  `).join("") : "<p>Sem avaliações ainda.</p>";

  // Formulário de avaliação
  const reviewForm = document.getElementById("review-form");
  if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const rating = document.getElementById("rating").value;
      const comment = document.getElementById("comment").value;
      if (!rating || !comment) {
        alert("Por favor, preencha todos os campos.");
        return;
      }
      reviews.push({ rating: parseInt(rating), comment });
      localStorage.setItem(`reviews_${type}_${id}`, JSON.stringify(reviews));
      reviewsList.innerHTML = reviews.map(r => `
        <article class="mt-2">
          <p class="text-yellow-500">${"★".repeat(r.rating)}</p>
          <p>${r.comment}</p>
        </article>
      `).join("");
      reviewForm.reset();
    });
  }
}

// Função de busca
function setupSearch() {
  const search = document.getElementById("search");
  if (search) {
    search.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      // Futuro: implementar busca unificada
    });
  }
}

// Menu hambúrguer
function setupMenuToggle() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show");
      const expanded = navMenu.classList.contains("show");
      menuToggle.setAttribute("aria-expanded", expanded);
    });
  }
}

// Formulário de contato
function setupContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      if (!name || !email || !message) {
        alert("Por favor, preencha todos os campos.");
        return;
      }
      alert("Mensagem enviada com sucesso! (Simulação)");
      contactForm.reset();
    });
  }
}

// PWA: Registrar Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js").catch(err => console.error("Service Worker registration failed:", err));
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  loadProfessionals();
  loadServices();
  loadPlaces();
  loadDetails();
  setupSearch();
  setupMenuToggle();
  setupContactForm();
});