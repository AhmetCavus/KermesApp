import React, { useState } from "react";
import {
  Button,
  Container,
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
  CardActionArea,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { MealProvider, useMeals } from "./components/MealProvider";
import { Meal } from "./types/meal";

function AppContent() {
  const [cart, setCart] = useState<Meal[]>([]);
  const [open, setOpen] = useState(false);

  const { meals, categories } = useMeals();

  // Add meal to cart
  const addToCart = (meal: Meal) => {
    setCart((prevCart) => [...prevCart, meal]);
  };

  // Remove meal by id
  const removeFromCart = (mealId: string | number) => {
    setCart((prevCart) => prevCart.filter((meal) => meal.id !== mealId));
  };

  // Reset cart
  const resetCart = () => {
    setCart([]);
  };

  // Total price
  const totalPrice = cart.reduce((total, meal) => total + meal.price, 0);

  return (
    <>
      <Container style={{ paddingBottom: "100px" }}>
        <Typography variant="h3" align="center" gutterBottom>
          Meiderich Süleymaniye: Kermes 2024 Menü
        </Typography>

        <Grid container spacing={2}>
          {/* Categories Section */}
          <Grid columns={{ xs: 12, md: 8 }}>
            {categories.length === 0 ? (
              <Typography variant="h6">Loading categories...</Typography>
            ) : (
              categories.map((category) => (
                <div key={category.name} style={{ marginBottom: "16px" }}>
                  <Typography variant="h5" gutterBottom>
                    {category.name}
                  </Typography>

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
                        <Grid columns={{ xs: 12, sm: 6, md: 4 }} key={meal.id}>
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
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
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

      {/* Sticky Cart */}
      <AppBar position="fixed" color="default" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h6">
            Gesamt: {totalPrice.toFixed(2)}€
          </Typography>

          <IconButton
            color="secondary"
            disabled={cart.length === 0}
            onClick={resetCart}
          >
            <DeleteIcon />
          </IconButton>

          <IconButton
            color="primary"
            disabled={cart.length === 0}
            onClick={() => setOpen(true)}
          >
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Checkout Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Bestellung</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hier können Sie Ihre bevorstehende Bestellung einsehen um den Preis
            zu ermitteln
          </DialogContentText>

          <List>
            {cart.map((meal) => (
              <ListItem key={meal.id}>
                <ListItemText
                  primary={meal.name}
                  secondary={`${meal.price.toFixed(2)}€`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    color="secondary"
                    onClick={() => removeFromCart(meal.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" align="right">
            Gesamt: {totalPrice.toFixed(2)}€
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
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

function App() {
  return (
    <MealProvider>
      <AppContent />
    </MealProvider>
  );
}

export default App;
