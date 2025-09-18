import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Meal } from "../types/meal";
import { Category } from "../types/category";
import { fetchCollection } from "../api/api";

type MealContextType = {
  meals: Meal[];
  categories: Category[];
  error: String | null;
};

const MealContext = createContext<MealContextType | undefined>(undefined);

type MealProviderProps = {
  children: ReactNode;
};

export const MealProvider: React.FC<MealProviderProps> = ({ children }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
         try {
           const meals = await fetchCollection("meal");
           const categories = await fetchCollection("category");
           
           setMeals(meals.items);
           setCategories(categories.items);
         } catch (err: any) {
          setError(err);
      } 
    }


    fetchData();
  }, []);

  return (
    <MealContext.Provider value={{ meals, categories, error }}>
      {children}
    </MealContext.Provider>
  );
};

// Custom hook
export const useMeals = (): MealContextType => {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error("useMeals must be used within a MealProvider");
  }
  return context;
};
