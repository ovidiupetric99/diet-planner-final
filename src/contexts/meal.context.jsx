import {createContext, useState} from 'react';

export const MealContext = createContext ({
  meal: null,
  setMeal: () => null,
});

export const MealProvider = ({children}) => {
  const [meal, setMeal] = useState (null);
  const value = {
    meal,
    setMeal,
  };

  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
};
