import React, { useState } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import MealsList from './components/MealsList';
import Cart from './components/Cart';

// Sample meal data
const mealsData = [
  { id: 1, name: 'Dönerteller', price: 10, category: "Etliler" },
  { id: 2, name: 'Pommdöner', price: 7.99, category: "Etliler" },
  { id: 3, name: 'Döner', price: 5.99, category: "Etliler" },
  { id: 4, name: 'Kuzu Pirzola / Lamm Kotelett', price: 8.99, category: "Etliler" },
  { id: 4, name: 'Adana', price: 8.99, category: "Etliler" },
  { id: 4, name: 'Kuzu Şiş / Lamm auf Spieß', price: 8.99, category: "Etliler" },
  { id: 4, name: 'Tavuk Şiş / Hähnchen auf Spieß', price: 8.99, category: "Etliler" },
  { id: 4, name: 'Pommes kleın', price: 8.99, category: "Aperatif" },
  { id: 4, name: 'Pommes groß', price: 8.99, category: "Aperatif" },
  { id: 4, name: 'Backfisch', price: 8.99, category: "Balik" },
  { id: 4, name: 'Burger Menu', price: 8.99, category: "Aperatif" },
];

// List of categories
const categories = ['Etliler', 'Balik', 'Aperatif', 'Icecek'];

function App() {
  const [cart, setCart] = useState([]);

  // Function to add meals to the cart
  const addToCart = (meal) => {
    setCart([...cart, meal]);
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, meal) => total + meal.price, 0);

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Meal Cart
      </Typography>
      <Grid container spacing={2}>
        {/* Meal List Section */}
        <Grid item xs={12} md={8}>
          {categories.map((category) => (
            <div key={category}>
              <Typography variant="h5" gutterBottom>{category}</Typography>
              <MealsList meals={mealsData.filter((meal) => meal.category === category)} addToCart={addToCart} />
            </div>
          ))}
        </Grid>

        {/* Cart Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h5">Your Cart</Typography>
          <Cart cart={cart} />
          <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
          <Button variant="contained" color="primary" disabled={cart.length === 0}>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
