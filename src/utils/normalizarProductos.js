// utils/normalizarProductos.js

export function normalizarProductos(productos) {
  const hoy = new Date();

  return productos.map((producto) => {
    const nuevoProducto = { ...producto };

    // Convertir precio si está en centavos
    if (nuevoProducto.price > 10000) {
      nuevoProducto.price = parseFloat((nuevoProducto.price / 100).toFixed(2));
    }

    // Asegurar que tags sea array
    nuevoProducto.tags = Array.isArray(nuevoProducto.tags)
      ? nuevoProducto.tags.map(t => t.toLowerCase())
      : [];

    // Eliminar tags mal escritos
    nuevoProducto.tags = nuevoProducto.tags.filter(t => t !== "ofert" && t !== "new");

    // Detectar si es reciente para agregar "nuevo"
    const fechaCreacion = new Date(nuevoProducto.createdAt);
    const diferenciaDias = Math.floor(
      (hoy - fechaCreacion) / (1000 * 60 * 60 * 24)
    );
    if (diferenciaDias <= 30 && !nuevoProducto.tags.includes("nuevo")) {
      nuevoProducto.tags.push("nuevo");
      nuevoProducto.highlight = "nuevo";
    }

    // Agregar tag "oferta" si tiene descuento
    if (nuevoProducto.discount > 0 && !nuevoProducto.tags.includes("oferta")) {
      nuevoProducto.tags.push("oferta");
    }

    // Capitalizar categoría
    nuevoProducto.category = nuevoProducto.category.charAt(0).toUpperCase() + nuevoProducto.category.slice(1).toLowerCase();

    return nuevoProducto;
  });
}
