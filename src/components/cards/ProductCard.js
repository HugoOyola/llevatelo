import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Badge from '../common/Badge';
import { colors } from '../../styles/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 36) / 2;

export default function ProductCard({ product, onPress, cardWidth = CARD_WIDTH, showDiscount = false }) {
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
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
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
        {isOutOfStock && <Badge label="Sin Stock" color={colors.error} textColor="#fff" />}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.title} numberOfLines={1}>{product.title}</Text>

        {hasDiscount && (
          <View style={styles.priceRow}>
            <Text style={styles.oldPrice}>S/ {product.price.toLocaleString()}</Text>
            {showDiscount && <Text style={styles.discount}>-{product.discount}%</Text>}
          </View>
        )}

        <Text style={styles.price}>S/ {finalPrice.toLocaleString()}</Text>
      </View>

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
    fontSize: 11,
    color: colors.textMuted,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
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
    marginTop: 12,
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
