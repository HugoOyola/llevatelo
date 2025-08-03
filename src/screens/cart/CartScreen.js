import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles/colors';
import { useCart } from '../../hooks/useCart';
import { formatearPrecio } from '../../utils/precio';

export default function CartScreen({ navigation }) {
  const {
    items,
    total,
    subtotal,
    totalDiscount,
    itemCount,
    removeProductFromCart,
    incrementProductQuantity,
    decrementProductQuantity,
  } = useCart();

  const handleIncrement = (productId) => {
    incrementProductQuantity(productId);
  };

  const handleDecrement = (productId) => {
    decrementProductQuantity(productId);
  };

  const handleRemove = (productId) => {
    removeProductFromCart(productId);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.mainImage }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.brand}>{item.brand}</Text>

        {/* Precios */}
        <View style={styles.priceContainer}>
          {item.discount > 0 && (
            <Text style={styles.oldPrice}>{formatearPrecio(item.price)}</Text>
          )}
          <Text style={styles.price}>{formatearPrecio(item.finalPrice)}</Text>
        </View>

        {/* Controles de cantidad */}
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleDecrement(item.id)}
          >
            <Icon name="minus" size={16} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleIncrement(item.id)}
          >
            <Icon name="plus" size={16} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.delete}
        onPress={() => handleRemove(item.id)}
      >
        <Icon name="trash-2" size={20} color={colors.error} />
      </TouchableOpacity>
    </View>
  );

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="shopping-cart" size={64} color={colors.textSecondary} />
        <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
        <Text style={styles.emptyText}>Agrega productos para comenzar tu compra</Text>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('Inicio')} // Navegar al tab Inicio
        >
          <Text style={styles.continueButtonText}>Continuar comprando</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Tu Carrito</Text>
      <Text style={styles.subtitle}>
        {itemCount} {itemCount === 1 ? 'producto' : 'productos'} en tu carrito
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            {/* Resumen */}
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal:</Text>
                <Text style={styles.summaryValue}>{formatearPrecio(subtotal)}</Text>
              </View>

              {totalDiscount > 0 && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Descuentos:</Text>
                  <Text style={styles.discountValue}>-{formatearPrecio(totalDiscount)}</Text>
                </View>
              )}

              <View style={styles.separator} />
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>{formatearPrecio(total)}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('ResumenPedido')}
            >
              <Text style={styles.checkoutText}>Iniciar compra</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 16
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12
  },
  item: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12
  },
  info: {
    flex: 1
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.textPrimary
  },
  brand: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  oldPrice: {
    fontSize: 12,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  price: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 12,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  quantity: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
    minWidth: 20,
    textAlign: 'center',
  },
  delete: {
    padding: 6
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
  },
  summaryContainer: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary
  },
  summaryValue: {
    fontSize: 14,
    color: colors.textPrimary
  },
  discountValue: {
    fontSize: 14,
    color: colors.success,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary
  },
  totalValue: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold'
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: 'bold'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueButtonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
