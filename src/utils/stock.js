export function esProductoDisponible(producto) {
  return producto.stock && producto.stock > 0;
}
