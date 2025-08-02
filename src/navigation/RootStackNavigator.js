import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';
import CartStackNavigator from './CartStackNavigator'; // <-- Nuevo

const RootStack = createNativeStackNavigator();

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="AppTabs" component={AppNavigator} />
      <RootStack.Screen name="CarritoStack" component={CartStackNavigator} />
    </RootStack.Navigator>
  );
}
