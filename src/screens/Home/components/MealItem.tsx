import { MealProps } from "@contexts/MealContext";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Pressable, Text } from "native-base";

function MealItem({ id, name, description, date, time, isInDiet }: MealProps) {
  const { navigate } = useNavigation();

  return (
    <Pressable
      borderRadius="8"
      paddingX="3"
      paddingY="4"
      marginBottom="2"
      borderWidth="1"
      borderColor="gray.300"
      alignSelf="center"
      width="full"
      _pressed={{
        backgroundColor: isInDiet ? "green.100" : "red.100",
        borderColor: isInDiet ? "green.300" : "red.300",
      }}
      onPress={() => navigate("meal", { id, name, description, date, time, isInDiet })}
    >
      <HStack alignItems="center">
        <Text
          color="gray.700"
          fontWeight="bold"
          paddingRight="3"
          marginRight="3"
          borderRightWidth="1"
          borderRightColor="gray.300"
        >
          {time}
        </Text>
        <Text color="gray.600" flex="1">
          {description}
        </Text>
        <Box
          width="3"
          height="3"
          backgroundColor={isInDiet ? "green.300" : "red.300"}
          borderRadius="full"
        />
      </HStack>
    </Pressable>
  );
}

export { MealItem };
