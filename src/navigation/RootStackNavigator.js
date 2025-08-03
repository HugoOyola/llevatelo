import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';
import SearchStackNavigator from './SearchStackNavigator';

const RootStack = createNativeStackNavigator();

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="AppTabs" component={AppNavigator} />
      <RootStack.Screen name="BuscarModal" component={SearchStackNavigator} />
    </RootStack.Navigator>
  );
}
