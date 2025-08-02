export function formatearPrecio(precio) {
  return `S/. ${parseFloat(precio).toFixed(2)}`;
}

export function calcularPrecioFinal(precio, descuento = 0) {
  return parseFloat(precio * (1 - descuento / 100)).toFixed(2);
}
