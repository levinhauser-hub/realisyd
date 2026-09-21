const defaultProducts = [
  { name: "3D Drucker Team", category: "alltag", price: "Preis auf Anfrage", description: "Unser erstes Produkt aus der REALISY-D-Hauser-Series-Galerie. Weitere Varianten, Farben und Preise folgen mit den nächsten Bildern.", image: "3-d-drucker-team.jpeg" }
];

const categoryLabels = { deko: "DEKO", alltag: "FÜR DEN ALLTAG", geschenk: "GESCHENKIDEE" };
let selectedFilter = "alle";
const saved = JSON.parse(localStorage.getItem("druckprodukte") || "null");
const products = saved || defaultProducts;
const grid = document.getElementById("product-grid");
const dialog = document.getElementById("product-dialog");

function artwork(product) {
  if (product.image) return `<img src="${product.image}" alt="${product.name}">`;
  return `<span style="background:${product.color || '#d4dcdb'}" class="product-symbol">${product.icon || '✦'}</span>`;
}
function renderProducts() {
  const visible = products.filter(p => selectedFilter === "alle" || p.category === selectedFilter);
  grid.innerHTML = visible.map((p, index) => `<button class="product-card" data-index="${products.indexOf(p)}"><div class="product-image">${artwork(p)}</div><div class="product-info"><div><h3>${p.name}</h3><p>${categoryLabels[p.category] || p.category}</p></div><span class="price">${p.price}</span></div></button>`).join("");
  document.getElementById("empty-state").hidden = visible.length !== 0;
  document.querySelectorAll(".product-card").forEach(card => card.addEventListener("click", () => showProduct(products[card.dataset.index])));
}
function showProduct(product) {
  document.getElementById("dialog-image").src = product.image || makePlaceholder(product);
  document.getElementById("dialog-image").alt = product.name;
  document.getElementById("dialog-category").textContent = categoryLabels[product.category] || product.category;
  document.getElementById("dialog-name").textContent = product.name;
  document.getElementById("dialog-description").textContent = product.description;
  document.getElementById("dialog-price").textContent = product.price;
  dialog.showModal();
}
function makePlaceholder(product) {
  const text = encodeURIComponent(product.icon || "✦");
  return `https://placehold.co/600x500/${(product.color || '#d4dcdb').slice(1)}/1c2627?text=${text}`;
}
document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => { selectedFilter = button.dataset.filter; document.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b === button)); renderProducts(); }));
document.querySelector(".close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
