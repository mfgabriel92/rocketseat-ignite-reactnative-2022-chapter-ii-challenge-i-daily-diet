import { MealProps } from "@contexts/MealContext";

/* eslint-disable no-unused-vars */
export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      meal: MealProps;
      statistics: undefined;
      saveMeal: undefined | MealProps;
      keepUp: undefined;
      tooBad: undefined;
    }
  }
}
