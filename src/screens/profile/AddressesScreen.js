import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';

const mockAddresses = [
  {
    id: '1',
    title: 'Casa',
    details: 'Av. Siempre Viva 123, Lima',
  },
  {
    id: '2',
    title: 'Oficina',
    details: 'Calle Tecnológica 456, San Isidro',
  },
];

export default function AddressesScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockAddresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.details}>{item.details}</Text>
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Agregar nueva dirección</Text>
          </TouchableOpacity>
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
  card: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  details: {
    color: colors.textSecondary,
  },
  addButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.primary,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.textWhite,
    fontWeight: 'bold',
  },
});
