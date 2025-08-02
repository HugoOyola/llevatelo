import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';

export default function EditProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} placeholder="Juan Pérez" />

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput style={styles.input} placeholder="juan.perez@email.com" keyboardType="email-address" />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput style={styles.input} placeholder="999999999" keyboardType="phone-pad" />

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Guardar cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.surface,
  },
  label: {
    marginTop: 16,
    marginBottom: 4,
    color: colors.textSecondary,
    fontSize: 14,
  },
  input: {
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  saveButton: {
    marginTop: 32,
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.textWhite,
    fontWeight: 'bold',
  },
});
