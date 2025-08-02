import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import categorias from '../../data/categories.json';
import { colors } from '../../styles/colors';

export default function CategoriesScreen({ navigation }) {
  const handleCategoryPress = (categoria) => {
    navigation.navigate('ProductosPorCategoria', { categoria: categoria.title });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCategoryPress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explora por categoría</Text>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCategory}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

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
    marginBottom: 12,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    color: colors.textPrimary,
  },
});