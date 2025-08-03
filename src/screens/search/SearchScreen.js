import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles/colors';
import productos from '../../data/products.json';
import ProductCard from '../../components/cards/ProductCard';
import { useCart } from '../../hooks/useCart';

const BUSQUEDAS_POPULARES = [
  'PS5',
  'Xbox',
  'Funko Pop',
  'Marvel',
  'DC Comics',
  'Nintendo Wii',
];

export default function SearchScreen({ navigation }) {
  const { addProductToCart } = useCart();
  const [query, setQuery] = useState('');
  const [recientes, setRecientes] = useState([
    'PlayStation 5',
    'Nintendo',
    'Comics Marvel',
    'Arduino',
  ]);

  const handleSearch = (term) => {
    setQuery(term);
    Keyboard.dismiss();

    if (!recientes.includes(term)) {
      setRecientes([term, ...recientes.slice(0, 4)]);
    }
  };

  const limpiarRecientes = () => setRecientes([]);
  const limpiarInput = () => setQuery('');

  const handleProductPress = (producto) => {
    navigation.navigate('DetalleProducto', { producto });
  };

  const resultados = query.length > 0
    ? productos.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const renderSearchItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSearch(item)} style={styles.itemRow}>
      <Icon name="search" size={16} color={colors.textMuted} style={styles.icon} />
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderResultItem = ({ item }) => (
    <ProductCard
      product={item}
      onPress={handleProductPress}
      // ProductCard ya maneja el carrito internamente
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Icon name="search" size={16} color={colors.textMuted} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar productos..."
          value={query}
          onChangeText={setQuery}
          placeholderTextColor={colors.textMuted}
          returnKeyType="search"
          onSubmitEditing={() => handleSearch(query)}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={limpiarInput}>
            <Icon name="x" size={16} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {query.length === 0 ? (
        <>
          {recientes.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Búsquedas recientes</Text>
                <TouchableOpacity onPress={limpiarRecientes}>
                  <Text style={styles.limpiar}>Limpiar</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={recientes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderSearchItem}
              />
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Búsquedas populares</Text>
            <FlatList
              data={BUSQUEDAS_POPULARES}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderSearchItem}
            />
          </View>
        </>
      ) : (
        <View style={styles.section}>
          {resultados.length === 0 ? (
            <Text style={styles.noResults}>No se encontraron productos</Text>
          ) : (
            <FlatList
              data={resultados}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderResultItem}
              numColumns={2}
              contentContainerStyle={styles.resultados}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    paddingVertical: 10,
    minHeight: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  limpiar: {
    fontSize: 13,
    color: colors.primary,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  noResults: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 40,
  },
  resultados: {
    gap: 16,
    paddingBottom: 40,
  },
});
