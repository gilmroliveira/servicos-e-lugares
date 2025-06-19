// Dados simulados (substituir por API/banco de dados no futuro)
const professionals = [
  { id: 1, name: "Dr. João Silva", category: "Medicina", location: "São Paulo", description: "Médico experiente em clínica geral.", rating: 4.5 },
  { id: 2, name: "Ana Costa", category: "Tecnologia", location: "Rio de Janeiro", description: "Desenvolvedora full-stack.", rating: 4.8 },
];

const services = [
  { id: 1, name: "Consulta Médica", category: "Saúde", location: "São Paulo", description: "Consulta com especialistas.", rating: 4.7 },
];

const places = [
  { id: 1, name: "Parque Ibirapuera", category: "Parque", location: "São Paulo", description: "Ótimo para caminhadas.", rating: 4.9 },
];

// Função para carregar lista de profissionais
function loadProfessionals() {
  const list = document.getElementById("professionals-list");
  if (!list) return;
  list.innerHTML = "";
  professionals.forEach(pro => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded shadow card";
    div.innerHTML = `
      <h3 class="text-lg font-semibold">${pro.name}</h3>
      <p>${pro.description}</p>
      <p><strong>Área:</strong> ${pro.category}</p>
      <p><strong>Local:</strong> ${pro.location}</p>
      <p><strong>Avaliação:</strong> ${"★".repeat(Math.round(pro.rating))}</p>
      <a href="detalhe.html?id=${pro.id}&type=professional" class="text-blue-700 hover:underline">Ver detalhes</a>
    `;
    list.appendChild(div);
  });
}

// Função para carregar detalhes
function loadDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const type = urlParams.get("type");
  let item;
  if (type === "professional") item = professionals.find(p => p.id == id);
  // Adicionar para services e places

  if (item) {
    document.getElementById("item-name").textContent = item.name;
    document.getElementById("item-description").textContent = item.description;
    document.getElementById("item-category").textContent = `Área: ${item.category}`;
    document.getElementById("item-location").textContent = `Local: ${item.location}`;
    document.getElementById("item-rating").textContent = "★".repeat(Math.round(item.rating));
  }

  // Carregar avaliações do LocalStorage
  const reviews = JSON.parse(localStorage.getItem(`reviews_${type}_${id}`)) || [];
  const reviewsList = document.getElementById("reviews-list");
  reviewsList.innerHTML = reviews.map(r => `<p>${"★".repeat(r.rating)} - ${r.comment}</p>`).join("");

  // Formulário de avaliação
  document.getElementById("review-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;
    reviews.push({ rating, comment });
    localStorage.setItem(`reviews_${type}_${id}`, JSON.stringify(reviews));
    reviewsList.innerHTML = reviews.map(r => `<p>${"★".repeat(r.rating)} - ${r.comment}</p>`).join("");
    document.getElementById("review-form").reset();
  });
}

// Função de busca
function setupSearch() {
  const search = document.getElementById("search");
  if (search) {
    search.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      // Implementar busca nos dados
    });
  }
}

// PWA: Registrar Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  loadProfessionals();
  loadDetails();
  setupSearch();
});