import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Badge from '../common/Badge';
import { colors } from '../../styles/colors';

export default function ProductCard({ product, onPress }) {
  const isOutOfStock = product.stock === 0;
  const hasDiscount = product.discount > 0;
  const finalPrice = product.price - (product.price * product.discount / 100);

  const badgeColors = {
    new: colors.info,
    ofert: colors.warning,
    popular: colors.accent,
    classic: colors.secondaryLight,
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(product)} disabled={isOutOfStock}>
      <Image source={{ uri: product.mainImage }} style={styles.image} />
      <View style={styles.badgeRow}>
        {product.tags?.map(tag => (
          <Badge key={tag} label={tag.charAt(0).toUpperCase() + tag.slice(1)} color={badgeColors[tag] || colors.border} textColor={colors.textWhite} />
        ))}
        {isOutOfStock && <Badge label="Sin Stock" color={colors.error} textColor="#fff" />}
      </View>
      <Text style={styles.brand}>{product.brand}</Text>
      <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
      {hasDiscount ? (
        <View style={styles.priceRow}>
          <Text style={styles.oldPrice}>S/ {product.price.toLocaleString()}</Text>
          <Text style={styles.discount}>-{product.discount}%</Text>
        </View>
      ) : null}
      <Text style={styles.price}>S/ {finalPrice.toLocaleString()}</Text>
      <View style={[styles.button, isOutOfStock && styles.buttonDisabled]}>
        <Text style={[styles.buttonText, isOutOfStock && styles.buttonTextDisabled]}>
          {isOutOfStock ? 'Sin Stock' : 'Agregar'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 10,
    backgroundColor: colors.background,
    borderRadius: 10,
    elevation: 2,
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
    marginBottom: 6,
  },
  brand: {
    fontSize: 11,
    color: colors.textMuted,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  oldPrice: {
    fontSize: 12,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  discount: {
    fontSize: 12,
    color: colors.error,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 2,
  },
  button: {
    marginTop: 8,
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.border,
  },
  buttonText: {
    color: colors.textWhite,
    fontSize: 13,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: colors.textMuted,
  },
});
