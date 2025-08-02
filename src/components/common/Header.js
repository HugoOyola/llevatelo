import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';

const Header = () => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Botón atrás */}
        <View style={styles.sideContainer}>
          {canGoBack ? (
            <Pressable onPress={() => navigation.goBack()} style={styles.iconButton}>
              <Icon name="chevron-left" size={24} color={colors.primary} />
            </Pressable>
          ) : (
            <View style={styles.placeholder} />
          )}
        </View>

        {/* Título */}
        <View style={styles.centerContainer}>
          <Text style={styles.title}>Llévatelo</Text>
        </View>

        {/* Botones de buscar y carrito */}
        <View style={styles.sideContainer}>
          <Pressable
            onPress={() => navigation.navigate('Buscar')}
            style={styles.iconButton}
          >
            <Icon name="search" size={20} color={colors.primary} />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Carrito')}
            style={styles.iconButton}
          >
            <Icon name="shopping-cart" size={20} color={colors.primary} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 58,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
    justifyContent: 'flex-start',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 6,
    padding: 6,
  },
  title: {
    fontSize: 20,
    color: colors.textPrimary,
    fontFamily: 'Raleway-SemiBold',
  },
  placeholder: {
    width: 32,
  },
});
