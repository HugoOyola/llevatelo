import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator'; // Importar directamente TabNavigator
import SearchStackNavigator from './SearchStackNavigator';

const RootStack = createNativeStackNavigator();

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Home" component={TabNavigator} />
      <RootStack.Screen name="Buscar" component={SearchStackNavigator} />
    </RootStack.Navigator>
  );
}
