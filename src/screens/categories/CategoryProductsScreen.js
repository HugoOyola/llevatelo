import { View, Text, FlatList, StyleSheet } from 'react-native';
import productos from '../../data/products.json';
import ProductCard from '../../components/cards/ProductCard';
import { colors } from '../../styles/colors';

export default function CategoryProductsScreen({ route, navigation }) {
  const { categoria } = route.params;

  const productosFiltrados = productos.filter(
    (producto) => producto.category.toLowerCase() === categoria.toLowerCase()
  );

  const handleProductPress = (producto) => {
    navigation.navigate('DetalleProducto', { producto });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categoría: {categoria}</Text>
      {productosFiltrados.length === 0 ? (
        <Text style={styles.emptyText}>No hay productos en esta categoría.</Text>
      ) : (
        <FlatList
          data={productosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={handleProductPress} />
          )}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  list: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 30,
  },
});
