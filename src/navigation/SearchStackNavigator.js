import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchScreen } from "../screens/";
import ProductDetailScreen from "../screens/main/ProductDetailScreen"; // asegúrate de importar correctamente
import Header from "../components/common/Header";

const Stack = createNativeStackNavigator();

export default function SearchStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Buscar"
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <Stack.Screen name="Buscar" component={SearchScreen} />
      <Stack.Screen name="DetalleProducto" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}
