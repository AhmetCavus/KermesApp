import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
 <Box
      component="footer"
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "primary.dark",
        color: "primary.contrastText",
        // Respect iOS PWA safe area:
        pb: "max(env(safe-area-inset-bottom), 0px)",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 1.5, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Vbim e.V.
        </Typography>
        <Link to="/imprint" color="inherit">
          Impressum
        </Link>
      </Container>
    </Box>
  );
};

export default Footer;