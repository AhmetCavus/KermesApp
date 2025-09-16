import { MealItem } from "./mealItem";

export type Order = {
  id: string | number;
  meals: MealItem[];
  title: string;
  memo?: string;
  createdAt: Date;
  status: "idle" | "pending" | "ready" | "completed" | "canceled";
};
