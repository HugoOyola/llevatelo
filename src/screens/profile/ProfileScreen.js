// src/screens/profile/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles/colors';

export default function ProfileScreen({ navigation }) {
  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Inicio' }],
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.cameraButton}>
            <Icon name="camera" size={16} color={colors.textWhite} />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Hugo Oyola Yarlaque</Text>
        <Text style={styles.email}>hugo212h@gmail.com</Text>
        <Text style={styles.date}>Miembro desde enero de 2023</Text>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryValue}>12</Text>
          <Text style={styles.summaryLabel}>Pedidos</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryValue}>S/.1,100</Text>
          <Text style={styles.summaryLabel}>Gastado</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryValue}>1100</Text>
          <Text style={styles.summaryLabel}>Puntos</Text>
        </View>
      </View>

      <View style={styles.loyaltyBox}>
        <Text style={styles.loyaltyTitle}>🎁 Programa de Fidelidad</Text>
        <Text style={styles.loyaltyPoints}>1100 puntos disponibles</Text>
        <Text style={styles.loyaltyDesc}>
          Canjea tus puntos por descuentos y productos exclusivos
        </Text>
        <TouchableOpacity
          style={styles.benefitsButton}
          onPress={() => navigation.navigate('Ver beneficios')}
        >
          <Text style={styles.benefitsText}>Ver beneficios</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Editar perfil')}>
        <Icon name="user" size={16} color={colors.textPrimary} style={styles.icon} />
        <View>
          <Text style={styles.optionTitle}>Editar perfil</Text>
          <Text style={styles.optionDesc}>Actualiza tu información personal</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Pedidos')}>
        <Icon name="shopping-bag" size={16} color={colors.textPrimary} style={styles.icon} />
        <View>
          <Text style={styles.optionTitle}>Mis pedidos</Text>
          <Text style={styles.optionDesc}>12 pedidos realizados</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Direcciones')}>
        <Icon name="map-pin" size={16} color={colors.textPrimary} style={styles.icon} />
        <View>
          <Text style={styles.optionTitle}>Direcciones</Text>
          <Text style={styles.optionDesc}>Gestiona tus direcciones de envío</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Configuración')}>
        <Icon name="settings" size={16} color={colors.textPrimary} style={styles.icon} />
        <View>
          <Text style={styles.optionTitle}>Configuración</Text>
          <Text style={styles.optionDesc}>Preferencias y notificaciones</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionItem} onPress={handleLogout}>
        <Icon name="log-out" size={16} color={colors.error} style={styles.icon} />
        <View>
          <Text style={[styles.optionTitle, { color: colors.error }]}>Cerrar sesión</Text>
          <Text style={styles.optionDesc}>Salir de tu cuenta</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: colors.background,
  },
  imageContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    padding: 4,
    borderRadius: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 8,
  },
  email: {
    color: colors.textSecondary,
  },
  date: {
    fontSize: 12,
    color: colors.textMuted,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  summaryBox: {
    alignItems: 'center',
  },
  summaryValue: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: 16,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  loyaltyBox: {
    backgroundColor: '#FFF5F0',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  loyaltyTitle: {
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  loyaltyPoints: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  loyaltyDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  benefitsButton: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  benefitsText: {
    color: colors.textWhite,
    fontWeight: 'bold',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  icon: {
    marginRight: 12,
  },
  optionTitle: {
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  optionDesc: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
