export type Meal = {
  _id: string | number;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
  status: "available" | "unavailable" | "deleted";
};
