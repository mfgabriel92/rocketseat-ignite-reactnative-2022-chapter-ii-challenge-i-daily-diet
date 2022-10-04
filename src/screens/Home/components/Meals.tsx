import { Button } from "@components/Button";
import { useMeal } from "@contexts/MealContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { format } from "date-fns";
import { Center, SectionList, Text, VStack } from "native-base";
import { useCallback } from "react";
import { Alert } from "react-native";
import { MealItem } from "./MealItem";

function Meals() {
  const { navigate } = useNavigation();
  const { getMeals, meals } = useMeal();

  useFocusEffect(
    useCallback(() => {
      async function doGetMeals() {
        try {
          getMeals();
        } catch (e) {
          const error = e as AppError;
          Alert.alert("Meals", error.message);
        }
      }
      doGetMeals();
    }, []),
  );

  return (
    <VStack flex="1">
      <Text>Meals</Text>
      <Button icon="add" marginTop="2" onPress={() => navigate("saveMeal")}>
        New meal
      </Button>
      <SectionList
        flex="1"
        marginTop="8"
        sections={meals}
        keyExtractor={(i) => String(i.id)}
        renderSectionHeader={({ section }) => (
          <Text fontSize="lg" fontWeight="bold" marginBottom="2">
            {format(new Date(section.title), "MM/dd/yyyy")}
          </Text>
        )}
        renderItem={({ item }) => <MealItem {...item} />}
        ListEmptyComponent={() => (
          <Center>
            <Text>You do not have any meal registered</Text>
          </Center>
        )}
      />
    </VStack>
  );
}

export { Meals };
