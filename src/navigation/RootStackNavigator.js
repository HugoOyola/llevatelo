import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser, clearUser } from '../features/user/userSlice';

const RootStack = createNativeStackNavigator();

export default function RootStackNavigator() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.value);
  const isAuthenticated = !!user; // Si hay usuario, está autenticado

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          dispatch(setUser(parsedUser));
        }
      } catch (error) {
        console.log('Error checking auth:', error);
      }
    };
    checkAuth();
  }, [dispatch]);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <RootStack.Screen name="AppTabs" component={TabNavigator} />
          <RootStack.Screen name="Buscar" component={SearchStackNavigator} />
        </>
      ) : (
        <RootStack.Screen name="Auth" component={AuthStackNavigator} />
      )}
    </RootStack.Navigator>
  );
}
