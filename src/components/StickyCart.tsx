import React from "react";
import { Box, Fab, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Meal } from "../types/meal";

interface StickyCartProps {
  cart: Meal[];
  totalPrice: number;
  resetCart: () => void;
  setOpen: (open: boolean) => void;
}

const StickyCart: React.FC<StickyCartProps> = ({
  cart,
  totalPrice,
  setOpen,
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1201,
      }}
    >
      <Fab
        color="primary"
        aria-label="cart"
        onClick={() => setOpen(true)}
        disabled={cart.length === 0}
        sx={{
          width: 80,
          height: 80,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textTransform: "none",
        }}
      >
        {/* Cart Icon */}
        <ShoppingCartIcon sx={{ fontSize: 28, mb: 0.5 }} />

        {/* Item Count */}
        {cart.length > 0 && (
          <Typography variant="caption" sx={{ lineHeight: 1 }}>
            {cart.length}x
          </Typography>
        )}

        {/* Total Price */}
        {cart.length > 0 && (
          <Typography variant="caption" sx={{ lineHeight: 1 }}>
            {totalPrice.toFixed(2)}€
          </Typography>
        )}
      </Fab>
    </Box>
  );
};

export default StickyCart;
