import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../styles/colors";
import { StyleSheet, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import MainStackNavigator from "./MainStackNavigator";
import CategoriesStackNavigator from "./CategoriesStackNavigator";
import SearchStackNavigator from "./SearchStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import CartStackNavigator from "./CartStackNavigator";
import { useCart } from '../hooks/useCart';

const Tab = createBottomTabNavigator();

function CartTabIcon({ color, size }) {
  const { itemCount } = useCart();

  return (
    <View style={{ position: 'relative' }}>
      <Icon name="bag-outline" size={size} color={color} />
      {itemCount > 0 && (
        <View style={styles.tabBadge}>
          <Text style={styles.tabBadgeText}>{itemCount}</Text>
        </View>
      )}
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={MainStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Categorías"
        component={CategoriesStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="apps-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Buscar"
        component={SearchStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="search-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="person-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Carrito"
        component={CartStackNavigator}
        options={{
          tabBarIcon: CartTabIcon,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background,
  },
  tabBadge: {
    position: 'absolute',
    top: -3,
    right: -6,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBadgeText: {
    color: colors.textWhite,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
