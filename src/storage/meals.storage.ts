import { Meal, MealProps } from "@contexts/MealContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { v4 as uuid } from "uuid";

async function retrieveMeals() {
  try {
    const storedMeals = await AsyncStorage.getItem("@dailyDiet:meals");
    const meals: Meal[] = storedMeals ? JSON.parse(storedMeals) : [];
    return meals;
  } catch (e) {
    const error = e as Error;
    throw new AppError(error.message);
  }
}

function saveMeal(meal: MealProps, meals: Meal[], sectionIndex: number) {
  const { data } = meals[sectionIndex];

  if (!meal.id) {
    meal.id = uuid();
    data.push(meal);
  } else {
    const existingMealIndex = data.findIndex((m) => m.id === meal.id);
    data[existingMealIndex] = meal;
  }
}

async function storeMeal(meal: MealProps) {
  const meals = await retrieveMeals();
  const sectionTitle = meal.date;
  const existingSectionIndex = meals.findIndex((meal: any) => meal.title === sectionTitle);
  const sectionExists = existingSectionIndex !== -1;

  if (sectionExists) {
    saveMeal(meal, meals, existingSectionIndex);
  } else {
    meal.id = uuid();
    meals.push({ title: sectionTitle, data: [meal] });
  }

  await updateMealStorage(meals);
}

async function removeMeal(meal: MealProps) {
  const meals = await retrieveMeals();
  const sectionTitle = meal.date;
  const existingSectionIndex = meals.findIndex((meal: any) => meal.title === sectionTitle);
  const sectionExists = existingSectionIndex !== -1;

  if (sectionExists) {
    const { data } = meals[existingSectionIndex];
    const existingMealIndex = data.findIndex((m) => m.id === meal.id);
    data.splice(existingMealIndex, 1);
  }

  const isSectionEmptyAfterMealDeletion = meals[existingSectionIndex].data.length === 0;
  if (isSectionEmptyAfterMealDeletion) {
    meals.splice(existingSectionIndex, 1);
  }

  await updateMealStorage(meals);
}

async function updateMealStorage(meals: Meal[]) {
  try {
    await AsyncStorage.setItem("@dailyDiet:meals", JSON.stringify(meals));
  } catch (e) {
    const error = e as Error;
    throw new AppError(error.message);
  }
}

export { retrieveMeals, storeMeal, removeMeal };
