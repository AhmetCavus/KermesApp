import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";

interface CheckoutModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    cart: any[];
    removeFromCart: (mealId: string | number) => void;
    resetCart: () => void;
    totalPrice: number;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  open,
  setOpen,
  cart,
  removeFromCart,
  resetCart,
  totalPrice,
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
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
                    onClick={() => removeFromCart(meal._id)}
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

export default CheckoutModal