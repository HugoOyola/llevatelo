import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { colors } from "../../styles/colors";
import { useCart } from "../../hooks/useCart";
import { formatearPrecio } from "../../utils/precio";

const shippingOptions = [
  { id: 'standard', label: 'Envío Estándar', time: '5-7 días hábiles', cost: 5 },
  { id: 'express', label: 'Envío Express', time: '1-2 días hábiles', cost: 15 },
  { id: 'pickup', label: 'Retiro en Tienda', time: 'Disponible hoy', cost: 0 },
];

export default function CheckoutSummaryScreen({ navigation }) {
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const { items, subtotal, total, itemCount } = useCart();

  // Calcular costo de envío
  const shippingCost = shippingOptions.find(opt => opt.id === selectedShipping)?.cost || 0;
  const finalTotal = subtotal + shippingCost;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Resumen del Pedido</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.title} <Text style={styles.gray}>x{item.quantity}</Text>
            </Text>
            <Text style={styles.price}>{formatearPrecio(item.finalPrice * item.quantity)}</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <>
            <View style={styles.separator} />
            <View style={styles.item}>
              <Text style={styles.gray}>Subtotal</Text>
              <Text style={styles.gray}>{formatearPrecio(subtotal)}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.gray}>Envío</Text>
              <Text style={styles.gray}>{shippingCost > 0 ? formatearPrecio(shippingCost) : "Gratis"}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.total}>{formatearPrecio(finalTotal)}</Text>
            </View>
          </>
        )}
      />

      <Text style={styles.sectionTitle}>Método de Entrega</Text>
      {shippingOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[styles.option, selectedShipping === option.id && styles.optionSelected]}
          onPress={() => setSelectedShipping(option.id)}
        >
          <Icon
            name={selectedShipping === option.id ? "check-circle" : "circle"}
            size={20}
            color={selectedShipping === option.id ? colors.primary : colors.border}
            style={{ marginRight: 10 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.optionLabel}>{option.label}</Text>
            <Text style={styles.optionTime}>{option.time}</Text>
          </View>
          <Text style={styles.optionPrice}>
            {option.cost > 0 ? formatearPrecio(option.cost) : "Gratis"}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Pago")}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.surface
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 8,
    color: colors.textPrimary
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6
  },
  itemText: {
    fontSize: 14,
    color: colors.textPrimary,
    flex: 1,
  },
  price: {
    fontWeight: "bold",
    color: colors.textPrimary
  },
  gray: {
    color: colors.textSecondary
  },
  totalLabel: {
    fontWeight: "600",
    fontSize: 16,
    color: colors.textPrimary
  },
  total: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.primary
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryBackground,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  optionTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  optionPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: "bold",
  },
});
