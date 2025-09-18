import React from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
} from "@mui/material";


import { Meal } from "../types/meal";

type MealsListProps = {
  meals: Meal[];
  addToCart: (meal: Meal) => void;
};

const MealsList: React.FC<MealsListProps> = ({ meals, addToCart }) => {
  return (
    <Grid container spacing={4}>
      {meals.map((meal) => (
        <Grid columns={{ xs: 4, sm: 6, md: 4 }} key={meal._id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{meal.name}</Typography>
              <Typography variant="body2">
                Preis: <b>{meal.price.toFixed(2)}€</b>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => addToCart(meal)}
                style={{ marginTop: "10px" }}
              >
                Hinzufügen
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MealsList;
