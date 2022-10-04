import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GeneralStatistics } from "@screens/GeneralStatistics";
import { Home } from "@screens/Home";
import { KeepUp } from "@screens/KeepUp";
import { Meal } from "@screens/Meal";
import { SaveMeal } from "@screens/SaveMeal";
import { TooBad } from "@screens/TooBad";

const Stack = createNativeStackNavigator();

function AppRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="meal" component={Meal} />
      <Stack.Screen name="statistics" component={GeneralStatistics} />
      <Stack.Screen name="saveMeal" component={SaveMeal} />
      <Stack.Screen name="keepUp" component={KeepUp} />
      <Stack.Screen name="tooBad" component={TooBad} />
    </Stack.Navigator>
  );
}

export { AppRoutes };
