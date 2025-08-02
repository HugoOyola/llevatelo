import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';

export default function CategoryItem({ category, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(category)}>
      <Image source={{ uri: category.image }} style={styles.image} />
      <Text style={styles.title}>{category.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.surface,
    marginBottom: 6,
  },
  title: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});