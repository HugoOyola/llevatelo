import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';

export default function DetalleProductoScreen({ route }) {
  const { producto } = route.params;
  const finalPrice = producto.price - (producto.price * producto.discount / 100);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: producto.mainImage }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.brand}>{producto.brand}</Text>
        <Text style={styles.title}>{producto.title}</Text>

        {producto.discount > 0 && (
          <View style={styles.priceRow}>
            <Text style={styles.oldPrice}>S/ {producto.price.toLocaleString()}</Text>
            <Text style={styles.discount}>-{producto.discount}%</Text>
          </View>
        )}
        <Text style={styles.price}>S/ {finalPrice.toLocaleString()}</Text>

        <Text style={styles.description}>{producto.longDescription}</Text>

        <TouchableOpacity style={styles.button} disabled={producto.stock === 0}>
          <Text style={styles.buttonText}>
            {producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    flex: 1,
  },
  image: {
    width: '100%',
    height: 280,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  brand: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  oldPrice: {
    fontSize: 16,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  discount: {
    fontSize: 16,
    color: colors.error,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.textWhite,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
