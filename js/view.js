import { getCustomer, getOrderLines, getOrderTotal, getStats } from "./selectors.js";

const money = value => `${value.toFixed(2)} DH`;

export function renderStats(state) {
  const stats = getStats(state);
  document.getElementById("stats").innerHTML = `
    <div class="col-6 col-lg-3"><div class="tp4-stat"><span>Clients</span><strong>${stats.customers}</strong></div></div>
    <div class="col-6 col-lg-3"><div class="tp4-stat"><span>Produits</span><strong>${stats.products}</strong></div></div>
    <div class="col-6 col-lg-3"><div class="tp4-stat"><span>Commandes</span><strong>${stats.orders}</strong></div></div>
    <div class="col-6 col-lg-3"><div class="tp4-stat"><span>Montant cumulé*</span><strong>${money(stats.revenue)}</strong></div></div>
    <div class="col-12"><small class="text-muted">*Total calculé hors commandes annulées.</small></div>`;
}

export function renderCategories(products) {
  const select = document.getElementById("categoryFilter");
  const current = select.value || "All";
  const categories = ["All", ...new Set(products.map(product => product.category))];
  select.innerHTML = categories.map(category => `<option value="${category}">${category === "All" ? "Toutes les catégories" : category}</option>`).join("");
  select.value = categories.includes(current) ? current : "All";
}

export function renderOrders(orders, state) {
  const body = document.getElementById("ordersBody");
  if (!orders.length) { body.innerHTML = '<tr><td colspan="6" class="text-center py-4">Aucune commande ne correspond aux critères.</td></tr>'; return; }
  body.innerHTML = orders.map(order => {
    const customer = getCustomer(order, state.customers);
    const total = getOrderTotal(order, state.products);
    const badge = order.status === "Livree" ? "success" : order.status === "Annulee" ? "danger" : "warning text-dark";
    return `<tr><td>#${order.id}</td><td>${customer ? customer.name : "Client inconnu"}</td><td>${order.date}</td><td><span class="badge text-bg-${badge}">${order.status}</span></td><td class="text-end fw-bold">${money(total)}</td><td><button class="btn btn-sm btn-outline-dark detail-button" data-id="${order.id}">Détail</button></td></tr>`;
  }).join("");
}

export function renderOrderDetail(order, state) {
  const customer = getCustomer(order, state.customers);
  const lines = getOrderLines(order, state.products);
  document.getElementById("detailTitle").textContent = `Commande #${order.id}`;
  document.getElementById("detailContent").innerHTML = `
    <p><strong>Client :</strong> ${customer ? customer.name : "Client inconnu"}</p>
    <p><strong>Ville :</strong> ${customer ? customer.city : "—"}</p>
    <p><strong>Date :</strong> ${order.date} &nbsp; <strong>Statut :</strong> ${order.status}</p>
    <div class="table-responsive"><table class="table table-sm"><thead><tr><th>Produit</th><th>Catégorie</th><th class="text-end">Prix</th><th class="text-end">Qté</th><th class="text-end">Montant</th></tr></thead><tbody>
    ${lines.map(line => `<tr><td>${line.name}</td><td>${line.category}</td><td class="text-end">${money(Number(line.price))}</td><td class="text-end">${line.quantity}</td><td class="text-end">${money(line.lineTotal)}</td></tr>`).join("")}
    </tbody></table></div><h5 class="text-end mt-3">Total : ${money(getOrderTotal(order, state.products))}</h5>`;
  bootstrap.Modal.getOrCreateInstance(document.getElementById("detailModal")).show();
}

export function showError(message) {
  const box = document.getElementById("errorMessage");
  box.textContent = message; box.classList.remove("d-none");
}
