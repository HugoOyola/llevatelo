import { Text, StyleSheet, FlatList, ScrollView, View, TouchableOpacity } from 'react-native';
import WelcomeBanner from '../../components/common/WelcomeBanner';
import CategoryItem from '../../components/cards/CategoryItem';
import ProductCard from '../../components/cards/ProductCard';
import { colors } from '../../styles/colors';
import categorias from '../../data/categories.json';
import productos from '../../data/products.json';

export default function HomeScreen({ navigation }) {
  const handleCategoryPress = (categoria) => {
    navigation.navigate('ProductosPorCategoria', { categoria: categoria.title });
  };

  const handleProductPress = (producto) => {
    navigation.navigate('DetalleProducto', { producto });
  };

  const handleVerTodo = (filtro) => {
    navigation.navigate('ProductosFiltrados', { filtro });
  };

  const productosNuevos = [...productos]
    .filter(p => p.stock > 0)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  const productosConDescuento = productos
    .filter(p => p.stock > 0 && (p.discount > 0 || p.highlight === 'oferta'))
    .slice(0, 8);

  const productosDestacados = productos
    .filter(p => p.stock > 0 && p.isFeatured)
    .slice(0, 6);

  const TituloConVerTodo = ({ titulo, onPress }) => (
    <View style={styles.filaTitulo}>
      <Text style={styles.seccionTitulo}>{titulo}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.verTodo}>Ver todo</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <WelcomeBanner />

      <Text style={styles.seccionTitulo}>Categorías</Text>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listaCategorias}
        renderItem={({ item }) => (
          <CategoryItem category={item} onPress={handleCategoryPress} />
        )}
      />

      <TituloConVerTodo titulo="Ofertas Especiales" onPress={() => handleVerTodo('oferta')} />
      <FlatList
        data={productosConDescuento}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listaProductosHorizontal}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={handleProductPress} showDiscount />
        )}
      />

      <TituloConVerTodo titulo="Lo Más Nuevo" onPress={() => handleVerTodo('nuevo')} />
      <FlatList
        data={productosNuevos}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listaProductosHorizontal}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={handleProductPress} />
        )}
      />

      <TituloConVerTodo titulo="Productos Destacados" onPress={() => handleVerTodo('destacados')} />
      <FlatList
        data={productosDestacados}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.listaProductos}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={handleProductPress} />
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  filaTitulo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  seccionTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  verTodo: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  listaCategorias: {
    gap: 12,
    paddingBottom: 16,
  },
  listaProductos: {
    gap: 16,
    paddingBottom: 20,
  },
  listaProductosHorizontal: {
    gap: 12,
    paddingBottom: 16,
  },
});
