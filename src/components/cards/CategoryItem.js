import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';

export default function CategoryItem({ category, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(category)}>
      <View style={[styles.emojiContainer, { backgroundColor: category.bgColor || '#eee' }]}>
        <Text style={styles.emoji}>{category.emoji}</Text>
      </View>
      <Text style={styles.title}>{category.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 12,
    width: 72,
  },
  emojiContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  emoji: {
    fontSize: 28,
  },
  title: {
    fontSize: 10,
    textAlign: 'center',
    color: colors.textSecondary,
    maxWidth: 70,
  }
});