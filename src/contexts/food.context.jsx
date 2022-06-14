import {createContext, useState} from 'react';

export const FoodContext = createContext ({
  food: null,
  setFood: () => null,
});

export const FoodProvider = ({children}) => {
  const [food, setFood] = useState (null);
  const value = {
    food,
    setFood,
  };

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
};
