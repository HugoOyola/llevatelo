import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { useState, useEffect } from 'react';

const RootStack = createNativeStackNavigator();

export default function RootStackNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Aquí va tu lógica real: Firebase Auth, AsyncStorage, etc.
    const checkAuth = async () => {
      setIsAuthenticated(false); // cambiar a true si el usuario está logueado
    };
    checkAuth();
  }, []);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <RootStack.Screen name="Home" component={TabNavigator} />
          <RootStack.Screen name="Buscar" component={SearchStackNavigator} />
        </>
      ) : (
        <RootStack.Screen name="Auth" component={AuthStackNavigator} />
      )}
    </RootStack.Navigator>
  );
}
