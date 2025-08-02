import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles/colors';

const paymentMethods = [
  {
    id: 'credit',
    label: 'Tarjeta de Crédito',
    description: 'Visa, Mastercard, American Express',
  },
  {
    id: 'debit',
    label: 'Tarjeta de Débito',
    description: 'Débito inmediato',
  },
  {
    id: 'transfer',
    label: 'Transferencia Bancaria',
    description: 'CBU o Alias',
  },
  {
    id: 'cash',
    label: 'Efectivo (Solo retiro)',
    description: 'Pago en tienda física',
  },
];

export default function CheckoutPaymentScreen({ navigation }) {
  const [selectedMethod, setSelectedMethod] = useState('credit');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const handleContinue = () => {
    // Aquí podrías validar el formulario antes de navegar
    navigation.navigate('PedidoConfirmado');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.sectionTitle}>Método de Pago</Text>

      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[styles.card, selectedMethod === method.id && styles.cardSelected]}
          onPress={() => setSelectedMethod(method.id)}
        >
          <View style={styles.cardContent}>
            <Icon
              name={selectedMethod === method.id ? 'check-circle' : 'circle'}
              size={20}
              color={selectedMethod === method.id ? colors.primary : colors.border}
              style={styles.cardIcon}
            />
            <View>
              <Text style={styles.cardTitle}>{method.label}</Text>
              <Text style={styles.cardSubtitle}>{method.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Información de Contacto</Text>

      <View style={styles.inputGroup}>
        <Icon name="phone" size={18} color={colors.textSecondary} style={styles.inputIcon} />
        <TextInput
          placeholder="Teléfono"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="mail" size={18} color={colors.textSecondary} style={styles.inputIcon} />
        <TextInput
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
      </View>

      <View style={[styles.inputGroup, { height: 80, alignItems: 'flex-start', paddingTop: 10 }]}>
        <Icon
          name="message-circle"
          size={18}
          color={colors.textSecondary}
          style={[styles.inputIcon, { marginTop: 4 }]}
        />
        <TextInput
          placeholder="Notas (opcional)"
          value={notes}
          onChangeText={setNotes}
          style={[styles.input, { height: '100%' }]}
          multiline
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Confirmar Pedido</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.surface },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
    color: colors.textPrimary,
  },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    backgroundColor: colors.background,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#f5faff',
  },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  cardIcon: { marginRight: 10 },
  cardTitle: { fontWeight: '600', fontSize: 15, color: colors.textPrimary },
  cardSubtitle: { fontSize: 12, color: colors.textSecondary },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 14,
    backgroundColor: colors.background,
  },
  inputIcon: { marginRight: 10 },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
    height: 40,
  },
  button: {
    marginTop: 24,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
