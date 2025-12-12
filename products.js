const API = "https://fakestoreapi.com/products";
const productsDiv = document.getElementById("products");

async function loadProducts() {
  const res = await fetch(API);
  const data = await res.json();

  productsDiv.innerHTML = "";

  data.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <div>${p.title}</div>
      <strong>$${p.price}</strong>
      <button class="btn add-btn">Add</button>
    `;

    card.querySelector(".add-btn").onclick = () => {
      window.dispatchEvent(new CustomEvent("add-item", { detail: p }));
    };

    productsDiv.appendChild(card);
  });
}

loadProducts();
