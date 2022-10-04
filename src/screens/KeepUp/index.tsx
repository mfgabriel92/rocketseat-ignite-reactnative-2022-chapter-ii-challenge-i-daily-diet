import keepUp from "@assets/in-diet.png";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { Center, Image, Text } from "native-base";

function KeepUp() {
  const { navigate } = useNavigation();

  return (
    <Center flex="1" justifyContent="center" padding="8">
      <Text fontFamily="heading" fontSize="2xl" color="green.500">
        Keep it up!
      </Text>
      <Text fontSize="lg" textAlign="center" marginTop="2">
        You are still in the diet. Very good.
      </Text>
      <Image source={keepUp} width={224} height={288} alt="" marginTop="12" />
      <Button icon="home-outline" marginTop="8" onPress={() => navigate("home")}>
        Back to main screen
      </Button>
    </Center>
  );
}

export { KeepUp };
