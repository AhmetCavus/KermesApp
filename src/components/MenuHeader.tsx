import React from "react";
import { Box, Typography, Stack, Chip, Avatar, Button } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ScheduleIcon from "@mui/icons-material/Schedule";
import MapIcon from '@mui/icons-material/Map';

interface MenuHeaderProps {
  presentationMode: boolean;
  setPresentationMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuHeader: React.FC<MenuHeaderProps> = ({
  presentationMode,
  setPresentationMode,
}) => {
  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dueDate = new Date("2025-12-29");
  const leftDays = Math.ceil(
    (dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Box
      sx={{
        mt: 2,
        mb: 2,
        px: 2,
        py: 2.5,
        borderRadius: 3,
        bgcolor: "background.paper",
        boxShadow: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Avatar
        variant="rounded"
        sx={{
          width: 48,
          height: 48,
          bgcolor: "primary.main",
        }}
      >
        <RestaurantMenuIcon />
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h5" fontWeight={700} noWrap>
            VBIM e.V. Fischfest
          </Typography>
          <Chip
            size="small"
            variant="outlined"
            label={`Noch ${leftDays} Tage`}
          />
        </Stack>
        <Typography variant="h6" color="text.primary" sx={{ mt: 1 }}>
          Willkommen zum Fischfest des VBIM e.V.! Genießen Sie frischen Fisch
          und Meeresfrüchte in einer warmen Atmosphäre. Wir freuen uns auf Ihren
          Besuch!
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{ mt: 0.5, flexWrap: "wrap", color: "text.secondary" }}
        >
          <Stack direction="row" spacing={0.75} alignItems="center">
            <ScheduleIcon fontSize="small" />
            <Typography variant="body2">{today}</Typography>
          </Stack>

          <Button onClick={() => setPresentationMode((prev) => !prev)}>
            {presentationMode ? "Mit Kategorien" : "Präsentationsmodus"}
          </Button>
          <Button
            size="small"
            href="https://maps.app.goo.gl/zzt1Wx3byNQs7Vo67"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapIcon fontSize="small" sx={{ mr: 0.5 }} />
            Zum Veranstaltungsort
          </Button>
        </Stack>
        <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
          (Veranstaltungsort: Hagenauer Str. 57, 47137 Duisburg)
        </Typography>
      </Box>
    </Box>
  );
};

export default MenuHeader;
