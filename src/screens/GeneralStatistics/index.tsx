import { Summary } from "@components/Summary";
import { useMeal } from "@contexts/MealContext";
import { Column, HStack, Text } from "native-base";
import { useWindowDimensions } from "react-native";
import { Card } from "./components/Card";

function GeneralStatistics() {
  const { height } = useWindowDimensions();
  const { totalEntries, totalInDiet, totalNotInDiet, highestCountInDietSequence } = useMeal();
  const summaryHeight = height * 0.25;

  return (
    <>
      <Summary height={`${summaryHeight}px`} borderRadius="0" showBackButton />
      <Column
        flex="1"
        padding="6"
        borderTopLeftRadius="18"
        borderTopRightRadius="18"
        marginTop="-3"
        backgroundColor="white"
        alignItems="center"
        space="2"
      >
        <Text fontFamily="heading" marginBottom="3">
          General statistics
        </Text>
        <Card title="best in diet meal sequence" value={highestCountInDietSequence} />
        <Card title="registered meals" value={totalEntries} />
        <HStack space="2">
          <Card flex="1" variant="green" title="meals in the diet" value={totalInDiet} />
          <Card flex="1" variant="red" title="meals not in the diet" value={totalNotInDiet} />
        </HStack>
      </Column>
    </>
  );
}

export { GeneralStatistics };
