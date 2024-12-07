import { createContext, useState } from 'react';

// Create the context for sharing meal information
const InformationsForMealContext = createContext();

// Define the provider component
const InformationsForProvider = ({ children }) => {
    // State to track the number of meals
    const [numberOfMeals, setNumberOfMeals] = useState(0);
    const [infosAboutEaters, setInfosAboutEaters] = useState('');

    return (
        // Provide the context value to children components
        <InformationsForMealContext.Provider value={{ numberOfMeals, setNumberOfMeals, infosAboutEaters, setInfosAboutEaters }}>
            {children}
        </InformationsForMealContext.Provider>
    );
};

// Export both the context and provider for use in other components
export { InformationsForMealContext, InformationsForProvider };
