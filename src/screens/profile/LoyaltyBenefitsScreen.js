import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../../styles/colors';

const benefits = [
  {
    id: '1',
    title: '10% de descuento',
    description: 'Canjea 1000 puntos por un 10% de descuento en tu próxima compra.',
  },
  {
    id: '2',
    title: 'Envío gratuito',
    description: 'Canjea 800 puntos para obtener envío gratis.',
  },
  {
    id: '3',
    title: 'Producto exclusivo',
    description: 'Accede a productos exclusivos por 2500 puntos.',
  },
];

export default function LoyaltyBenefitsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={benefits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay beneficios disponibles.</Text>}
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
  description: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.textMuted,
  },
});
