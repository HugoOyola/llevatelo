import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { formatearNombreCategoria, compararCategoria } from '../../utils/categorias';
import { colors } from '../../styles/colors';
import { useCart } from '../../hooks/useCart';
import { useGetProductsQuery } from '../../services/shop/shopApi';

export default function ProductosPorCategoriaScreen({ route, navigation }) {
  const { categoria } = route.params;
  const { addProductToCart } = useCart();
  const { data: productos = [], isLoading } = useGetProductsQuery();

  const productosFiltrados = productos.filter(
    (p) => compararCategoria(p.category, categoria) && p.stock > 0
  );

  const handleProductPress = (producto) => {
    navigation.navigate('DetalleProducto', { producto });
  };

  const handleAddToCart = (producto) => {
    addProductToCart(producto, 1);
  };

  const renderItem = ({ item }) => {
    const tieneDescuento = item.discount > 0;
    const esNuevo = item.highlight === 'nuevo';
    const precioFinal = (item.price * (1 - item.discount / 100)).toFixed(2);

    return (
      <TouchableOpacity style={styles.card} onPress={() => handleProductPress(item)}>
        {/* Contenedor de la imagen con badges */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.mainImage }} style={styles.image} />
          <View style={styles.badgesContainer}>
            {tieneDescuento && (
              <View style={[styles.badge, { backgroundColor: colors.error }]}>
                <Text style={styles.badgeText}>Oferta</Text>
              </View>
            )}
            {esNuevo && (
              <View style={[styles.badge, { backgroundColor: colors.success }]}>
                <Text style={styles.badgeText}>Nuevo</Text>
              </View>
            )}
          </View>
        </View>

        {/* Contenedor del contenido que crece */}
        <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>

          <View style={styles.priceContainer}>
            {tieneDescuento && (
              <Text style={styles.originalPrice}>S/. {item.price.toFixed(2)}</Text>
            )}
            <Text style={styles.price}>S/. {precioFinal}</Text>
          </View>

          <Text style={styles.stock}>Stock: {item.stock}</Text>
        </View>

        {/* Botón siempre en la parte inferior */}
        <TouchableOpacity
          style={styles.cartButton}
          onPress={(e) => {
            e.stopPropagation();
            handleAddToCart(item);
          }}
        >
          <Icon name="shopping-cart" size={16} color={colors.textWhite} />
          <Text style={styles.cartButtonText}>Agregar</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.header}>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Productos de {formatearNombreCategoria(categoria)}</Text>
      <FlatList
        data={productosFiltrados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay productos disponibles.</Text>
        }
      />
    </View>
  );
}

const CARD_WIDTH = '47%';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    // Flexbox para organizar el contenido
    minHeight: 280,
    justifyContent: 'space-between',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 4,
    position: 'absolute',
    top: 6,
    left: 6,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    elevation: 1,
  },
  badgeText: {
    color: colors.textWhite,
    fontSize: 10,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'left',
    marginBottom: 8,
    lineHeight: 18,
  },
  priceContainer: {
    marginBottom: 4,
  },
  originalPrice: {
    fontSize: 12,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  stock: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 6,
    marginTop: 'auto',
  },
  cartButtonText: {
    color: colors.textWhite,
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: 40,
    fontSize: 16,
  },
});