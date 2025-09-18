import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { Order } from "../types/order";
import { MealItem } from "../types/mealItem";

/**
 * Ensure your MealItem includes a 'status' field. For example:
 * export type MealItemStatus = "idle" | "in_process" | "completed" | "not_available";
 * export interface MealItem { meal: Meal; quantity: number; memo: string; status: MealItemStatus; }
 *
 * And Order status matches your app union:
 * export type OrderStatus = "idle" | "pending" | "ready" | "completed" | "canceled";
 */

type OrderStatus = Order["status"];
type MealItemStatus = MealItem["status"];

const ORDER_STATUS_OPTIONS: Array<{
  value: OrderStatus;
  label: string;
  icon: React.ReactNode;
}> = [
  { value: "idle", label: "Nicht bearb.", icon: <PauseCircleIcon fontSize="small" /> },
  { value: "pending", label: "In Bearb.", icon: <HourglassEmptyIcon fontSize="small" /> },
  { value: "ready", label: "Bereit", icon: <PlaylistAddCheckIcon fontSize="small" /> },
  { value: "completed", label: "Fertig", icon: <CheckCircleIcon fontSize="small" /> },
  { value: "canceled", label: "Abgeb.", icon: <BlockIcon fontSize="small" /> },
];

const ITEM_STATUS_OPTIONS: Array<{
  value: MealItemStatus;
  label: string;
  icon: React.ReactNode;
}> = [
  { value: "idle", label: "Offen", icon: <PauseCircleIcon fontSize="small" /> },
  { value: "pending", label: "Läuft", icon: <HourglassEmptyIcon fontSize="small" /> },
  { value: "ready", label: "Fertig", icon: <CheckCircleIcon fontSize="small" /> },
  { value: "canceled", label: "N/V", icon: <BlockIcon fontSize="small" /> },
];

export interface OrderEditModalProps {
  open: boolean;
  order: Order | null;
  onClose: () => void;
  onSave: (order: Order) => void;
}

