import React from "react";
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Meal } from "../types/meal";

export interface OrderItemCardProps {
  meal: Meal;
  quantity: number;
  note?: string;
  onIncrement: (meal: Meal) => void;
  onDecrement: (meal: Meal) => void;
  onNoteChange: (meal: Meal, note: string) => void;
  min?: number;             // default 0
  max?: number;             // optional cap
  disabled?: boolean;
}

const OrderItemCardTmp: React.FC<OrderItemCardProps> = ({
  meal,
  quantity,
  note = "",
  onIncrement,
  onDecrement,
  onNoteChange,
  min = 0,
  max,
  disabled = false,
}) => {
  const canDecrement = quantity > min && !disabled;
  const canIncrement = (max === undefined || quantity < max) && !disabled;

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        px: 2,
        py: 1.5,
        bgcolor: "background.paper",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        {/* Top row: - [Meal name] + */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <IconButton
            aria-label={`decrement ${meal.name}`}
            onClick={() => onDecrement(meal)}
            disabled={!canDecrement}
            size="large"
          >
            <RemoveCircleOutlineIcon fontSize="inherit" />
          </IconButton>

          <Box sx={{ textAlign: "center", flex: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              noWrap
              title={meal.name}
            >
              {meal.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Menge: {quantity}
            </Typography>
          </Box>

          <IconButton
            aria-label={`increment ${meal.name}`}
            onClick={() => onIncrement(meal)}
            disabled={!canIncrement}
            size="large"
          >
            <AddCircleOutlineIcon fontSize="inherit" />
          </IconButton>
        </Stack>

        {/* Note input */}
        <TextField
          fullWidth
          multiline
          minRows={1}
          maxRows={4}
          value={note}
          onChange={(e) => onNoteChange(meal, e.target.value)}
          placeholder="Notiz (optional)…"
          sx={{ mt: 1.5 }}
          inputProps={{ "aria-label": `${meal.name} note` }}
        />
      </CardContent>
    </Card>
  );
};

export default OrderItemCardTmp;
