// MealContext.js
import { createContext, useState } from 'react';

const MealContext = createContext();

const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [indexOfCurrentMeal, setIndexOfCurrentMeal] = useState(0);

  const addMeal = (meal) => {
    setMeals([...meals, meal]);
  };

  const removeMeal = (meal) => {
    setMeals(meals.filter(m => m !== meal));
  };

  return (
    <MealContext.Provider value={{
      meals,
      setMeals,
      addMeal,
      removeMeal,
      indexOfCurrentMeal,
      setIndexOfCurrentMeal
    }}>
      {children}
    </MealContext.Provider>
  );
};

export { MealProvider, MealContext };