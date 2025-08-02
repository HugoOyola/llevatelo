import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoriesScreen } from "../screens/";
import ProductosPorCategoriaScreen from "../screens/categories/ProductosPorCategoriaScreen";
import ProductDetailScreen from "../screens/main/ProductDetailScreen";
import Header from "../components/common/Header";

const Stack = createNativeStackNavigator();

export default function CategoriesStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Categorías"
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <Stack.Screen name="Categorías" component={CategoriesScreen} />
      <Stack.Screen
        name="ProductosPorCategoria"
        component={ProductosPorCategoriaScreen}
      />
      <Stack.Screen
        name="DetalleProducto"
        component={ProductDetailScreen}
      />
    </Stack.Navigator>
  );
}
