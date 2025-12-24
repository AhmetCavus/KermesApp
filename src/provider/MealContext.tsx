import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Meal } from "../types/meal";
import { Category } from "../types/category";
import { useAuth } from "./DataContext";

type MealContextType = {
  meals: Meal[];
  categories: Category[];
  error: String | null;
  reloadData: (state: boolean) => void;
};

const MealContext = createContext<MealContextType | undefined>(undefined);

type MealProviderProps = {
  children: ReactNode;
};

export const MealProvider: React.FC<MealProviderProps> = ({ children }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [reloadData, setReloadData] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<any | null>(null);
  const { client, isClientInitialized } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isClientInitialized) return;
        const meals = await client.rest().fetchCollection({collectionId: "meal"});
        const categories = await client.rest().fetchCollection({collectionId: "category"});

        setMeals(meals);
        setCategories(categories);
      } catch (err: any) {
        setError(err);
      }
    };
    fetchData();
  }, [client, isClientInitialized]);

  useEffect(() => {
    if (reloadData) {
      const fetchData = async () => {
        try {
          const meals = await client.rest().fetchCollection({collectionId: "meal"});
          setMeals(meals);
          setReloadData(false);
        } catch (err: any) {
          setError(err);
        }
      };
      fetchData();
    }
  }, [reloadData, client]);

  return (
    <MealContext.Provider
      value={{
        meals,
        categories,
        error,
        reloadData: (state: boolean) => setReloadData(state),
      }}
    >
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
