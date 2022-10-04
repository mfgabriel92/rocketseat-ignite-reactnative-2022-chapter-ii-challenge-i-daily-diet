import { Button } from "@components/Button";
import { PageBody } from "@components/PageBody";
import { PageHeader } from "@components/PageHeader";
import { MealProps, useMeal } from "@contexts/MealContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { format } from "date-fns";
import { Text, VStack } from "native-base";
import { Alert } from "react-native";

function Meal() {
  const { deleteMeal } = useMeal();
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const { id, name, description, date, time, isInDiet } = params as MealProps;

  async function handleDeleteMeal() {
    Alert.alert("Delete meal", "Do you want to proceed and delete the meal?", [
      {
        text: "Yes",
        onPress: async () => await doDeleteMeal(),
      },
      {
        text: "No",
      },
    ]);
  }

  async function doDeleteMeal() {
    try {
      const meal = { id, name, description, date, time, isInDiet };
      await deleteMeal(meal);
      navigate("home");
    } catch (e) {
      const error = e as AppError;
      Alert.alert("Meals", error.message);
    }
  }

  return (
    <>
      <PageHeader backgroundColor={isInDiet ? "green.100" : "red.100"}>Meal</PageHeader>
      <PageBody alignItems="flex-start" space="3">
        <Text fontSize="xl" fontFamily="heading">
          {name}
        </Text>
        <Text fontSize="lg">{description}</Text>
        <Text fontFamily="heading" marginTop="4">
          Date and time
        </Text>
        <Text>
          {format(new Date(date), "MM/dd/yyyy")} at {time}
        </Text>
        <VStack width="full" marginTop="auto" space="2">
          <Button
            icon="pencil"
            onPress={() => navigate("saveMeal", { id, name, description, date, time, isInDiet })}
          >
            Edit meal
          </Button>
          <Button icon="trash" variant="outline" onPress={handleDeleteMeal}>
            Remove meal
          </Button>
        </VStack>
      </PageBody>
    </>
  );
}

export { Meal };
