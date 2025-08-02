import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { colors } from "../../styles/colors";
import { mockItems, shippingOptions } from "../../data/data";

export default function CheckoutSummaryScreen({ navigation }) {
  const [selectedShipping, setSelectedShipping] = useState("standard");

  const subtotal = mockItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = shippingOptions.find(opt => opt.id === selectedShipping)?.cost || 0;
  const total = subtotal + shippingCost;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Resumen del Pedido</Text>
      <FlatList
        data={mockItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.title} <Text style={styles.gray}>x{item.quantity}</Text>
            </Text>
            <Text style={styles.price}>S/. {item.price * item.quantity}</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <>
            <View style={styles.separator} />
            <View style={styles.item}>
              <Text style={styles.gray}>Subtotal</Text>
              <Text style={styles.gray}>S/. {subtotal}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.gray}>Envío</Text>
              <Text style={styles.gray}>{shippingCost > 0 ? `S/. ${shippingCost}` : "Gratis"}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.total}>S/. {total}</Text>
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
            {option.cost > 0 ? `S/. ${option.cost}` : "Gratis"}
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
  container: { flex: 1, padding: 16, backgroundColor: colors.surface },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginTop: 24, marginBottom: 8, color: colors.textPrimary },
  item: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  itemText: { fontSize: 14, color: colors.textPrimary },
  price: { fontWeight: "bold", color: colors.textPrimary },
  gray: { color: colors.textSecondary },
  totalLabel: { fontWeight: "600", fontSize: 16, color: colors.textPrimary },
  total: { fontWeight: "bold", fontSize: 16, color: colors.primary },
  separator: { height: 1, backgroundColor: colors.border, marginVertical: 8 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: "#fffaf4",
  },
  optionLabel: { fontWeight: "600", color: colors.textPrimary },
  optionTime: { fontSize: 12, color: colors.textSecondary },
  optionPrice: { fontWeight: "600", color: colors.textPrimary },
  button: {
    marginTop: 24,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: colors.textWhite, fontSize: 16, fontWeight: "bold" },
});