const OrderEditModal: React.FC<OrderEditModalProps> = ({
  open,
  order,
  onClose,
  onSave,
}) => {
  const [draft, setDraft] = useState<Order | null>(null);

  // Initialize/refresh draft when modal opens or order changes
  useEffect(() => {
    if (open && order) {
      // deep-ish clone to avoid mutating props
      const cloned: Order = {
        ...order,
        meals: order.meals.map((mi: MealItem) => ({ ...mi })),
        createdAt: order.createdAt ? new Date(order.createdAt) : new Date(),
      };
      setDraft(cloned);
    }
    if (!open) setDraft(null);
  }, [open, order]);

  const totalItems = useMemo<number>(() => {
    if (!draft) return 0;
    return draft.meals.reduce((n: number, mi: MealItem) => n + mi.quantity, 0);
  }, [draft]);

  const totalPrice = useMemo<number>(() => {
    if (!draft) return 0;
    return draft.meals.reduce((sum: number, mi: MealItem) => sum + mi.quantity * mi.meal.price, 0);
  }, [draft]);

  const setOrderStatus = (_: unknown, next: OrderStatus | null) => {
    if (!draft || !next) return;
    setDraft({ ...draft, status: next });
  };

  const setItemStatus = (mealId: string | number, next: MealItemStatus | null) => {
    if (!draft || !next) return;
    setDraft({
      ...draft,
      meals: draft.meals.map((mi: MealItem) =>
        mi.meal._id === mealId ? { ...mi, status: next } : mi
      ),
    });
  };

  const inc = (mealId: string | number): void => {
    if (!draft) return;
    setDraft({
      ...draft,
      meals: draft.meals.map((mi: MealItem) =>
        mi.meal._id === mealId ? { ...mi, quantity: mi.quantity + 1 } : mi
      ),
    });
  };

  const dec = (mealId: string | number): void => {
    if (!draft) return;
    setDraft({
      ...draft,
      meals: draft.meals.map((mi: MealItem) =>
        mi.meal._id === mealId ? { ...mi, quantity: Math.max(0, mi.quantity - 1) } : mi
      ),
    });
  };

  const setItemMemo =
    (mealId: string | number) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      if (!draft) return;
      setDraft({
        ...draft,
        meals: draft.meals.map((mi: MealItem) =>
          mi.meal._id === mealId ? { ...mi, memo: e.target.value } : mi
        ),
      });
    };

  const handleChangeTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (!draft) return;
    setDraft({ ...draft, title: e.target.value });
  };

  const handleChangeOrderMemo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (!draft) return;
    setDraft({ ...draft, memo: e.target.value });
  };

  const handleSave = (): void => {
    if (!draft) return;
    onSave(draft);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Bestellung bearbeiten</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip size="small" label={`Artikel: ${totalItems}`} />
            <Chip size="small" color="primary" label={`Gesamt: ${totalPrice.toFixed(2)}€`} />
          </Stack>
        </Stack>
      </DialogTitle>

      <DialogContent>
        {!draft ? (
          <Typography variant="body2" color="text.secondary">
            Lädt…
          </Typography>
        ) : (
          <>
            {/* Order meta */}
            <Stack spacing={1.5} sx={{ mb: 2 }}>
              <TextField
                label="Titel (optional)"
                value={draft.title}
                onChange={handleChangeTitle}
                size="small"
              />
              <TextField
                label="Bestellnotiz (optional)"
                value={draft.memo}
                onChange={handleChangeOrderMemo}
                size="small"
                multiline
                minRows={1}
                maxRows={4}
              />
            </Stack>

            {/* Order status */}
            <Stack spacing={1} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Bestellstatus
              </Typography>
              <ToggleButtonGroup
                exclusive
                size="small"
                value={draft.status}
                onChange={setOrderStatus}
              >
                {ORDER_STATUS_OPTIONS.map((opt) => (
                  <ToggleButton key={opt.value} value={opt.value}>
                    <Stack direction="row" spacing={0.75} alignItems="center">
                      {opt.icon}
                      <span>{opt.label}</span>
                    </Stack>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Meal list */}
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                border: (t) => `1px solid ${t.palette.divider}`,
              }}
            >
              <List dense disablePadding>
                {draft.meals.map((mi: MealItem, idx: number) => (
                  <React.Fragment key={mi.meal._id}>
                    <ListItem
                      sx={{
                        px: 1.5,
                        py: 1.25,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.25,
                      }}
                    >
                      {/* Quantity controls */}
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Tooltip title="Weniger" arrow>
                          <span>
                            <IconButton
                              size="small"
                              onClick={() => dec(mi.meal._id)}
                              disabled={mi.quantity === 0}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                        <Typography sx={{ width: 28, textAlign: "center" }} variant="subtitle1">
                          {mi.quantity}
                        </Typography>
                        <Tooltip title="Mehr" arrow>
                          <IconButton size="small" onClick={() => inc(mi.meal._id)}>
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>

                      {/* Name + subtotal + item note */}
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
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ minWidth: 80, textAlign: "right" }}
                          >
                            {(mi.meal.price * mi.quantity).toFixed(2)}€
                          </Typography>
                        </Stack>

                        <TextField
                          size="small"
                          placeholder="Notiz (optional)…"
                          value={mi.memo}
                          onChange={setItemMemo(mi.meal._id)}
                          sx={{ mt: 1 }}
                        />
                      </Stack>

                      {/* Item status */}
                      <ToggleButtonGroup
                        exclusive
                        size="small"
                        value={mi.status}
                        onChange={(_, next: MealItemStatus | null) =>
                          setItemStatus(mi.meal._id, next)
                        }
                        aria-label={`${mi.meal.name} status`}
                      >
                        {ITEM_STATUS_OPTIONS.map((opt) => (
                          <ToggleButton key={opt.value} value={opt.value}>
                            {opt.icon}
                          </ToggleButton>
                        ))}
                      </ToggleButtonGroup>
                    </ListItem>

                    {idx < draft.meals.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </Box>

            {/* Totals */}
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
              <Typography variant="h6">Gesamt: {totalPrice.toFixed(2)}€</Typography>
            </Stack>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="secondary">
          Abbrechen
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          disabled={!draft}
        >
          Speichern
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderEditModal;
