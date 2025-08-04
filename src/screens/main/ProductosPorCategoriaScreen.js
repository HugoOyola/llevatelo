import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProductCard from '../../components/cards/ProductCard';
import { colors } from '../../styles/colors';
import { useGetProductsQuery } from '../../services/shop/shopApi';

export default function ProductosPorCategoriaScreen({ route, navigation }) {
  const { categoria } = route.params;

  const { data: productos = [], isLoading } = useGetProductsQuery();

  const productosFiltrados = productos.filter(
    p => p.category.toLowerCase() === categoria.toLowerCase() && p.stock > 0
  );

  const handleProductPress = (producto) => {
    navigation.navigate('DetalleProducto', { producto });
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.titulo}>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{categoria}</Text>
      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.listaProductos}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={handleProductPress} />
        )}
        ListEmptyComponent={
          <Text style={[styles.titulo, { textAlign: 'center', marginTop: 40 }]}>
            No hay productos disponibles en esta categoría.
          </Text>
        }
      />
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
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.textPrimary,
    textTransform: 'capitalize'
  },
  listaProductos: {
    paddingBottom: 20,
    gap: 16,
  },
});
