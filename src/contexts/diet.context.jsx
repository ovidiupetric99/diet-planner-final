import {createUserWithEmailAndPassword} from 'firebase/auth';
import {createContext, useState, useEffect} from 'react';

const addFoodItem = (foodItems, foodToAdd, id) => {
  return [
    ...foodItems,
    {
      id: id,
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
  dietCount: 0,
});

export const DietProvider = ({children}) => {
  const [isDietOpen, setIsDietOpen] = useState (false);
  const [foodItems, setFoodItems] = useState ([]);
  const [dietCount, setDietCount] = useState (0);
  const [id, setId] = useState (-1);

  useEffect (
    () => {
      const newDietCount = foodItems.reduce (
        (total, foodItem) => total + foodItem.quantity * foodItem.kcal,
        0
      );
      setDietCount (newDietCount);
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
    dietCount,
  };

  return <DietContext.Provider value={value}>{children}</DietContext.Provider>;
};
