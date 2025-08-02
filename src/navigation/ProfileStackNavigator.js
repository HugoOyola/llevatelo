// src/navigation/ProfileStackNavigator.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import OrdersScreen from '../screens/profile/OrdersScreen';
import AddressesScreen from '../screens/profile/AddressesScreen';
import LoyaltyBenefitsScreen from '../screens/profile/LoyaltyBenefitsScreen';
import SettignsScreen from '../screens/profile/SettingsScreen';
import Header from '../components/common/Header';

const Stack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ route }) => (
          <Header title="Llévatelo" subtitle={route.name} />
        ),
      }}
    >
      <Stack.Screen name="Perfil" component={ProfileScreen} />
      <Stack.Screen name="Editar perfil" component={EditProfileScreen} />
      <Stack.Screen name="Pedidos" component={OrdersScreen} />
      <Stack.Screen name="Direcciones" component={AddressesScreen} />
      <Stack.Screen name="Ver beneficios" component={LoyaltyBenefitsScreen} />
      <Stack.Screen name="Configuración" component={SettignsScreen} />
    </Stack.Navigator>
  );
}
