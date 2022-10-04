import { removeMeal, retrieveMeals, storeMeal } from "@storage/meals.storage";
import { AppError } from "@utils/AppError";
import { createContext, ReactElement, useContext, useState } from "react";
import { Alert } from "react-native";

export interface MealProps {
  id: string | undefined;
  name: string;
  description: string;
  date: string;
  time: string;
  isInDiet: boolean;
}

export interface NewMeal {
  title: string;
  data: MealProps;
}

export interface Meal {
  title: string;
  data: MealProps[];
}

interface MealContextProps {
  meals: Meal[];
  percentageOfMealsInDiet: number;
  totalEntries: number;
  totalNotInDiet: number;
  totalInDiet: number;
  highestCountInDietSequence: number;
  getMeals: () => void;
  saveMeal: (meal: MealProps) => void;
  deleteMeal: (meal: MealProps) => void;
}

const MealContext = createContext({} as MealContextProps);

function MealProvider({ children }: { children: ReactElement }) {
  const [meals, setMeals] = useState<Meal[]>([]);
  let totalNotInDiet = 0;
  let totalInDiet = 0;
  let totalEntries = 0;

  const percentageOfMealsInDiet = meals.reduce((acc, meal) => {
    totalNotInDiet += meal.data.filter((d) => !d.isInDiet).length;
    totalInDiet += meal.data.filter((d) => d.isInDiet).length;
    totalEntries = totalInDiet + totalNotInDiet;

    let originalNumber = totalInDiet;
    if (totalNotInDiet > totalInDiet) {
      originalNumber = totalNotInDiet;
    }

    const difference = totalInDiet - totalNotInDiet;
    const increase = Math.ceil((difference + originalNumber) / 2);
    acc = (increase / totalEntries) * 100;

    if (totalInDiet === totalNotInDiet) {
      return 50;
    }

    acc = Number(acc.toFixed(2));

    return acc;
  }, 0);

  let currCount = 0;

  meals.forEach((meal) => {
    meal.data.forEach((d) => {
      if (d.isInDiet) {
        currCount++;
      } else {
        currCount = 0;
      }
    });
  });

  async function getMeals() {
    try {
      const allMeals = await retrieveMeals();
      setMeals(allMeals);
    } catch (e) {
      const error = e as AppError;
      Alert.alert("Meals", error.message);
    }
  }

  async function saveMeal(meal: MealProps) {
    try {
      await storeMeal(meal);
    } catch (e) {
      const error = e as AppError;
      Alert.alert("Save meal", error.message);
    }
  }

  async function deleteMeal(meal: MealProps) {
    try {
      await removeMeal(meal);
    } catch (e) {
      const error = e as AppError;
      Alert.alert("Save meal", error.message);
    }
  }

  const sortedMeals = meals.sort((a, b) => {
    return Date.parse(b.title) - Date.parse(a.title);
  });

  return (
    <MealContext.Provider
      value={{
        meals: sortedMeals,
        totalEntries,
        totalNotInDiet,
        totalInDiet,
        percentageOfMealsInDiet,
        highestCountInDietSequence: currCount,
        getMeals,
        saveMeal,
        deleteMeal,
      }}
    >
      {children}
    </MealContext.Provider>
  );
}

function useMeal() {
  return useContext(MealContext);
}

export { useMeal, MealProvider };
