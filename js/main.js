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
function loadProfessionals(filters = {}) {
  const list = document.getElementById("professionals-list");
  if (!list) return;
  list.innerHTML = "";
  const filtered = professionals.filter(pro => {
    const matchesCategory = filters.category ? pro.category === filters.category : true;
    const matchesLocation = filters.location ? pro.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
    return matchesCategory && matchesLocation;
  });
  if (filtered.length === 0) {
    list.innerHTML = "<p>Nenhum profissional encontrado.</p>";
    return;
  }
  filtered.forEach(pro => {
    const article = document.createElement("article");
    article.className = "bg-white p-6 rounded-lg shadow-md card";
    article.innerHTML = `
      <h2 class="text-lg font-semibold">${pro.name}</h2>
      <p class="mt-2">${pro.description}</p>
      <p class="mt-1"><strong>Área:</strong> ${pro.category}</p>
      <p class="mt-1"><strong>Local:</strong> ${pro.location}</p>
      <p class="mt-1"><strong>Avaliação:</strong> <span class="text-yellow-500" aria-label="${pro.rating} estrelas">${"★".repeat(Math.round(pro.rating))}</span></p>
      <a href="/servicos-e-lugares/detalhe.html?id=${pro.id}&type=professional" class="text-blue-700 hover:underline mt-2 inline-block">Ver detalhes</a>
    `;
    list.appendChild(article);
  });
}

// Função para carregar serviços
function loadServices(filters = {}) {
  const list = document.getElementById("services-list");
  if (!list) return;
  list.innerHTML = "";
  const filtered = services.filter(service => {
    const matchesCategory = filters.category ? service.category === filters.category : true;
    const matchesLocation = filters.location ? service.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
    return matchesCategory && matchesLocation;
  });
  if (filtered.length === 0) {
    list.innerHTML = "<p>Nenhum serviço encontrado.</p>";
    return;
  }
  filtered.forEach(service => {
    const article = document.createElement("article");
    article.className = "bg-white p-6 rounded-lg shadow-md card";
    article.innerHTML = `
      <h2 class="text-lg font-semibold">${service.name}</h2>
      <p class="mt-2">${service.description}</p>
      <p class="mt-1"><strong>Categoria:</strong> ${service.category}</p>
      <p class="mt-1"><strong>Local:</strong> ${service.location}</p>
      <p class="mt-1"><strong>Avaliação:</strong> <span class="text-yellow-500" aria-label="${service.rating} estrelas">${"★".repeat(Math.round(service.rating))}</span></p>
      <a href="/servicos-e-lugares/detalhe.html?id=${service.id}&type=service" class="text-blue-700 hover:underline mt-2 inline-block">Ver detalhes</a>
    `;
    list.appendChild(article);
  });
}

