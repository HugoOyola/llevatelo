import { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/user/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateCredentials = async (email, password) => {
    // Simulamos una validación de credenciales
    // En una app real, esto sería una llamada a tu API
    const validUsers = [
      { id: 1, email: 'test@test.com', password: '123456', name: 'Usuario Test' },
      { id: 2, email: 'user@gmail.com', password: 'password', name: 'Usuario Demo' },
      { id: 3, email: 'admin@llevatelo.com', password: 'admin123', name: 'Administrador' }
    ];

    return new Promise((resolve) => {
      setTimeout(() => {
        const user = validUsers.find(u => u.email === email && u.password === password);
        resolve(user || null);
      }, 1500); // Simulamos delay de red
    });
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (!formData.email.includes('@')) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return;
    }

    setIsLoading(true);

    try {
      const user = await validateCredentials(formData.email, formData.password);

      if (user) {
        // Credenciales válidas
        const userData = {
          id: user.id,
          email: user.email,
          name: user.name,
          loginTime: new Date().toISOString()
        };

        // Guardar en AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(userData));

        // Actualizar Redux store
        dispatch(setUser(userData));

        // El RootStackNavigator se encargará de la navegación automáticamente
      } else {
        // Credenciales inválidas
        Alert.alert(
          'Error de Autenticación',
          'Email o contraseña incorrectos. Si no tienes cuenta, regístrate primero.',
          [
            { text: 'Intentar de nuevo', style: 'cancel' },
            {
              text: 'Registrarse',
              onPress: () => navigation.navigate('Register'),
              style: 'default'
            }
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
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
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Llévatelo</Text>
          <Text style={styles.subtitle}>¡Bienvenido de vuelta!</Text>

          <View style={styles.welcomeSection}>
            <Text style={styles.sectionTitle}>Iniciar Sesión</Text>
            <Text style={styles.sectionText}>
              Ingresa tus credenciales para acceder a tu cuenta
            </Text>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Email */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Icon name="email" size={20} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={colors.textMuted}
                editable={!isLoading}
              />
            </View>
          </View>

          {/* Contraseña */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Icon name="lock" size={20} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry={!showPassword}
                placeholderTextColor={colors.textMuted}
                editable={!isLoading}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
                disabled={isLoading}
              >
                <Icon
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotContainer}
            disabled={isLoading}
          >
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.primaryButton, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.textWhite} />
            ) : (
              <>
                <Icon name="login" size={20} color={colors.textWhite} style={styles.buttonIcon} />
                <Text style={styles.primaryButtonText}>Iniciar Sesión</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>O continúa con</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7} disabled={isLoading}>
              <Icon name="google" size={20} color={colors.error} />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7} disabled={isLoading}>
              <Icon name="facebook" size={20} color="#1877F2" />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
          </View>

          {/* Guest Access */}
          <TouchableOpacity style={styles.guestButton} activeOpacity={0.7} disabled={isLoading}>
            <Icon name="person-outline" size={18} color={colors.textSecondary} style={styles.guestIcon} />
            <Text style={styles.guestText}>Continuar como invitado</Text>
          </TouchableOpacity>
        </View>

        {/* Test Credentials */}
        <View style={styles.testCredsContainer}>
          <View style={styles.testCredsHeader}>
            <Icon name="info" size={16} color={colors.accent} />
            <Text style={styles.testCredsTitle}>Credenciales de prueba</Text>
          </View>
          <Text style={styles.testText}>Email: test@test.com</Text>
          <Text style={styles.testText}>Contraseña: 123456</Text>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.registerSection}>
          <Text style={styles.registerText}>¿No tienes cuenta? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            activeOpacity={0.7}
            disabled={isLoading}
          >
            <Text style={styles.registerLink}>Regístrate aquí</Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: 24,
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: colors.primaryBackground,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    ...typography.styles.h1,
    color: colors.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.styles.subtitle,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  welcomeSection: {
    alignItems: 'center',
  },
  sectionTitle: {
    ...typography.styles.h4,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  sectionText: {
    ...typography.styles.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  formSection: {
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 12,
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
  eyeIcon: {
    padding: 4,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    ...typography.styles.bodySmall,
    color: colors.primary,
    fontFamily: typography.fonts.heading,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
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
  buttonDisabled: {
    opacity: 0.6,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    ...typography.styles.caption,
    color: colors.textSecondary,
    marginHorizontal: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    marginHorizontal: 6,
    backgroundColor: colors.surface,
  },
  socialText: {
    ...typography.styles.bodySmall,
    color: colors.textPrimary,
    marginLeft: 8,
    fontFamily: typography.fonts.heading,
  },
  guestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 20,
  },
  guestIcon: {
    marginRight: 8,
  },
  guestText: {
    ...typography.styles.bodySmall,
    color: colors.textSecondary,
  },
  testCredsContainer: {
    backgroundColor: '#EAF4FF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  testCredsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  testCredsTitle: {
    ...typography.styles.caption,
    color: colors.accent,
    marginLeft: 6,
    fontFamily: typography.fonts.heading,
  },
  testText: {
    ...typography.styles.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 12,
  },
  registerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    ...typography.styles.body,
    color: colors.textSecondary,
  },
  registerLink: {
    ...typography.styles.body,
    color: colors.primary,
    fontFamily: typography.fonts.heading,
  },
});