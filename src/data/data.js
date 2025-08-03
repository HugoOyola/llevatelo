// src/data/cartData.js

// export const mockItems = [
//   {
//     id: 1,
//     title: 'PlayStation 5',
//     image: 'https://i.postimg.cc/wM7dDrvG/ps5.png',
//     price: 3000,
//     quantity: 1,
//   },
//   {
//     id: 2,
//     title: 'Pendrive Kingston 64GB',
//     image: 'https://i.postimg.cc/gkvnjMwK/kingston64.png',
//     price: 40,
//     quantity: 2,
//   },
// ];

export const shippingOptions = [
  { id: 'standard', label: 'Envío Estándar', time: '5-7 días hábiles', cost: 5 },
  { id: 'express', label: 'Envío Express', time: '1-2 días hábiles', cost: 15 },
  { id: 'pickup', label: 'Retiro en Tienda', time: 'Disponible hoy', cost: 0 },
];

export const paymentMethods = [
  {
    id: 'credit',
    label: 'Tarjeta de Crédito',
    description: 'Visa, Mastercard, American Express',
  },
  {
    id: 'debit',
    label: 'Tarjeta de Débito',
    description: 'Débito inmediato',
  },
  {
    id: 'transfer',
    label: 'Transferencia Bancaria',
    description: 'CBU o Alias',
  },
  {
    id: 'cash',
    label: 'Efectivo (Solo retiro)',
    description: 'Pago en tienda física',
  },
];
