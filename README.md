# CATFEE-TP4
# CATFEE — TP4 : Application JavaScript structurée avec données liées

## Description
Application frontend pédagogique inspirée du site CATFEE. Le tableau de bord charge trois sources JSON indépendantes (clients, produits, commandes), relie les entités grâce aux identifiants et calcule les montants des commandes.

## Structure
- `index.html` : page d’accueil CATFEE conservée.
- `menu.html` : tableau de bord TP4 des commandes.
- `data/customers.json` : clients.
- `data/products.json` : produits et prix.
- `data/orders.json` : commandes, références client/produit, quantités et statuts.
- `js/state.js` : état central et filtres.
- `js/dataService.js` : chargement asynchrone des trois JSON et gestion des erreurs.
- `js/selectors.js` : relations, filtres et calculs.
- `js/view.js` : affichage des indicateurs, commandes et détails dans le DOM.
- `js/app.js` : initialisation et événements.
- `css/style.css` : style commun du site.
