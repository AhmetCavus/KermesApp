import { AppBar, Box, Button, Menu, Toolbar, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom";

const NavigationBar: React.FC = () => {
    return (
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            yappos
          </Typography>
          <Box display="flex" gap={2}>
            <Button color="inherit" component={RouterLink} to="/">
              Menu
            </Button>
            <Button color="inherit" component={RouterLink} to="/project">
              Unser Projekt
            </Button>
            <Button color="inherit" component={RouterLink} to="/aboutus">
              Über uns
            </Button>
            <Button color="inherit" component={RouterLink} to="/imprint">
              Impressum
            </Button>
          {/* <Button color="inherit" component={RouterLink} to="/orders">
            Bestellungen
          </Button> */}
          </Box>
        </Toolbar>
      </AppBar>
    );
}

export default NavigationBar