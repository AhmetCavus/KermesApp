import React, { useMemo } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Chip,
  Typography,
  Stack,
  Button,
  Divider,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
// import { Order } from "../types/order";
import { MealItem } from "../types/mealItem";
import { Order } from "../types/order";
import { Delete } from "@mui/icons-material";

export interface OrderItemCardProps {
  order: Order;
  onEdit?: (order: Order) => void;
  onDelete?: (order: Order) => void;
  onClick?: (order: Order) => void;
  maxMealsPreview?: number; // how many meal chips to show before "+N mehr"
}

type StatusKey = Order["status"];

const STATUS_CONFIG: Record<
  StatusKey,
  { label: string; chipColor: "default" | "primary" | "success" | "warning" | "error" | "info" }
> = {
  idle: { label: "Nicht bearbeitet", chipColor: "default" },
  pending: { label: "In Bearbeitung", chipColor: "warning" },
  ready: { label: "Bereit zur Abholung", chipColor: "success" },
  completed: { label: "Fertiggestellt", chipColor: "info" },
  canceled: { label: "Abgebrochen", chipColor: "error" },
};

const OrderItemCard: React.FC<OrderItemCardProps> = ({
  order,
  onEdit,
  onDelete,
  onClick,
  maxMealsPreview = 4,
}) => {
  const { label, chipColor } = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.idle;

  const totalItems = useMemo(
    () => order.meals.reduce((sum: number, mi: MealItem) => sum + mi.quantity, 0),
    [order.meals]
  );

  const totalPrice = useMemo(
    () => order.meals.reduce((sum: number, mi: MealItem) => sum + mi.quantity * mi.meal.price, 0),
    [order.meals]
  );

  const visibleMeals = order.meals
    .filter((mi) => mi.quantity > 0)
    .slice(0, maxMealsPreview);
  const hiddenCount =
    order.meals.filter((mi) => mi.quantity > 0).length - visibleMeals.length;

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        borderLeft: (t) =>
          `6px solid ${
            t.palette[chipColor === "default" ? "grey" : chipColor]
          }`,
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick ? () => onClick(order) : undefined}
    >
      <CardHeader
        title={
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Typography variant="h5" fontWeight={700} noWrap>
              Bestellung: {order.orderId}
            </Typography>

            <Chip size="small" color={chipColor} label={label} />
          </Stack>
        }
        subheader={
          <Stack direction="column" spacing={1}>
            {order.title && (
              <Typography variant="h6" noWrap title={order.title}>
                {order.title}
              </Typography>
            )}
            <Stack direction="row" spacing={2} sx={{ mt: 0.5 }} flexWrap="wrap">
              <Typography variant="body2" color="text.secondary">
                Artikel: <b>{totalItems}</b>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gesamt: <b>{totalPrice.toFixed(2)}€</b>
              </Typography>
              {order.createdAt && (
                <Typography variant="body2" color="text.secondary">
                  {new Date(order.createdAt).toLocaleString()}
                </Typography>
              )}
            </Stack>
          </Stack>
        }
        sx={{ pb: 1 }}
      />

      <CardContent sx={{ pt: 1 }}>
        {/* Meals recap */}
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {visibleMeals.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Keine Artikel ausgewählt.
            </Typography>
          ) : (
            <>
              {visibleMeals.map((mi) => (
                <Chip
                  key={mi.meal._id}
                  size="small"
                  label={`x${mi.quantity} ${mi.meal.name}`}
                  variant="outlined"
                  color={
                    mi.status === "idle"
                      ? "default"
                      : mi.status === "pending"
                      ? "warning"
                      : mi.status === "ready"
                      ? "success"
                      : "error"
                  }
                />
              ))}
              {hiddenCount > 0 && (
                <Chip size="small" label={`+${hiddenCount} mehr`} />
              )}
            </>
          )}
        </Stack>

        {/* Order memo (optional) */}
        {order.memo && (
          <>
            <Divider sx={{ my: 1.5 }} />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ whiteSpace: "pre-wrap" }}
            >
              {order.memo}
            </Typography>
          </>
        )}
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        <Box sx={{ flex: 1 }} />
        <Button
          variant="outlined"
          color="error"
          size="small"
          startIcon={<Delete />}
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(order);
          }}
        >
          Löschen
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<EditIcon />}
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(order);
          }}
        >
          Bearbeiten
        </Button>
      </CardActions>
    </Card>
  );
};

export default OrderItemCard;
