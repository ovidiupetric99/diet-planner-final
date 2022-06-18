import {createUserWithEmailAndPassword} from 'firebase/auth';
import {createContext, useState, useEffect} from 'react';

const addFoodItem = (foodItems, foodToAdd, id) => {
  return [
    ...foodItems,
    {
      id: id,
      mealNr: foodToAdd.mealNr,
      fdcId: foodToAdd.fdcId,
      name: foodToAdd.name,
      quantity: foodToAdd.quantity,
      kcal: foodToAdd.kcal,
      protein: foodToAdd.protein,
      carbs: foodToAdd.carbs,
      fat: foodToAdd.fat,
    },
  ];
};

const removeFoodItem = (foodItems, idToRemove) => {
  return [];
};

const clearFoodItem = (foodItems, idToRemove) => {
  return foodItems.filter (foodItem => foodItem.id != idToRemove);
};

export const DietContext = createContext ({
  isDietOpen: false,
  setIsDietOpen: () => {},
  foodItems: [],
  addFoodToDiet: () => {},
  removerFoodFromDiet: () => {},
  clearFoodFromDiet: () => {},
  macrosCount: {
    kcal: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  },
  setMacrosCount: () => {},
});

export const DietProvider = ({children}) => {
  const [isDietOpen, setIsDietOpen] = useState (false);
  const [foodItems, setFoodItems] = useState ([]);
  const [macrosCount, setMacrosCount] = useState ({
    kcal: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [id, setId] = useState (-1);

  useEffect (
    () => {
      const newKcalCount = foodItems.reduce (
        (total, foodItem) => total + foodItem.quantity * foodItem.kcal,
        0
      );

      const newProteinCount = foodItems.reduce (
        (total, foodItem) => total + foodItem.quantity * foodItem.protein,
        0
      );

      const newCarbsCount = foodItems.reduce (
        (total, foodItem) => total + foodItem.quantity * foodItem.carbs,
        0
      );

      const newFatCount = foodItems.reduce (
        (total, foodItem) => total + foodItem.quantity * foodItem.fat,
        0
      );
      setMacrosCount ({
        kcal: newKcalCount,
        protein: newProteinCount,
        carbs: newCarbsCount,
        fat: newFatCount,
      });
      setId (id + 1);
    },
    [foodItems]
  );

  const addFoodToDiet = foodToAdd => {
    setFoodItems (addFoodItem (foodItems, foodToAdd, id));
  };

  const removeFoodFromDiet = idToRemove => {
    setFoodItems (removeFoodItem (foodItems, idToRemove));
  };

  const clearFoodFromDiet = idToRemove => {
    setFoodItems (clearFoodItem (foodItems, idToRemove));
  };

  const value = {
    id,
    setId,
    isDietOpen,
    setIsDietOpen,
    addFoodToDiet,
    removeFoodFromDiet,
    clearFoodFromDiet,
    foodItems,
    macrosCount,
  };

  return <DietContext.Provider value={value}>{children}</DietContext.Provider>;
};
