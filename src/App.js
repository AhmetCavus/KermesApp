import React, { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Card,
  CardMedia,
  CardContent,
  CardActionArea
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { MealProvider, useMeals } from './components/MealsContext';  // Import MealProvider and useMeals

function AppContent() {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false); // State for the checkout modal

  const { meals, categories } = useMeals();  // Get meals and categories from the context

  // Function to add meals to the cart
  const addToCart = (meal) => {
    setCart([...cart, meal]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (mealId) => {
    setCart(cart.filter((meal) => meal.id !== mealId));
  };

  // Function to reset the cart
  const resetCart = () => {
    setCart([]);
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, meal) => total + meal.price, 0);

  // Open checkout modal
  const handleCheckoutOpen = () => {
    setOpen(true);
  };

  // Close checkout modal
  const handleCheckoutClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container style={{ paddingBottom: '100px' }}>
        <Typography variant="h3" align="center" gutterBottom>
          Meiderich Süleymaniye: Kermes 2024 Menü
        </Typography>
        <Grid container spacing={2}>
          {/* Categories Section */}
          <Grid item xs={12} md={8}>
            {categories.length === 0 ? (
              <Typography variant="h6">Loading categories...</Typography>
            ) : (
              categories.map((category) => (
                <div key={category.name} style={{ marginBottom: '16px' }}>
                  <Typography variant="h5" gutterBottom>{category.name}</Typography>
                  {/* Category Image */}
                  <Card sx={{ marginBottom: 2 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${process.env.PUBLIC_URL}/${category.image}`}
                      alt={`${category.name} category`}
                    />
                  </Card>
                  <Grid container spacing={3}>
                    {meals
                      .filter((meal) => meal.category === category.name)
                      .map((meal) => (
                        <Grid item xs={12} sm={6} md={4} key={meal.id}>
                          {/* Meal Item Card */}
                          <Card>
                            <CardActionArea onClick={() => addToCart(meal)}>
                              <CardMedia
                                component="img"
                                height="140"
                                image={`${process.env.PUBLIC_URL}/${meal.image}`}
                                alt={meal.name}
                              />
                              <CardContent>
                                <Typography variant="h6">{meal.name}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                  {meal.price.toFixed(2)}€
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      ))}
                  </Grid>
                </div>
              ))
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Sticky Cart at the Bottom */}
      <AppBar position="fixed" color="default" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">
            Gesamt: {totalPrice.toFixed(2)}€
          </Typography>

          {/* Reset Button with Icon */}
          <IconButton
            color="secondary"
            disabled={cart.length === 0}
            onClick={resetCart}
          >
            <DeleteIcon />
          </IconButton>

          {/* Checkout Button with Icon */}
          <IconButton
            color="primary"
            disabled={cart.length === 0}
            onClick={handleCheckoutOpen}
          >
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Checkout Modal */}
      <Dialog open={open} onClose={handleCheckoutClose} fullWidth maxWidth="sm">
        <DialogTitle>Bestellung</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hier können Sie Ihre bevorstehende Bestellung einsehen um den Preis zu ermitteln
          </DialogContentText>
          <List>
            {cart.map((meal) => (
              <ListItem key={meal.id}>
                <ListItemText primary={meal.name} secondary={`${meal.price.toFixed(2)}€`} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" color="secondary" onClick={() => removeFromCart(meal.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          {/* Total Price in the Modal */}
          <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
          <Typography variant="h6" align="right">
            Gesamt: {totalPrice.toFixed(2)}€
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCheckoutClose} color="primary">
            Schließen
          </Button>
          <Button onClick={resetCart} color="secondary" variant="contained">
            Zurücksetzen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// Wrap the AppContent in the MealProvider to provide context
function App() {
  return (
    <MealProvider>
      <AppContent />
    </MealProvider>
  );
}

export default App;
