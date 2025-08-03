import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Badge from '../common/Badge';
import { colors } from '../../styles/colors';
import { useCart } from '../../hooks/useCart';
import { calcularPrecioFinal } from '../../utils/precio';

export default function ProductCard({ product, onPress, showDiscount = false }) {
  const { addProductToCart, isProductInCart, getProductQuantityInCart } = useCart();

  const isOutOfStock = product.stock === 0;
  const hasDiscount = product.discount > 0;
  const finalPrice = calcularPrecioFinal(product.price, product.discount);
  const isInCart = isProductInCart(product.id);
  const quantityInCart = getProductQuantityInCart(product.id);

  const badgeColors = {
    new: colors.info,
    nuevo: colors.info,
    ofert: colors.warning,
    oferta: colors.warning,
    popular: colors.accent,
    classic: colors.secondaryLight,
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isOutOfStock) {
      addProductToCart(product, 1);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(product)}
      disabled={isOutOfStock}
    >
      <Image source={{ uri: product.mainImage }} style={styles.image} />

      <View style={styles.badgeRow}>
        {product.tags?.map(tag => (
          <Badge
            key={tag}
            label={tag.charAt(0).toUpperCase() + tag.slice(1)}
            color={badgeColors[tag] || colors.border}
            textColor={colors.textWhite}
          />
        ))}
        {hasDiscount && showDiscount && (
          <Badge
            label={`-${product.discount}%`}
            color={colors.error}
            textColor="#fff"
          />
        )}
        {isOutOfStock && (
          <Badge
            label="Sin Stock"
            color={colors.error}
            textColor="#fff"
          />
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>

        {hasDiscount && (
          <View style={styles.priceRow}>
            <Text style={styles.oldPrice}>S/ {product.price.toFixed(2)}</Text>
            {showDiscount && <Text style={styles.discount}>-{product.discount}%</Text>}
          </View>
        )}

        <Text style={styles.price}>S/ {finalPrice}</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          isOutOfStock && styles.buttonDisabled,
          isInCart && styles.buttonInCart
        ]}
        onPress={handleAddToCart}
        disabled={isOutOfStock}
      >
        <Text style={[
          styles.buttonText,
          isOutOfStock && styles.buttonTextDisabled,
          isInCart && styles.buttonTextInCart
        ]}>
          {isOutOfStock ? 'Sin Stock' : isInCart ? `En carrito (${quantityInCart})` : 'Agregar'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    marginBottom: 16,
    padding: 10,
    backgroundColor: colors.background,
    borderRadius: 10,
    elevation: 2,
    minHeight: 280,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 6,
  },
  infoContainer: {
    flexGrow: 1,
  },
  brand: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  oldPrice: {
    fontSize: 12,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  discount: {
    fontSize: 12,
    color: colors.error,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.border,
  },
  buttonInCart: {
    backgroundColor: colors.success,
  },
  buttonText: {
    color: colors.textWhite,
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: colors.textSecondary,
  },
  buttonTextInCart: {
    color: colors.textWhite,
  },
});
