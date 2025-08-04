import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Badge from '../common/Badge';
import { colors } from '../../styles/colors';
import { useCart } from '../../hooks/useCart';
import { calcularPrecioFinal } from '../../utils/precio';

export default function ProductCard({
  product,
  onPress,
  showDiscount = false,
  horizontal = false
}) {
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
      style={[
        styles.card,
        horizontal ? styles.cardHorizontal : styles.cardGrid
      ]}
      onPress={() => onPress(product)}
      disabled={isOutOfStock}
    >
      <Image
        source={{ uri: product.mainImage }}
        style={[
          styles.image,
          horizontal ? styles.imageHorizontal : styles.imageGrid
        ]}
      />

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
        <Text
          style={[
            styles.title,
            horizontal ? styles.titleHorizontal : styles.titleGrid
          ]}
          numberOfLines={horizontal ? 1 : 2}
        >
          {product.title}
        </Text>

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
    marginBottom: 16,
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    justifyContent: 'space-between',
  },
  cardGrid: {
    width: '47%',
    minHeight: 280,
  },
  cardHorizontal: {
    width: 160,
    minHeight: 240,
    marginRight: 12,
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
    marginBottom: 8,
    borderRadius: 8,
  },
  imageGrid: {
    height: 120,
  },
  imageHorizontal: {
    height: 100,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 8,
    minHeight: 20,
  },
  infoContainer: {
    flexGrow: 1,
    marginBottom: 8,
  },
  brand: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 2,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  title: {
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
    lineHeight: 18,
  },
  titleGrid: {
    fontSize: 14,
  },
  titleHorizontal: {
    fontSize: 13,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  oldPrice: {
    fontSize: 12,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  discount: {
    fontSize: 11,
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
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 36,
    justifyContent: 'center',
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
    textAlign: 'center',
  },
  buttonTextDisabled: {
    color: colors.textSecondary,
  },
  buttonTextInCart: {
    color: colors.textWhite,
  },
});