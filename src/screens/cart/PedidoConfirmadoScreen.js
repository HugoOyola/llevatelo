import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles/colors';
import { useCart } from '../../hooks/useCart';

export default function PedidoConfirmadoScreen({ navigation }) {
  const { clearAllCart, itemCount } = useCart();

  React.useEffect(() => {
    // Asegurar que el carrito esté completamente limpio
    if (itemCount > 0) {
      clearAllCart();
    }
  }, [clearAllCart, itemCount]);

  const handleGoHome = () => {
    // Navegar a la pantalla principal usando reset para limpiar el stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'AppTabs' }],
    });
  };

  const handleViewOrders = () => {
    // Navegar al tab de Perfil y luego a Pedidos
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'AppTabs',
          state: {
            routes: [{ name: 'Perfil' }],
            index: 0,
          }
        }
      ],
    });

    // Usar setTimeout para asegurar que la navegación al tab se complete primero
    setTimeout(() => {
      navigation.navigate('AppTabs', {
        screen: 'Perfil',
        params: {
          screen: 'Pedidos'
        }
      });
    }, 100);
  };

  return (
    <View style={styles.container}>
      <Icon name="check-circle" size={80} color={colors.success} style={styles.icon} />
      <Text style={styles.title}>¡Pedido Confirmado!</Text>
      <Text style={styles.description}>
        Gracias por tu compra. Hemos recibido tu pedido y lo estamos procesando.
        Te enviaremos actualizaciones por correo electrónico.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleGoHome}
        >
          <Text style={styles.primaryButtonText}>Volver al inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleViewOrders}
        >
          <Text style={styles.secondaryButtonText}>Ver mis pedidos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.surface
  },
  icon: {
    marginBottom: 24
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.success,
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: 32,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.textWhite,
    fontWeight: 'bold',
    fontSize: 16
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14
  },
});
