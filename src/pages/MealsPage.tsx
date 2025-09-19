import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Button,
  Stack,
  Box,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useMeals } from "../provider/MealContext";
import CheckoutModal from "../components/CheckoutModal";
import Header from "../components/MenuHeader";
import StickyCart from "../components/StickyCart";
import { useState } from "react";
import { Meal } from "../types/meal";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

const MealsPage: React.FC = () => {
  const [cart, setCart] = useState<Meal[]>([]);
  const [openCart, setOpenCart] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false); // NEW toggle

  const { meals, categories } = useMeals();

  // Add meal to cart
  const addToCart = (meal: Meal) => {
    setCart((prevCart) => [
      ...prevCart,
      { ...meal, _id: `${meal._id}_${prevCart.length}` },
    ]);
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
      {presentationMode === false && <NavigationBar />}

      <Container maxWidth={false} sx={{ pb: "100px", maxWidth: "2000px" }}>
        <Header
          presentationMode={presentationMode}
          setPresentationMode={setPresentationMode}
        />

        {presentationMode ? (
          // --------------------
          // PRESENTATION MODE
          // --------------------
          <Grid container spacing={2}>
            {meals.map((meal) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={meal._id}>
                <Card sx={{ position: "relative" }}>
                  <CardActionArea onClick={() => addToCart(meal)}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${process.env.REACT_APP_DOMAIN}/${meal.image}`}
                      alt={meal.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{meal.name}</Typography>
                      <Typography variant="h6" color="warning" fontWeight={700}>
                        {meal.price.toFixed(2)}€
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {/* Status Chip */}
                  {meal.status === "unavailable" && (
                    <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                      <Chip label="Ausverkauft" color="warning" size="medium" sx={{ fontWeight: 900, fontSize: "1.375rem" }} />
                    </Box>
                  )}
                  {meal.status === "deleted" && (
                    <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                      <Chip
                        label="Nicht mehr verfügbar"
                        color="error"
                        size="medium"
                        sx={{ fontWeight: 900, fontSize: "1.375rem" }}
                      />
                    </Box>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          // --------------------
          // NORMAL MODE (CATEGORIES)
          // --------------------
          <Grid container spacing={2}>
            {categories.length === 0 ? (
              <Typography variant="h6">Loading categories...</Typography>
            ) : (
              categories.map((category) => (
                <div
                  key={category.name}
                  style={{ width: "100%", marginBottom: 60 }}
                >
                  {/* Category Card */}
                  <Card sx={{ mb: 2 }}>
                    <CardMedia
                      component="img"
                      height="100"
                      image={`${process.env.REACT_APP_DOMAIN}/${category.image}`}
                      alt={`${category.description} category`}
                    />
                    <CardContent>
                      <Typography
                        variant="h5"
                        gutterBottom
                        color="primary"
                        fontWeight={700}
                      >
                        {category.description}
                      </Typography>
                    </CardContent>
                  </Card>

                  <Grid container spacing={2}>
                    {meals
                      .filter((meal) => meal.category === category.name)
                      .map((meal) => (
                        <Grid
                          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                          key={meal._id}
                        >
                          <Card
                            sx={{ minWidth: "250px", position: "relative" }}
                          >
                            <CardActionArea onClick={() => addToCart(meal)}>
                              <CardMedia
                                component="img"
                                height="140"
                                image={`${process.env.REACT_APP_DOMAIN}/${meal.image}`}
                                alt={meal.name}
                              />
                              <CardContent>
                                <Typography variant="h6">
                                  {meal.name}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  color="warning"
                                  fontWeight={700}
                                >
                                  {meal.price.toFixed(2)}€
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            {/* Status Chip */}
                            {meal.status === "unavailable" && (
                              <Box
                                sx={{ position: "absolute", top: 8, right: 8 }}
                              >
                                <Chip
                                  label="Ausverkauft"
                                  color="warning"
                                  size="medium"
                                  sx={{ fontWeight: 900, fontSize: "1.375rem" }}
                                />
                              </Box>
                            )}
                            {meal.status === "deleted" && (
                              <Box
                                sx={{ position: "absolute", top: 8, right: 8 }}
                              >
                                <Chip
                                  label="Nicht mehr verfügbar"
                                  color="error"
                                  size="medium"
                                  sx={{ fontWeight: 900, fontSize: "1.375rem" }}
                                />
                              </Box>
                            )}
                          </Card>
                        </Grid>
                      ))}
                  </Grid>
                </div>
              ))
            )}
          </Grid>
        )}
        {/* <Footer /> */}

      </Container>

      {presentationMode === false && (
        <StickyCart
          cart={cart}
          totalPrice={totalPrice}
          resetCart={resetCart}
          setOpen={() => {
            setOpenCart(true);
          }}
        />
      )}

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
