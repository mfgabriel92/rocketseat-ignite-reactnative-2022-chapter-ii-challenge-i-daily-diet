import tooBad from "@assets/not-in-diet.png";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { Center, Image, Text } from "native-base";

function TooBad() {
  const { navigate } = useNavigation();

  return (
    <Center flex="1" justifyContent="center" padding="8">
      <Text fontFamily="heading" fontSize="2xl" color="red.500">
        Too bad!
      </Text>
      <Text fontSize="lg" textAlign="center" marginTop="2">
        You are not in the diet this time, but keep pushing and do not give up.
      </Text>
      <Image source={tooBad} width={224} height={288} alt="" marginTop="12" />
      <Button icon="home-outline" marginTop="8" onPress={() => navigate("home")}>
        Back to main screen
      </Button>
    </Center>
  );
}

export { TooBad };
