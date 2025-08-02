import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../screens/cart/CartScreen';
import CheckoutSummaryScreen from '../screens/cart/CheckoutSummaryScreen';
import CheckoutPaymentScreen from '../screens/cart/CheckoutPaymentScreen';
import PedidoConfirmadoScreen from '../screens/cart/PedidoConfirmadoScreen';
import Header from '../components/common/Header';

const Stack = createNativeStackNavigator();

export default function CartStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ header: () => <Header /> }}>
      <Stack.Screen name="Carrito" component={CartScreen} />
      <Stack.Screen name="ResumenPedido" component={CheckoutSummaryScreen} />
      <Stack.Screen name="Pago" component={CheckoutPaymentScreen} />
      <Stack.Screen name="PedidoConfirmado" component={PedidoConfirmadoScreen} />
    </Stack.Navigator>
  );
}