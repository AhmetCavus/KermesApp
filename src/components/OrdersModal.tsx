import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
  Stack,
  Chip,
  Box,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import { Order } from "../types/Order";
import { MealItem } from "../types/mealItem";
import { useMeals } from "./MealProvider";
import OrderIdService from "../utils/orderIdService";
import { Order } from "../types/order.tmp";

interface OrdersModalProps {
  open: boolean;
  createNewOrder: (order: Order) => void;
  setOpen: (open: boolean) => void;
}

const OrdersModal: React.FC<OrdersModalProps> = ({
  open,
  createNewOrder,
  setOpen,
}) => {
  const { meals } = useMeals();

  const [draft, setDraft] = useState<Order>(() => ({
    id: "",
    meals: [],
    title: "",
    memo: "",
    createdAt: new Date(),
    status: "idle",
  }));

  useEffect(() => {
    if (open) {
      setDraft({
        id: "",
        meals: meals.map(
          (meal): MealItem => ({ meal, quantity: 0, memo: "", status: "idle" })
        ),
        title: "",
        memo: "",
        createdAt: new Date(),
        status: "idle",
      });
    }
  }, [open, meals]);

  const totalItems = useMemo<number>(
    () => draft.meals.reduce<number>((n: any, mi: MealItem) => n + mi.quantity, 0),
    [draft.meals]
  );

  const totalPrice = useMemo<number>(
    () =>
      draft.meals.reduce<number>(
        (sum: number, mi: MealItem) => sum + mi.quantity * mi.meal.price,
        0
      ),
    [draft.meals]
  );

  const inc = (mealId: string | number): void =>
    setDraft((prev: any) => ({
      ...prev,
      meals: prev.meals.map((mi: MealItem): MealItem =>
        mi.meal.id === mealId ? { ...mi, quantity: mi.quantity + 1 } : mi
      ),
    }));

  const dec = (mealId: string | number): void =>
    setDraft((prev: any) => ({
      ...prev,
      meals: prev.meals.map((mi: MealItem): MealItem =>
        mi.meal.id === mealId && mi.quantity > 0
          ? { ...mi, quantity: mi.quantity - 1 }
          : mi
      ),
    }));

  const changeNote = (mealId: string | number, note: string): void =>
    setDraft((prev: any) => ({
      ...prev,
      meals: prev.meals.map((mi: MealItem): MealItem =>
        mi.meal.id === mealId ? { ...mi, memo: note } : mi
      ),
    }));

  const handleCreate = (): void => {
    if (totalItems === 0) return;
    createNewOrder({
      ...draft, 
      id: OrderIdService.getInstance().createNextId(),
      createdAt: new Date(), 
      status: "idle", 
      meals: draft.meals.filter((item: MealItem) => {  return item.quantity > 0 })
    });
    setOpen(false);
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setDraft((p: any) => ({ ...p, title: e.target.value }));
  };

  const handleOrderMemoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setDraft((p: any) => ({ ...p, memo: e.target.value }));
  };

  const handleItemNoteChange = (
    mealId: string | number
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    changeNote(mealId, e.target.value);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Bestellung</Typography>
          <Stack direction="row" spacing={1}>
            <Chip size="small" label={`Artikel: ${totalItems}`} />
            <Chip size="small" color="primary" label={`Gesamt: ${totalPrice.toFixed(2)}€`} />
          </Stack>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Erstelle hier die Bestellung, die beobachtet werden soll.
        </DialogContentText>

        <Stack spacing={1.5} sx={{ mb: 2 }}>
          <TextField
            label="Titel (optional)"
            value={draft.title}
            onChange={handleTitleChange}
            size="small"
          />
          <TextField
            label="Bestellnotiz (optional)"
            value={draft.memo}
            onChange={handleOrderMemoChange}
            size="small"
            multiline
            minRows={1}
            maxRows={4}
          />
        </Stack>

        <Box
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            border: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <List dense disablePadding>
            {draft.meals.map((mi: MealItem, idx: number) => (
              <React.Fragment key={mi.meal.id}>
                <ListItem
                  sx={{
                    px: 1.5,
                    py: 1,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.25,
                  }}
                >
                  <Tooltip title="Entfernen" arrow>
                    <span>
                      <IconButton
                        size="large"
                        onClick={() => dec(mi.meal.id)}
                        disabled={mi.quantity === 0}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </span>
                  </Tooltip>

                  <Stack sx={{ flex: 1, minWidth: 0 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={1}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        noWrap
                        title={mi.meal.name}
                      >
                        {mi.meal.name}
                      </Typography>

                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          size="small"
                          color={mi.quantity > 0 ? "primary" : "default"}
                          label={`x${mi.quantity}`}
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ minWidth: 72, textAlign: "right" }}
                        >
                          {(mi.meal.price * Math.max(mi.quantity, 0)).toFixed(2)}€
                        </Typography>
                      </Stack>
                    </Stack>

                    <TextField
                      size="small"
                      placeholder="Notiz (optional)…"
                      value={mi.memo}
                      onChange={handleItemNoteChange(mi.meal.id)}
                      sx={{ mt: 1 }}
                    />
                  </Stack>

                  <Tooltip title="Hinzufügen" arrow>
                    <IconButton size="large" onClick={() => inc(mi.meal.id)}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>

                {idx < draft.meals.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Box>

        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
          <Typography variant="h6">Gesamt: {totalPrice.toFixed(2)}€</Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={() => setOpen(false)} color="secondary">
          Schließen
        </Button>
        <Button
          onClick={handleCreate}
          color="primary"
          variant="contained"
          disabled={totalItems === 0}
        >
          Erstellen
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrdersModal;
