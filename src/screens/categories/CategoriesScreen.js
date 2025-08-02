import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import categorias from '../../data/categories.json';
import { colors } from '../../styles/colors';

export default function CategoriesScreen({ navigation }) {
  const handleCategoryPress = (categoria) => {
    navigation.navigate('ProductosPorCategoria', { categoria: categoria.slug });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.bgColor }]}
      onPress={() => handleCategoryPress(item)}
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explora por categoría</Text>
      <FlatList
        data={categorias}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const CARD_SIZE = '47%';

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
    width: CARD_SIZE,
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
});
