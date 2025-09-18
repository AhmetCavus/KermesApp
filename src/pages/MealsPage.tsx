import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useMeals } from "../provider/MealContext";
import CheckoutModal from "../components/CheckoutModal";
import Header from "../components/MenuHeader";
import StickyCart from "../components/StickyCart";
import { useState } from "react";
import { Meal } from "../types/meal";
import NavigationBar from "../components/NavigationBar";

const MealsPage: React.FC = () => {
  const [cart, setCart] = useState<Meal[]>([]);
  const [openCart, setOpenCart] = useState(false);

  const { meals, categories } = useMeals();

  // Add meal to cart
  const addToCart = (meal: Meal) => {
    setCart((prevCart) => [...prevCart, {...meal, _id: `${meal._id}_${prevCart.length}`}]);
  };

  // Remove meal by id
  const removeFromCart = (mealId: string | number) => {
    setCart((prevCart) => prevCart.filter((meal) => meal._id !== mealId));
  };

  // Reset cart
  const resetCart = () => {
    setCart([]);
  };

  // Total price
  const totalPrice = cart.reduce((total, meal) => total + meal.price, 0);

  return (
    <>
      <NavigationBar />

      <Container style={{ paddingBottom: "100px" }}>
        <Header />

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
                        <Grid columns={{ xs: 12, sm: 6, md: 4 }} key={meal._id}>
                          <Card>
                            <CardActionArea onClick={() => addToCart(meal)}>
                              <CardMedia
                                component="img"
                                height="140"
                                image={`${process.env.PUBLIC_URL}/${meal.image}`}
                                alt={meal.name}
                              />
                              <CardContent>
                                <Typography variant="h6">
                                  {meal.name}
                                </Typography>
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

      <StickyCart
        cart={cart}
        totalPrice={totalPrice}
        resetCart={resetCart}
        setOpen={() => {setOpenCart(true)}}
      />

      <CheckoutModal
        open={openCart}
        setOpen={setOpenCart}
        cart={cart}
        removeFromCart={removeFromCart}
        resetCart={resetCart}
        totalPrice={totalPrice}
      />
    </>
  );
};

export default MealsPage;
