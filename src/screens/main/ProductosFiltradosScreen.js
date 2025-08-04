import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProductCard from '../../components/cards/ProductCard';
import { colors } from '../../styles/colors';
import { useGetProductsQuery } from '../../services/shop/shopApi';

export default function ProductosFiltradosScreen({ route, navigation }) {
  const { filtro } = route.params;
  const { data: productos = [], isLoading } = useGetProductsQuery();

  const handleProductPress = (producto) => {
    navigation.navigate('DetalleProducto', { producto });
  };

  let productosFiltrados = [];

  if (productos.length > 0) {
    if (filtro === 'nuevo') {
      productosFiltrados = [...productos]
        .filter(p => p.stock > 0)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filtro === 'oferta') {
      productosFiltrados = productos.filter(
        p => p.stock > 0 && (p.discount > 0 || p.highlight === 'oferta')
      );
    } else if (filtro === 'destacados') {
      productosFiltrados = productos.filter(p => p.stock > 0 && p.isFeatured);
    }
  }

  const tituloPorFiltro = {
    nuevo: 'Lo Más Nuevo',
    oferta: 'Ofertas Especiales',
    destacados: 'Productos Destacados'
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
      <Text style={styles.titulo}>{tituloPorFiltro[filtro]}</Text>
      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.listaProductos}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={handleProductPress} />
        )}
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
  },
  listaProductos: {
    paddingBottom: 20,
    gap: 16,
  },
});
