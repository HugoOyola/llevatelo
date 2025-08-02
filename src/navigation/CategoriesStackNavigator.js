import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoriesScreen } from "../screens/";
import Header from "../components/common/Header";

const Stack = createNativeStackNavigator();

export default function CategoriesStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Categorías"
      screenOptions={{
        header: ({ route }) => <Header title="Mundo Geek" subtitle={route.name} />,
      }}
    >
      <Stack.Screen name="Categorías" component={CategoriesScreen} />
    </Stack.Navigator>
  );
}
