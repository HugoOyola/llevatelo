import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSendInstructions = () => {
    // Aquí iría la lógica para enviar el email
    console.log('Enviando instrucciones a:', email);
    setIsEmailSent(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Icon name="lock-reset" size={40} color={colors.primary} />
          </View>

          <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
          <Text style={styles.subtitle}>
            No te preocupes, te ayudamos a recuperarla. Ingresa tu email y te enviaremos las instrucciones.
          </Text>
        </View>

        {!isEmailSent ? (
          /* Email Form */
          <View style={styles.formSection}>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Icon name="email" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor={colors.textMuted}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSendInstructions}
              activeOpacity={0.8}
            >
              <Icon name="send" size={20} color={colors.textWhite} style={styles.buttonIcon} />
              <Text style={styles.primaryButtonText}>Enviar instrucciones</Text>
            </TouchableOpacity>

            {/* Information Cards */}
            <View style={styles.infoSection}>
              <View style={styles.infoCard}>
                <Icon name="schedule" size={24} color={colors.accent} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoTitle}>Tiempo de entrega</Text>
                  <Text style={styles.infoText}>El email puede tardar hasta 5 minutos en llegar</Text>
                </View>
              </View>

              <View style={styles.infoCard}>
                <Icon name="security" size={24} color={colors.warning} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoTitle}>Seguridad</Text>
                  <Text style={styles.infoText}>El enlace expira en 24 horas por seguridad</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          /* Success Message */
          <View style={styles.successSection}>
            <View style={styles.successIcon}>
              <Icon name="check-circle" size={60} color={colors.success} />
            </View>

            <Text style={styles.successTitle}>¡Email enviado!</Text>
            <Text style={styles.successText}>
              Hemos enviado las instrucciones a{'\n'}
              <Text style={styles.emailText}>{email}</Text>
            </Text>

            <View style={styles.successInfoContainer}>
              <View style={styles.successInfoItem}>
                <Icon name="inbox" size={20} color={colors.accent} />
                <Text style={styles.successInfoText}>Revisa tu bandeja de entrada</Text>
              </View>

              <View style={styles.successInfoItem}>
                <Icon name="spam" size={20} color={colors.warning} />
                <Text style={styles.successInfoText}>No olvides revisar spam</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.resendButton}
              onPress={handleSendInstructions}
              activeOpacity={0.7}
            >
              <Icon name="refresh" size={18} color={colors.primary} style={styles.resendIcon} />
              <Text style={styles.resendText}>Reenviar email</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={20} color={colors.primary} style={styles.backIcon} />
          <Text style={styles.backText}>Volver al login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: colors.primaryBackground,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    ...typography.styles.h2,
    color: colors.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.styles.subtitle,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  formSection: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    ...typography.styles.body,
    color: colors.textPrimary,
    padding: 0,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    ...typography.styles.button,
    color: colors.textWhite,
  },
  buttonIcon: {
    marginRight: 8,
  },
  infoSection: {
    gap: 16,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoContent: {
    flex: 1,
    marginLeft: 16,
  },
  infoTitle: {
    ...typography.styles.h6,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  infoText: {
    ...typography.styles.bodySmall,
    color: colors.textSecondary,
  },
  successSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  successIcon: {
    marginBottom: 24,
  },
  successTitle: {
    ...typography.styles.h3,
    color: colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  successText: {
    ...typography.styles.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  emailText: {
    color: colors.primary,
    fontFamily: typography.fonts.heading,
  },
  successInfoContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  successInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 8,
  },
  successInfoText: {
    ...typography.styles.bodySmall,
    color: colors.textSecondary,
    marginLeft: 12,
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  resendIcon: {
    marginRight: 8,
  },
  resendText: {
    ...typography.styles.bodySmall,
    color: colors.primary,
    fontFamily: typography.fonts.heading,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 12,
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  backIcon: {
    marginRight: 8,
  },
  backText: {
    ...typography.styles.body,
    color: colors.primary,
    fontFamily: typography.fonts.heading,
  },
});