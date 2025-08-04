import { Text, StyleSheet, FlatList, ScrollView, View, TouchableOpacity } from 'react-native';
import WelcomeBanner from '../../components/common/WelcomeBanner';
import CategoryItem from '../../components/cards/CategoryItem';
import ProductCard from '../../components/cards/ProductCard';
import { colors } from '../../styles/colors';
import { useGetCategoriesQuery, useGetProductsQuery } from '../../services/shop/shopApi';

export default function HomeScreen({ navigation }) {
  const { data: categorias = [], isLoading: loadingCategories } = useGetCategoriesQuery();
  const { data: productos = [], isLoading: loadingProducts } = useGetProductsQuery();

  const handleCategoryPress = (categoria) => {
    navigation.navigate('ProductosPorCategoria', { categoria: categoria.title });
  };

  const handleProductPress = (producto) => {
    navigation.navigate('DetalleProducto', { producto });
  };

  const handleVerTodo = (filtro) => {
    navigation.navigate('ProductosFiltrados', { filtro });
  };

  // Filtrar productos solo si ya se cargaron
  const productosNuevos = productos.length > 0 ? [...productos]
    .filter(p => p.stock > 0)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10) : [];

  const productosConDescuento = productos.length > 0 ? productos
    .filter(p => p.stock > 0 && (p.discount > 0 || p.highlight === 'oferta'))
    .slice(0, 8) : [];

  const productosDestacados = productos.length > 0 ? productos
    .filter(p => p.stock > 0 && p.isFeatured)
    .slice(0, 6) : [];

  const TituloConVerTodo = ({ titulo, onPress }) => (
    <View style={styles.filaTitulo}>
      <Text style={styles.seccionTitulo}>{titulo}</Text>
      <TouchableOpacity onPress={onPress} style={styles.verTodoButton}>
        <Text style={styles.verTodo}>Ver todo</Text>
      </TouchableOpacity>
    </View>
  );

  // Mostrar loading si está cargando
  if (loadingCategories || loadingProducts) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <WelcomeBanner />

      {/* Categorías */}
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

      {/* Ofertas Especiales */}
      {productosConDescuento.length > 0 && (
        <>
          <TituloConVerTodo
            titulo="Ofertas Especiales"
            onPress={() => handleVerTodo('oferta')}
          />
          <FlatList
            data={productosConDescuento}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listaProductosHorizontal}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={handleProductPress}
                showDiscount
                horizontal
              />
            )}
          />
        </>
      )}

      {/* Lo Más Nuevo */}
      {productosNuevos.length > 0 && (
        <>
          <TituloConVerTodo
            titulo="Lo Más Nuevo"
            onPress={() => handleVerTodo('nuevo')}
          />
          <FlatList
            data={productosNuevos}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listaProductosHorizontal}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={handleProductPress}
                horizontal
              />
            )}
          />
        </>
      )}

      {/* Productos Destacados */}
      {productosDestacados.length > 0 && (
        <>
          <TituloConVerTodo
            titulo="Productos Destacados"
            onPress={() => handleVerTodo('destacados')}
          />
          <FlatList
            data={productosDestacados}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listaProductos}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={handleProductPress}
              />
            )}
          />
        </>
      )}

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  filaTitulo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  seccionTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 12,
    marginTop: 20,
  },
  verTodoButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  verTodo: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  listaCategorias: {
    paddingLeft: 4,
    paddingRight: 16,
    paddingBottom: 8,
  },
  listaProductos: {
    paddingBottom: 16,
  },
  listaProductosHorizontal: {
    paddingLeft: 4,
    paddingRight: 16,
    paddingBottom: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  bottomSpacing: {
    height: 32,
  },
});