import React from "react";
import { Box, Typography, Stack, Chip, Avatar, Button } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CloudDoneIcon from "@mui/icons-material/CloudDone";

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
        <Typography variant="h5" fontWeight={700} noWrap>
          VBIM e.V. Gemeindefest Herbst 
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

          {/* <Chip
            size="small"
            color="primary"
            variant="filled" // if your MUI version doesn’t support "soft", use "filled"
            icon={<CloudDoneIcon />}
            label="Offline ready"
            sx={{ ml: { xs: 0, sm: 1 } }}
          />
          <Chip size="small" variant="outlined" label="POS • Fast actions" /> */}

                   <Button
            variant="outlined"
            onClick={() => setPresentationMode((prev) => !prev)}
          >
            {presentationMode ? "Mit Kategorien" : "Präsentationsmodus"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default MenuHeader;
