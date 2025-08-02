import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchScreen } from "../screens/";
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
    </Stack.Navigator>
  );
}
