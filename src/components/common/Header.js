import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles/colors';
import { useCart } from '../../hooks/useCart';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const { itemCount } = useCart();
  const navigation = useNavigation();

  const handleCartPress = () => {
    // Navegar al tab del carrito
    navigation.navigate('Carrito');
  };

  const handleSearchPress = () => {
    // Navegar al tab de búsqueda
    navigation.navigate('Buscar');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Título */}
        <View style={styles.centerContainer}>
          <Text style={styles.title}>Llévatelo</Text>
        </View>

        {/* Botones de buscar y carrito */}
        <View style={styles.sideContainer}>
          <Pressable
            onPress={handleSearchPress}
            style={styles.iconButton}
          >
            <Icon name="search" size={20} color={colors.primary} />
          </Pressable>

          <Pressable
            onPress={handleCartPress}
            style={styles.iconButton}
          >
            <Icon name="shopping-cart" size={20} color={colors.primary} />
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  sideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.error,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 20,
  },
  badgeText: {
    color: colors.textWhite,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
