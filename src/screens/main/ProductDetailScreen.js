import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles/colors';
import { useCart } from '../../hooks/useCart';
import { calcularPrecioFinal, formatearPrecio } from '../../utils/precio';

export default function ProductDetailScreen({ route, navigation }) {
  const { producto } = route.params;
  const { addProductToCart, isProductInCart, getProductQuantityInCart } = useCart();

  // Validación por si no se pasa el producto correctamente
  if (!producto) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.textPrimary }}>Producto no encontrado</Text>
      </View>
    );
  }

  const [quantity, setQuantity] = useState(1);
  const isInCart = isProductInCart(producto.id);
  const quantityInCart = getProductQuantityInCart(producto.id);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < producto.stock) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addProductToCart(producto, quantity);
    // Opcional: Mostrar mensaje de éxito o navegar al carrito
  };

  const precioFinal = calcularPrecioFinal(producto.price, producto.discount);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Imagen del producto */}
        <Image source={{ uri: producto.mainImage }} style={styles.image} />

        {/* Título */}
        <Text style={styles.title}>{producto.title}</Text>

        {/* Tags */}
        <View style={styles.tagRow}>
          {producto.tags?.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Icon name="tag" size={12} color={colors.primary} />
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Descripción corta */}
        <Text style={styles.shortDescription}>{producto.shortDescription}</Text>

        {/* Precio */}
        <View style={styles.priceContainer}>
          {producto.discount > 0 && (
            <>
              <Text style={styles.oldPrice}>{formatearPrecio(producto.price)}</Text>
              <Text style={styles.discountLabel}>-{producto.discount}% OFF</Text>
            </>
          )}
        </View>
        <Text style={styles.price}>{formatearPrecio(precioFinal)}</Text>

        {/* Stock */}
        <View style={styles.stockRow}>
          <Icon name="check-circle" size={16} color={colors.success} />
          <Text style={styles.stockText}>{producto.stock} disponibles</Text>
        </View>

        {/* Descripción larga */}
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>{producto.longDescription}</Text>

        {/* Especificaciones */}
        <Text style={styles.sectionTitle}>Especificaciones</Text>
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Marca:</Text>
          <Text>{producto.brand}</Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Categoría:</Text>
          <Text>{producto.category}</Text>
        </View>
        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Stock disponible:</Text>
          <Text>{producto.stock} unidades</Text>
        </View>

        {/* Selector de cantidad */}
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Cantidad:</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity onPress={handleDecrease} style={styles.qtyButton}>
              <Text style={styles.qtyText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={handleIncrease} style={styles.qtyButton}>
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Información si está en carrito */}
        {isInCart && (
          <View style={styles.cartInfo}>
            <Icon name="shopping-cart" size={16} color={colors.success} />
            <Text style={styles.cartInfoText}>
              Ya tienes {quantityInCart} {quantityInCart === 1 ? 'unidad' : 'unidades'} en tu carrito
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>
            {isInCart ? `Agregar ${quantity} más` : `Añadir ${quantity} al carrito`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    backgroundColor: colors.background,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryBackground,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  tagText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  shortDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    marginHorizontal: 16,
    marginBottom: 16,
    lineHeight: 22,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 4,
    gap: 12,
  },
  oldPrice: {
    fontSize: 16,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  discountLabel: {
    backgroundColor: colors.error,
    color: colors.textWhite,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
    gap: 8,
  },
  stockText: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: colors.textPrimary,
    marginHorizontal: 16,
    marginBottom: 20,
    lineHeight: 20,
  },
  specRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  specLabel: {
    fontWeight: 'bold',
    width: 120,
    color: colors.textPrimary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  qtyButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  qtyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    minWidth: 40,
    textAlign: 'center',
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    backgroundColor: colors.successLight,
    borderRadius: 8,
    gap: 8,
  },
  cartInfoText: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '500',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
