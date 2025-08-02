import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FavoritesScreen } from "../screens/";
import Header from "../components/common/Header";

const Stack = createNativeStackNavigator();

export default function FavoritesStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Favoritos"
      screenOptions={{
        header: ({ route }) => <Header title="Mundo Geek" subtitle={route.name} />,
      }}
    >
      <Stack.Screen name="Favoritos" component={FavoritesScreen} />
    </Stack.Navigator>
  );
}
