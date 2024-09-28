import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';

const Cart = ({ cart }) => {
  return (
    <List>
      {cart.map((meal, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemText primary={meal.name} secondary={`$${meal.price.toFixed(2)}`} />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default Cart;
