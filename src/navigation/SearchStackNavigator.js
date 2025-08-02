import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchScreen } from "../screens/";
import Header from "../components/common/Header";

const Stack = createNativeStackNavigator();

export default function SearchStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Buscar"
      screenOptions={{
        header: ({ route }) => <Header title="Mundo Geek" subtitle={route.name} />,
      }}
    >
      <Stack.Screen name="Buscar" component={SearchScreen} />
    </Stack.Navigator>
  );
}
