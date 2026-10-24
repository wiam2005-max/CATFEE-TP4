// Fonctions de recherche, de liaison et de calcul : aucune manipulation du DOM ici.
export function getCustomer(order, customers) {
  return customers.find(customer => customer.id === order.customerId);
}

export function getProduct(item, products) {
  return products.find(product => product.id === item.productId);
}

export function getOrderLines(order, products) {
  return order.items.map(item => {
    const product = getProduct(item, products);
    if (!product) return { name: "Produit introuvable", price: 0, quantity: item.quantity, lineTotal: 0, category: "Inconnue" };
    return { ...product, quantity: item.quantity, lineTotal: product.price * item.quantity };
  });
}

export function getOrderTotal(order, products) {
  let total = 0;
  getOrderLines(order, products).forEach(line => { total += line.lineTotal; });
  return total;
}

export function getFilteredOrders(state) {
  return state.orders.filter(order => {
    const customer = getCustomer(order, state.customers);
    const customerName = customer ? customer.name.toLowerCase() : "";
    const matchesSearch = String(order.id).includes(state.search.toLowerCase()) || customerName.includes(state.search.toLowerCase());
    const matchesStatus = state.status === "All" || order.status === state.status;
    const matchesCategory = state.category === "All" || getOrderLines(order, state.products).some(line => line.category === state.category);
    return matchesSearch && matchesStatus && matchesCategory;
  });
}

export function getStats(state) {
  return {
    customers: state.customers.length,
    products: state.products.length,
    orders: state.orders.length,
    revenue: state.orders.reduce((sum, order) => sum + (order.status === "Annulee" ? 0 : getOrderTotal(order, state.products)), 0)
  };
}
