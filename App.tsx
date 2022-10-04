import { Loading } from "@components/Loading";
import { MealProvider } from "@contexts/MealContext";
import {
  NunitoSans_400Regular,
  NunitoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito-sans";
import { Routes } from "@routes/index";
import { defaultTheme } from "@themes/defaultTheme";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, VStack } from "native-base";

function App() {
  const [isFontLoaded] = useFonts({ NunitoSans_400Regular, NunitoSans_700Bold });

  return (
    <MealProvider>
      <NativeBaseProvider theme={defaultTheme}>
        <StatusBar style="dark" backgroundColor="transparent" />
        <VStack flex="1">{isFontLoaded ? <Routes /> : <Loading />}</VStack>
      </NativeBaseProvider>
    </MealProvider>
  );
}

export default App;