// Função para carregar lugares
function loadPlaces(filters = {}) {
  const list = document.getElementById("places-list");
  if (!list) return;
  list.innerHTML = "";
  const filtered = places.filter(place => {
    const matchesCategory = filters.category ? place.category === filters.category : true;
    const matchesLocation = filters.location ? place.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
    return matchesCategory && matchesLocation;
  });
  if (filtered.length === 0) {
    list.innerHTML = "<p>Nenhum lugar encontrado.</p>";
    return;
  }
  filtered.forEach(place => {
    const article = document.createElement("article");
    article.className = "bg-white p-6 rounded-lg shadow-md card";
    article.innerHTML = `
      <h2 class="text-lg font-semibold">${place.name}</h2>
      <p class="mt-2">${place.description}</p>
      <p class="mt-1"><strong>Tipo:</strong> ${place.category}</p>
      <p class="mt-1"><strong>Local:</strong> ${place.location}</p>
      <p class="mt-1"><strong>Avaliação:</strong> <span class="text-yellow-500" aria-label="${place.rating} estrelas">${"★".repeat(Math.round(place.rating))}</span></p>
      <a href="/servicos-e-lugares/detalhe.html?id=${place.id}&type=place" class="text-blue-700 hover:underline mt-2 inline-block">Ver detalhes</a>
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
    document.getElementById("item-rating").innerHTML = `<span aria-label="${item.rating} estrelas">${"★".repeat(Math.round(item.rating))}</span>`;
  } else {
    document.getElementById("item-name").textContent = "Item não encontrado";
  }

  // Carregar avaliações
  const reviews = JSON.parse(localStorage.getItem(`reviews_${type}_${id}`)) || [];
  const reviewsList = document.getElementById("reviews-list");
  reviewsList.innerHTML = reviews.length ? reviews.map(r => `
    <article class="mt-2">
      <p class="text-yellow-500" aria-label="${r.rating} estrelas">${"★".repeat(r.rating)}</p>
      <p>${r.comment}</p>
    </article>
  `).join("") : "<p>Sem avaliações ainda.</p>";

  // Formulário de avaliação
  const reviewForm = document.getElementById("review-form");
  if (reviewForm) {
    const errorDiv = document.createElement("div");
    errorDiv.id = "review-error";
    errorDiv.className = "text-red-500 hidden mt-2";
    reviewForm.appendChild(errorDiv);
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const rating = document.getElementById("rating").value;
      const comment = document.getElementById("comment").value;
      errorDiv.className = "text-red-500 hidden mt-2";
      if (!rating || !comment) {
        errorDiv.textContent = "Por favor, preencha todos os campos.";
        errorDiv.className = "text-red-500 block mt-2";
        return;
      }
      reviews.push({ rating: parseInt(rating), comment });
      localStorage.setItem(`reviews_${type}_${id}`, JSON.stringify(reviews));
      reviewsList.innerHTML = reviews.map(r => `
        <article class="mt-2">
          <p class="text-yellow-500" aria-label="${r.rating} estrelas">${"★".repeat(r.rating)}</p>
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
  const resultsDiv = document.getElementById("search-results");
  if (search && resultsDiv) {
    search.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      const results = [
        ...professionals.map(p => ({ ...p, type: "professional" })),
        ...services.map(s => ({ ...s, type: "service" })),
        ...places.map(l => ({ ...l, type: "place" }))
      ].filter(item => item.name.toLowerCase().includes(term) || item.description.toLowerCase().includes(term));
      resultsDiv.innerHTML = results.length ? results.map(item => `
        <article class="card shadow-md">
          <h3 class="text-lg font-semibold">${item.name}</h3>
          <p>${item.description}</p>
          <p><strong>${item.type === "professional" ? "Área" : item.type === "service" ? "Categoria" : "Tipo"}:</strong> ${item.category}</p>
          <p><strong>Local:</strong> ${item.location}</p>
          <a href="/servicos-e-lugares/detalhe.html?id=${item.id}&type=${item.type}" class="text-blue-700 hover:underline">Ver detalhes</a>
        </article>
      `).join("") : "<p>Nenhum resultado encontrado.</p>";
    });
  }
}

// Função de filtros
function setupFilters() {
  const category = document.getElementById("category");
  const location = document.getElementById("location");
  if (category && location) {
    const applyFilters = () => {
      const filters = {
        category: category.value,
        location: location.value
      };
      if (document.getElementById("professionals-list")) loadProfessionals(filters);
      if (document.getElementById("services-list")) loadServices(filters);
      if (document.getElementById("places-list")) loadPlaces(filters);
    };
    category.addEventListener("change", applyFilters);
    location.addEventListener("input", applyFilters);
  }
}

// Menu hambúrguer
function setupMenuToggle() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = navMenu.classList.toggle("show");
      menuToggle.setAttribute("aria-expanded", isExpanded);
    });
  }
}

// Formulário de contato
function setupContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      const nameError = document.getElementById("name-error");
      const emailError = document.getElementById("email-error");
      const messageError = document.getElementById("message-error");

      [nameError, emailError, messageError].forEach(error => error.className = "text-red-500 hidden");

      let hasError = false;
      if (!name.value) {
        nameError.textContent = "Nome é obrigatório.";
        nameError.className = "text-red-500 block";
        hasError = true;
      }
      if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.textContent = "E-mail válido é obrigatório.";
        emailError.className = "text-red-500 block";
        hasError = true;
      }
      if (!message.value) {
        messageError.textContent = "Mensagem é obrigatória.";
        messageError.className = "text-red-500 block";
        hasError = true;
      }

      if (!hasError) {
        alert("Mensagem enviada com sucesso! (Simulação)");
        contactForm.reset();
      }
    });
  }
}

// PWA: Registrar Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/servicos-e-lugares/service-worker.js")
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.error("Service Worker registration failed:", err));
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  loadProfessionals();
  loadServices();
  loadPlaces();
  loadDetails();
  setupSearch();
  setupFilters();
  setupMenuToggle();
  setupContactForm();
});