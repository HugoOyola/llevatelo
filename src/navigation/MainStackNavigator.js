import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/main/HomeScreen';
import ProductosFiltradosScreen from '../screens/main/ProductosFiltradosScreen';
import ProductosPorCategoriaScreen from '../screens/main/ProductosPorCategoriaScreen';
import DetalleProductoScreen from '../screens/main/DetalleProductoScreen';
import Header from '../components/common/Header';

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Inicio' }}
      />
      <Stack.Screen
        name="ProductosFiltrados"
        component={ProductosFiltradosScreen}
        options={{ title: 'Productos' }}
      />
      <Stack.Screen
        name="ProductosPorCategoria"
        component={ProductosPorCategoriaScreen}
        options={({ route }) => ({ title: route.params?.categoria || 'Categoría' })}
      />
      <Stack.Screen
        name="DetalleProducto"
        component={DetalleProductoScreen}
        options={({ route }) => ({ title: route.params?.producto?.title || 'Detalle' })}
      />
    </Stack.Navigator>
  );
}
