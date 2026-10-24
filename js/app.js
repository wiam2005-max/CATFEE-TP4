import { state } from "./state.js";
import { loadAllData } from "./dataService.js";
import { getFilteredOrders } from "./selectors.js";
import { renderStats, renderCategories, renderOrders, renderOrderDetail, showError } from "./view.js";

function render() {
  renderStats(state);
  renderOrders(getFilteredOrders(state), state);
  document.getElementById("resultCount").textContent = `${getFilteredOrders(state).length} commande(s)`;
}

async function init() {
  try {
    const data = await loadAllData();
    state.customers = data.customers; state.products = data.products; state.orders = data.orders;
    renderCategories(state.products);
    render(); // Le premier rendu a lieu après le chargement des trois fichiers.
  } catch (error) {
    showError("Impossible de charger les données. Vérifiez les fichiers dans data/ et lancez le projet avec Live Server. Détail : " + error.message);
  }
}

document.getElementById("searchInput").addEventListener("input", event => { state.search = event.target.value.trim(); render(); });
document.getElementById("statusFilter").addEventListener("change", event => { state.status = event.target.value; render(); });
document.getElementById("categoryFilter").addEventListener("change", event => { state.category = event.target.value; render(); });
document.getElementById("ordersBody").addEventListener("click", event => {
  const button = event.target.closest(".detail-button"); if (!button) return;
  const order = state.orders.find(item => item.id === Number(button.dataset.id));
  if (order) renderOrderDetail(order, state);
});
init();
