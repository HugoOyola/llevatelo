import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/";
import Header from "../components/common/Header";

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        header: ({ route }) => <Header title="Mundo Geek" subtitle={route.name} />,
      }}
    >
      <Stack.Screen name="Inicio" component={HomeScreen} />
    </Stack.Navigator>
  );
}
