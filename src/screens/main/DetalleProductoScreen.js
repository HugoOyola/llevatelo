import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles/colors';

export default function ProductDetailScreen({ route }) {
  const { producto } = route.params;
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < producto.stock) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    console.log(`Añadido ${quantity} unidades al carrito`);
  };

  const precioFinal = (producto.price * (1 - producto.discount / 100)).toFixed(2);

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
              <Text style={styles.oldPrice}>S/. {producto.price.toFixed(2)}</Text>
              <Text style={styles.discountLabel}>-{producto.discount}% OFF</Text>
            </>
          )}
        </View>
        <Text style={styles.price}>S/. {precioFinal}</Text>

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
          <TouchableOpacity onPress={handleDecrease} style={styles.qtyButton}>
            <Text style={styles.qtyText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={handleIncrease} style={styles.qtyButton}>
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Añadir al carrito</Text>
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
    height: 240,
    resizeMode: 'contain',
    backgroundColor: '#f5f5f5',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  tagText: {
    fontSize: 12,
    color: colors.primaryDark,
  },
  shortDescription: {
    fontSize: 14,
    marginHorizontal: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 4,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
    marginRight: 8,
  },
  discountLabel: {
    backgroundColor: colors.error,
    color: colors.textWhite,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
  },
  price: {
    fontSize: 26,
    color: colors.primary,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
    gap: 6,
  },
  stockText: {
    color: colors.success,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    marginHorizontal: 16,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  specLabel: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 20,
  },
  qtyButton: {
    backgroundColor: colors.surface,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  qtyText: {
    fontSize: 20,
    color: colors.textPrimary,
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.textWhite,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
