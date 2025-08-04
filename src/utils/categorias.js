// utils/categorias.js

export function normalizarCategoria(categoria) {
  if (!categoria) return '';
  return categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase();
}

export function compararCategoria(catA, catB) {
  // Normalizar ambas categorías removiendo espacios, símbolos y convirtiendo a minúsculas
  const normalizeForComparison = (str) => {
    return str.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/&/g, 'y')
      .replace(/[^\w-]/g, '');
  };

  const normalizedA = normalizeForComparison(catA);
  const normalizedB = normalizeForComparison(catB);

  console.log(`Comparando: "${normalizedA}" === "${normalizedB}"`);

  return normalizedA === normalizedB;
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
  return nombre.toLowerCase().replace(/ & /g, '-y-').replace(/ /g, '-');
}
