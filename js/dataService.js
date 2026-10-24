// Charge les trois sources JSON sans manipuler le DOM.
async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Échec du chargement de ${path} (HTTP ${response.status})`);
  return response.json();
}

export async function loadAllData() {
  try {
    const [customers, products, orders] = await Promise.all([
      loadJSON("data/customers.json"),
      loadJSON("data/products.json"),
      loadJSON("data/orders.json")
    ]);
    if (![customers, products, orders].every(Array.isArray)) {
      throw new Error("Les trois fichiers JSON doivent contenir des tableaux.");
    }
    return { customers, products, orders };
  } catch (error) {
    console.error("Erreur pendant le chargement des données :", error);
    throw error;
  }
}
