import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { useCart } from '../../hooks/useCart';

const NO_BACK_ROUTES = ['Home', 'Categorías', 'Buscar', 'Perfil', 'Carrito'];

const Header = () => {
  const { itemCount } = useCart();
  const navigation = useNavigation();
  const route = useRoute();

  const canGoBack = navigation.canGoBack() && !NO_BACK_ROUTES.includes(route.name);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleCartPress = () => {
    navigation.navigate('Carrito');
  };

  const handleSearchPress = () => {
    navigation.navigate('Buscar');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Botón atrás o placeholder */}
        <View style={styles.sideContainer}>
          {canGoBack ? (
            <Pressable onPress={handleBackPress} style={styles.iconButton}>
              <Icon name="chevron-left" size={26} color={colors.primary} />
            </Pressable>
          ) : (
            <View style={styles.placeholder} />
          )}
        </View>

        {/* Título */}
        <View style={styles.centerContainer}>
          <Text style={styles.title}>Llévatelo</Text>
        </View>

        {/* Botones de búsqueda y carrito */}
        <View style={styles.sideContainer}>
          <Pressable onPress={handleSearchPress} style={styles.iconButton}>
            <Icon name="search" size={22} color={colors.primary} />
          </Pressable>

          <Pressable onPress={handleCartPress} style={styles.iconButton}>
            <Icon name="shopping-cart" size={22} color={colors.primary} />
            {itemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{itemCount}</Text>
              </View>
            )}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    elevation: 4, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 10,
  },
  sideContainer: {
    width: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'normal',
    color: colors.primary,
    fontFamily: 'Raleway-SemiBold',
  },
  iconButton: {
    padding: 6,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  badgeText: {
    color: colors.textWhite,
    fontSize: 10,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 26,
    height: 26,
  },
});

