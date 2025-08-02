// src/screens/profile/SettingsScreen.js
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Preferencias</Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Notificaciones</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          thumbColor={notificationsEnabled ? colors.primary : '#ccc'}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Modo oscuro</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          thumbColor={darkMode ? colors.primary : '#ccc'}
        />
      </View>

      <Text style={styles.sectionTitle}>Cuenta</Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Idioma</Text>
        <Text style={styles.value}>Español</Text>
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.label}>País</Text>
        <Text style={styles.value}>Perú</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.surface,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: 16,
    marginVertical: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  value: {
    fontSize: 15,
    color: colors.textSecondary,
  },
});
