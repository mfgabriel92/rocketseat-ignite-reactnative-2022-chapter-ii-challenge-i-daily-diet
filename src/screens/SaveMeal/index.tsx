import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Label } from "@components/Label";
import { PageBody } from "@components/PageBody";
import { PageHeader } from "@components/PageHeader";
import { Select } from "@components/Select";
import { MealProps, useMeal } from "@contexts/MealContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { format } from "date-fns";
import { Box, Button as NBButton, Column, HStack, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import "react-native-get-random-values";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { v4 as uuid } from "uuid";

type DatetimeMode = "date" | "time";

function SaveMeal() {
  const [showDatetimePicker, setShowDatetimePicker] = useState<boolean>(false);
  const [datetimePickerMode, setDatetimePickerMode] = useState<DatetimeMode>("date");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>(format(new Date(), "MM/dd/yyyy"));
  const [time, setTime] = useState<string>(format(new Date(), "h:mm a"));
  const [isInDiet, setIsInDiet] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { navigate } = useNavigation();
  const { saveMeal } = useMeal();
  const { params } = useRoute();

  useEffect(() => {
    if (params) {
      const { name, description, date, time, isInDiet } = params as MealProps;
      setName(name);
      setDescription(description);
      setDate(date);
      setTime(time);
      setIsInDiet(isInDiet);
    }
  }, [params]);

  function handleOpenDateTimePicker(mode: DatetimeMode = "date") {
    setDatetimePickerMode(mode);
    setShowDatetimePicker(true);
  }

  function onConfirmDatetime(value: Date) {
    switch (datetimePickerMode) {
      case "date":
        setDate(format(new Date(value), "yyyy-MM-dd"));
        break;
      case "time":
        setTime(format(new Date(value), "hh:mm"));
        break;
    }

    setShowDatetimePicker(false);
  }

  function onCancelDatetime() {
    setShowDatetimePicker(false);
  }

  async function handleSaveMeal() {
    if (name === "" || description === "" || time === "") {
      return Alert.alert("New meal", "Please, fill all the inputs");
    }

    const meal: MealProps = {
      id: undefined,
      name,
      description,
      date: format(new Date(date), "yyyy-MM-dd"),
      time,
      isInDiet,
    };

    if (params) {
      const { id } = params as MealProps;
      meal.id = id;
    }

    try {
      setIsLoading(true);
      await saveMeal(meal);
      navigate(isInDiet ? "keepUp" : "tooBad");
    } catch (e) {
      const error = e as AppError;
      Alert.alert("Meals", error.message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <DateTimePickerModal
        isVisible={showDatetimePicker}
        mode={datetimePickerMode}
        onConfirm={onConfirmDatetime}
        onCancel={onCancelDatetime}
        maximumDate={new Date()}
      />
      <PageHeader>{params ? "Edit meal" : "New meal"}</PageHeader>
      <PageBody>
        <Input label="Name" value={name} onChangeText={setName} />
        <Input
          label="Description"
          height="32"
          textAlignVertical="top"
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <HStack space="4">
          <Select
            label="Date"
            value={format(new Date(date), "MM/dd/yyyy")}
            onPress={() => handleOpenDateTimePicker()}
          />
          <Select label="Time" value={time} onPress={() => handleOpenDateTimePicker("time")} />
        </HStack>
        <VStack width="full" space="2" marginTop="3">
          <Label label="Is in the diet?" />
          <HStack space="4">
            <NBButton
              flex="1"
              height="12"
              backgroundColor={isInDiet ? "green.100" : "gray.200"}
              borderWidth="1"
              borderColor={isInDiet ? "green.300" : "gray.200"}
              onPress={() => setIsInDiet(true)}
            >
              <HStack alignItems="center" space="2">
                <Box borderRadius="12" width="2" height="2" backgroundColor="green.500" />
                <Text fontFamily="heading">Yes</Text>
              </HStack>
            </NBButton>
            <NBButton
              flex="1"
              height="12"
              backgroundColor={!isInDiet ? "red.100" : "gray.200"}
              borderWidth="1"
              borderColor={!isInDiet ? "red.300" : "gray.200"}
              onPress={() => setIsInDiet(false)}
            >
              <HStack alignItems="center" space="2">
                <Box borderRadius="12" width="2" height="2" backgroundColor="red.500" />
                <Text fontFamily="heading">No</Text>
              </HStack>
            </NBButton>
          </HStack>
        </VStack>
        <Button
          width="full"
          marginTop="auto"
          icon="checkmark-outline"
          isLoading={isLoading}
          onPress={handleSaveMeal}
        >
          Save meal
        </Button>
      </PageBody>
    </>
  );
}

export { SaveMeal };
