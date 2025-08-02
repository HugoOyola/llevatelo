import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default function WelcomeBanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a Llévatelo!</Text>
      <Text style={styles.subtitle}>Descubre los mejores productos geek y tecnológicos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textWhite,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textWhite,
  },
});
