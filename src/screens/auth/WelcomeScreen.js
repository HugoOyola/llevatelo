import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

export default function WelcomeScreen({ navigation }) {
  const features = [
    {
      icon: 'videogame-asset',
      title: 'Productos Geek',
      description: 'Consolas, gadgets, comics y mucho más',
      color: colors.primary
    },
    {
      icon: 'local-shipping',
      title: 'Envío Gratis',
      description: 'En compras mayores a S/. 50.00',
      color: colors.success
    },
    {
      icon: 'security',
      title: 'Pago Seguro',
      description: 'Múltiples métodos de pago disponibles',
      color: colors.accent
    }
  ];

  const FeatureCard = ({ icon, title, description, color }) => (
    <View style={styles.featureCard}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Icon name={icon} size={32} color={color} />
      </View>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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
          <Text style={styles.subtitle}>Tu tienda geek favorita</Text>

          {/* Decorative elements */}
          <View style={styles.decorativeContainer}>
            <View style={[styles.decorativeBox, styles.box1]} />
            <View style={[styles.decorativeBox, styles.box2]} />
            <View style={[styles.decorativeBox, styles.box3]} />
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>
            <Icon name="star" size={20} color={colors.primary} /> ¿Por qué elegirnos?
          </Text>

          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Icon name="inventory" size={24} color={colors.primary} />
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Productos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Icon name="people" size={24} color={colors.primary} />
            <Text style={styles.statNumber}>10K+</Text>
            <Text style={styles.statLabel}>Usuarios</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Icon name="favorite" size={24} color={colors.primary} />
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Register')}
          activeOpacity={0.8}
        >
          <Icon name="rocket-launch" size={20} color={colors.textWhite} style={styles.buttonIcon} />
          <Text style={styles.primaryButtonText}>Comenzar Aventura</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>
            Ya tengo cuenta <Icon name="arrow-forward" size={16} color={colors.primary} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.component.screenPadding,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing['3xl'],
    paddingBottom: spacing.component.formGroupSpacing,
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: colors.primaryBackground,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.component.formGroupSpacing,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: typography.sizes['4xl'],
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.component.formGroupSpacing,
  },
  decorativeContainer: {
    position: 'relative',
    width: 100,
    height: 40,
  },
  decorativeBox: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 6,
    opacity: 0.7,
  },
  box1: {
    backgroundColor: colors.primary,
    left: 0,
    top: 0,
    transform: [{ rotate: '15deg' }],
  },
  box2: {
    backgroundColor: colors.accent,
    left: 35,
    top: 5,
    transform: [{ rotate: '-15deg' }],
  },
  box3: {
    backgroundColor: colors.success,
    left: 70,
    top: 0,
    transform: [{ rotate: '25deg' }],
  },
  featuresSection: {
    marginBottom: spacing.component.sectionMargin,
  },
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.component.itemMargin,
    textAlign: 'center',
    marginBottom: spacing.component.sectionMargin,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.component.cardPadding,
    marginBottom: spacing.component.itemMargin,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.component.cardPadding,
  },
  featureContent: {
    flex: 1,
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  featureDescription: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.component.cardPadding,
    marginBottom: spacing.component.sectionMargin,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  statLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    marginHorizontal: spacing.component.itemMargin,
  },
  bottomSection: {
    paddingHorizontal: spacing.component.screenPadding,
    paddingBottom: spacing.component.sectionMargin,
    paddingTop: spacing.component.itemMargin,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.component.buttonLargePaddingVertical,
    borderRadius: 12,
    marginBottom: spacing.component.itemMargin,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: colors.textWhite,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
  },
  buttonIcon: {
    marginRight: spacing.component.buttonSmallPaddingHorizontal,
  },
  secondaryButton: {
    paddingVertical: spacing.component.buttonSmallPaddingVertical,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
  },
});
