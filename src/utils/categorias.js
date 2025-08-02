// utils/categorias.js

export function normalizarCategoria(categoria) {
  if (!categoria) return '';
  return categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase();
}

export function compararCategoria(catA, catB) {
  return normalizarCategoria(catA) === normalizarCategoria(catB);
}

export function formatearNombreCategoria(slug) {
  const mapa = {
    "ropa-y-accesorios": "Ropa & Accesorios",
    "coleccionables": "Coleccionables",
    "comics": "Comics",
    "gadgets": "Gadgets",
    "hardware": "Hardware",
    "eventos": "Eventos",
    "consolas": "Consolas"
  };
  return mapa[slug.toLowerCase()] || normalizarCategoria(slug);
}

export function slugCategoria(nombre) {
  return nombre.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
}
