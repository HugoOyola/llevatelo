import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles/colors';

export default function PedidoConfirmadoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Icon name="check-circle" size={80} color={colors.success} style={styles.icon} />
      <Text style={styles.title}>¡Pedido Confirmado!</Text>
      <Text style={styles.description}>
        Gracias por tu compra. Hemos recibido tu pedido y lo estamos procesando.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AppTabs')}
      >
        <Text style={styles.buttonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: colors.surface },
  icon: { marginBottom: 24 },
  title: { fontSize: 22, fontWeight: 'bold', color: colors.primary, marginBottom: 8 },
  description: { fontSize: 16, textAlign: 'center', color: colors.textSecondary, marginBottom: 32 },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: { color: colors.textWhite, fontWeight: 'bold', fontSize: 16 },
});
