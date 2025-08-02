import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from './TabNavigator';

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
}