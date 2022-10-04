import { Pressable } from "@components/Pressable";
import { useMeal } from "@contexts/MealContext";
import { useNavigation } from "@react-navigation/native";
import { Text, useTheme, VStack, IStackProps } from "native-base";
import { ArrowLeft, ArrowUpRight } from "phosphor-react-native";

interface SummaryProps extends IStackProps {
  showBackButton?: boolean;
}

function Summary({ showBackButton = false, ...rest }: SummaryProps) {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const { percentageOfMealsInDiet } = useMeal();

  return (
    <VStack
      backgroundColor={percentageOfMealsInDiet > 50 ? "green.100" : "red.100"}
      borderRadius="8"
      paddingY="5"
      alignItems="center"
      justifyContent="center"
      space="1"
      position="relative"
      {...rest}
    >
      {showBackButton && (
        <Pressable position="absolute" left="1" top="8" onPress={() => navigate("home")}>
          <ArrowLeft
            color={percentageOfMealsInDiet > 50 ? colors.green[500] : colors.red[500]}
            size={24}
          />
        </Pressable>
      )}
      {!showBackButton && (
        <Pressable position="absolute" right="1" top="1" onPress={() => navigate("statistics")}>
          <ArrowUpRight
            color={percentageOfMealsInDiet > 50 ? colors.green[500] : colors.red[500]}
            size={24}
          />
        </Pressable>
      )}
      <Text fontFamily="heading" fontSize="2xl" color="gray.600">
        {percentageOfMealsInDiet} %
      </Text>
      <Text color="gray.600">of the meals of the diet</Text>
    </VStack>
  );
}

export { Summary };
