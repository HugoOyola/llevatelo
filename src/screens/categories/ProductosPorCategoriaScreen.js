import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import rawProductos from '../../data/products.json';
import { normalizarProductos } from '../../utils/normalizarProductos';
import { formatearNombreCategoria, compararCategoria } from '../../utils/categorias';
import { colors } from '../../styles/colors';

const productos = normalizarProductos(rawProductos);

export default function ProductosPorCategoriaScreen({ route, navigation }) {
  const { categoria } = route.params;

  const productosFiltrados = productos.filter(
    (p) => compararCategoria(p.category, categoria) && p.stock > 0
  );

  const handleProductPress = (producto) => {
    navigation.navigate('DetalleProducto', { producto });
  };

  const handleAddToCart = (producto) => {
    console.log(`Agregado ${producto.title} al carrito`);
  };

  const renderItem = ({ item }) => {
    const tieneDescuento = item.discount > 0;
    const esNuevo = item.highlight === 'nuevo';
    const precioFinal = (item.price * (1 - item.discount / 100)).toFixed(2);

    return (
      <TouchableOpacity style={styles.card} onPress={() => handleProductPress(item)}>
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

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>S/. {precioFinal}</Text>
        <Text style={styles.stock}>Stock: {item.stock}</Text>

        <TouchableOpacity style={styles.cartButton} onPress={() => handleAddToCart(item)}>
          <Icon name="shopping-cart" size={16} color={colors.textWhite} />
          <Text style={styles.cartButtonText}>Agregar</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

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
    padding: 10,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 6,
    position: 'absolute',
    top: 8,
    left: 8,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: colors.textWhite,
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 2,
  },
  stock: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    gap: 6,
    marginTop: 4,
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
