import { Text, StyleSheet, FlatList, ScrollView } from 'react-native';
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

      <Text style={styles.seccionTitulo}>Productos Destacados</Text>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        scrollEnabled={false}
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
  seccionTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginVertical: 8,
  },
  listaCategorias: {
    gap: 12,
    paddingBottom: 16,
  },
  listaProductos: {
    gap: 16,
    paddingBottom: 20,
  },
});

