import React, { useState } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import MealsList from './components/MealsList';
import Cart from './components/Cart';

// Sample meal data
const mealsData = [
  { id: 1, name: 'Dönerteller', price: 10, category: "Etliler" },
  { id: 2, name: 'Pommdöner', price: 6, category: "Etliler" },
  { id: 3, name: 'Döner', price: 7, category: "Etliler" },
  { id: 4, name: 'Kuzu Pirzola / Lamm Kotelett', price: 10, category: "Etliler" },
  { id: 5, name: 'Adana', price: 7, category: "Etliler" },
  { id: 6, name: 'Kuzu Şiş / Lamm auf Spieß', price: 7, category: "Etliler" },
  { id: 7, name: 'Tavuk Şiş / Hähnchen auf Spieß', price: 7, category: "Etliler" },
  { id: 8, name: 'Pommes klein', price: 2, category: "Aperatif" },
  { id: 9, name: 'Pommes groß', price: 3, category: "Aperatif" },
  { id: 10, name: 'Backfisch', price: 8, category: "Balik" },
  { id: 11, name: 'Burger', price: 7.50, category: "Aperatif" },
  { id: 12, name: 'Burger Menu', price: 10, category: "Aperatif" },
  { id: 13, name: 'Manti', price: 3, category: "Aperatif" },
  { id: 14, name: 'Içli Köfte 1 adet', price: 1.5, category: "Aperatif" },
  { id: 15, name: 'Yağlı katmer', price: 3.5, category: "Aperatif" },
  { id: 16, name: 'Kahve', price: 1.5, category: "Icecek" },
  { id: 17, name: 'Gözleme', price: 2.5, category: "Aperatif" },
  { id: 18, name: 'Lahmacun', price: 2, category: "Aperatif" },
  { id: 19, name: 'Lahmacun mit Salat', price: 2.50, category: "Aperatif" },
  { id: 20, name: 'Çay / Tee', price: .50, category: "Icecek" },
  { id: 21, name: 'Su / Wasser', price: 1.00, category: "Icecek" },
  { id: 22, name: 'Ayran', price: 1.00, category: "Icecek" },
  { id: 23, name: 'Cola / Fanta / Sprite', price: 1.50, category: "Icecek" },
];

// List of categories
const categories = ['Etliler', 'Balik', 'Aperatif', 'Icecek'];

function App() {
  const [cart, setCart] = useState([]);

  // Function to add meals to the cart
  const addToCart = (meal) => {
    setCart([...cart, meal]);
  };

    // Function to reset the cart
    const resetCart = () => {
      setCart([]);
    };

  // Calculate total price
  const totalPrice = cart.reduce((total, meal) => total + meal.price, 0);

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Meiderich Süleymaniye - Kermes 2024 Menü
      </Typography>
      <Grid container spacing={2}>
        {/* Meal List Section */}
        <Grid item xs={12} md={8}>
          {categories.map((category) => (
            <div key={category} style={{paddingTop: 32}}>
              <Typography variant="h5" gutterBottom>{category}</Typography>
              <MealsList meals={mealsData.filter((meal) => meal.category === category)} addToCart={addToCart} />
            </div>
          ))}
        </Grid>

        {/* Cart Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h5">Ihre Bestellung</Typography>
          <Cart cart={cart} />
          <Typography variant="h6">Gesamt: {totalPrice.toFixed(2)}€</Typography>
          <Button variant="contained" color="primary" disabled={cart.length === 0}>
            Bestellen
          </Button>

           {/* Reset Button */}
           <Button
            variant="outlined"
            color="secondary"
            disabled={cart.length === 0}
            onClick={resetCart}
            style={{ marginLeft: '10px' }}
          >
            Zurücksezten
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
