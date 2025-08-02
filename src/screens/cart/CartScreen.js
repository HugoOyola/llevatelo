import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles/colors';
import { mockItems } from '../../data/data';

export default function CartScreen({ navigation }) {
  const total = mockItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Tu Carrito</Text>
      <Text style={styles.subtitle}>Revisa tu pedido antes de continuar con la compra</Text>
      <FlatList
        data={mockItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>S/. {item.price * item.quantity}</Text>
              <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
            </View>
            <TouchableOpacity style={styles.delete}>
              <Icon name="trash-2" size={20} color={colors.error} />
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>S/. {total}</Text>
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
  container: { flex: 1, backgroundColor: colors.surface, padding: 16 },
  screenTitle: { fontSize: 20, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginBottom: 12 },
  item: {
    flexDirection: 'row', marginBottom: 12,
    backgroundColor: colors.background,
    borderRadius: 8, padding: 10, alignItems: 'center',
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 1, elevation: 2,
  },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  info: { flex: 1 },
  title: { fontWeight: '600', fontSize: 14, color: colors.textPrimary },
  price: { color: colors.primary, fontWeight: 'bold', marginTop: 4 },
  quantity: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  delete: { padding: 6 },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  totalValue: { fontSize: 18, color: colors.primary, fontWeight: 'bold' },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: { color: colors.textWhite, fontSize: 16, fontWeight: 'bold' },
});
