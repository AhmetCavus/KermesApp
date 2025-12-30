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
        <Typography variant="h6" fontWeight={600} noWrap>
          VBIM e.V. Fischfest
        </Typography>

        <Stack direction="row" spacing={0.75} alignItems="center">
          <ScheduleIcon fontSize="small" />
          <Typography variant="body2">{today}</Typography>
        </Stack>
        <Typography variant="body1" color="text.primary" sx={{ mt: 1 }}>
          Willkommen zum Fischfest des VBIM e.V.! Mit jedem Kauf unterstützen
          Sie unsere gemeinnützigen Projekte.
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{ mt: 0.5, flexWrap: "wrap", color: "text.secondary" }}
        ></Stack>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{ mt: 0.5, color: "text.secondary" }}
        >
          <Button
            size="small"
            href="https://maps.app.goo.gl/zzt1Wx3byNQs7Vo67"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapIcon fontSize="small" />
            Veranstaltungsort
          </Button>
          <Typography variant="body2" fontSize="small" color="text.secondary">
            (Hagenauer Str. 57, 47137 Duisburg)
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default MenuHeader;
