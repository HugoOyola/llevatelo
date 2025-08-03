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
import { useCart } from '../../hooks/useCart';
import { formatearPrecio } from '../../utils/precio';

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
  const { total, itemCount, clearAllCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState('credit');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const handleConfirmOrder = () => {
    // Aquí podrías validar el formulario antes de procesar
    if (!phone || !email) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    // Procesar pago (aquí iría la lógica de pago real)
    clearAllCart(); // Limpiar carrito después del pago exitoso
    navigation.navigate('PedidoConfirmado');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Resumen del pedido */}
      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>Resumen del Pedido</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Total de productos:</Text>
          <Text style={styles.summaryValue}>{itemCount} {itemCount === 1 ? 'producto' : 'productos'}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryTotalLabel}>Total a pagar:</Text>
          <Text style={styles.summaryTotalValue}>{formatearPrecio(total)}</Text>
        </View>
      </View>

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
          placeholder="Teléfono *"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="mail" size={18} color={colors.textSecondary} style={styles.inputIcon} />
        <TextInput
          placeholder="Correo electrónico *"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor={colors.textSecondary}
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
          placeholder="Notas adicionales (opcional)"
          value={notes}
          onChangeText={setNotes}
          style={[styles.input, { height: '100%', textAlignVertical: 'top' }]}
          multiline
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleConfirmOrder}>
        <Text style={styles.buttonText}>Confirmar Pedido - {formatearPrecio(total)}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 16,
  },
  summaryContainer: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: colors.textPrimary,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  cardIcon: {
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
