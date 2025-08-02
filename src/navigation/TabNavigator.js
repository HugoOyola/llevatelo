import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../styles/colors";
import { StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import MainStackNavigator from "./MainStackNavigator";
import CategoriesStackNavigator from "./CategoriesStackNavigator";
import SearchStackNavigator from "./SearchStackNavigator";
import FavoritesStackNavigator from "./FavoritesStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,       // Color del texto activo
        tabBarInactiveTintColor: colors.textSecondary, // Color del texto inactivo
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
        name="Favoritos"
        component={FavoritesStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="heart-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="person-outline" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background,
  },
});
