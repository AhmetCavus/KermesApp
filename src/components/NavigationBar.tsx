import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link as RouterLink } from "react-router-dom";

const NavigationBar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            src={`${process.env.REACT_APP_DOMAIN}/kermes/logo.png`}
            alt="Logo"
            sx={{
              width: 30,
              height: 30,
              mr: 1,
              display: { xs: "none", md: "flex" },
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "inherit",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            vbim
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem
                onClick={handleCloseNavMenu}
                color="inherit"
                component={RouterLink}
                to="/"
              >
                Menu
              </MenuItem>
              <MenuItem color="inherit" component={RouterLink} to="/project">
                Unser Projekt
              </MenuItem>
              <MenuItem color="inherit" component={RouterLink} to="/aboutus">
                Über uns
              </MenuItem>
              <MenuItem color="inherit" component={RouterLink} to="/imprint">
                Impressum
              </MenuItem>
            </Menu>
          </Box>
          <Box
            component="img"
            src={`${process.env.REACT_APP_DOMAIN}/kermes/logo.png`}
            alt="Logo"
            sx={{
              width: 30,
              height: 30,
              mr: 1,
              display: { xs: "flex", md: "none" },
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            vbim
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              color="inherit"
              component={RouterLink}
              to="/"
            >
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;
