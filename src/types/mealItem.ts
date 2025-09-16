import { Meal } from "./meal"

export type MealItem = {
    meal: Meal,
    quantity: number,
    memo: string,
    status: "idle" | "pending" | "ready" | "canceled"
}