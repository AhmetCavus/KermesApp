import React from "react";
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import { Meal } from "../types/meal";

type CartProps = {
  cart: Meal[];
};

const Cart: React.FC<CartProps> = ({ cart }) => {
  return (
    <List>
      {cart.map((meal, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemText
              primary={meal.name}
              secondary={`${meal.price.toFixed(2)}€`}
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default Cart;
