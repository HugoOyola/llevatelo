import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles/colors';

// En el futuro, esto vendría de una API o Redux
const mockOrders = [
  {
    id: '1',
    date: '10/07/2025',
    total: 400.00,
    status: 'Entregado',
    items: ['PlayStation 5', 'Control DualSense'],
    itemCount: 2,
  },
  {
    id: '2',
    date: '02/06/2025',
    total: 200.00,
    status: 'En camino',
    items: ['Pendrive Kingston 64GB', 'Cable USB-C'],
    itemCount: 3,
  },
  {
    id: '3',
    date: '25/05/2025',
    total: 120.00,
    status: 'Pendiente',
    items: ['Funko Pop Marvel'],
    itemCount: 1,
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Entregado':
      return colors.success;
    case 'En camino':
      return colors.warning;
    case 'Pendiente':
      return colors.error;
    default:
      return colors.textSecondary;
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'Entregado':
      return 'check-circle';
    case 'En camino':
      return 'truck';
    case 'Pendiente':
      return 'clock';
    default:
      return 'help-circle';
  }
};

export default function OrdersScreen() {
  const renderOrder = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderId}>Pedido #{item.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Icon
            name={getStatusIcon(item.status)}
            size={12}
            color={getStatusColor(item.status)}
          />
          <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
            {item.status}
          </Text>
        </View>
      </View>

      <Text style={styles.date}>{item.date}</Text>

      <View style={styles.itemsContainer}>
        <Text style={styles.itemsLabel}>
          {item.itemCount} {item.itemCount === 1 ? 'producto' : 'productos'}:
        </Text>
        <Text style={styles.itemsList} numberOfLines={2}>
          {item.items.join(', ')}
        </Text>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.total}>Total: S/ {item.total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.detailButton}>
          <Text style={styles.detailButtonText}>Ver detalles</Text>
          <Icon name="chevron-right" size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Pedidos</Text>
      <FlatList
        data={mockOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="package" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyTitle}>No hay pedidos</Text>
            <Text style={styles.emptyText}>
              Cuando realices tu primera compra, aparecerá aquí.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  itemsContainer: {
    marginBottom: 12,
  },
  itemsLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  itemsList: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
