import { NavLink, Outlet } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import { primaryColor } from "../App";

const pages = [
  { label: "Knjige", link: "" },
  { label: "Clanovi", link: "/clanovi" },
  { label: "Iznajmljivanje", link: "/iznajmljivanje" },
];

const Layout = () => {
  return (
    <Box>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Biblioteka
            </Typography>

            <Box sx={{ flexGrow: 1, display: "flex" }}>
              {pages.map((page) => (
                <NavLink key={page.label} to={page.link}>
                  {({ isActive }) => (
                    <Button
                      sx={{
                        color: isActive ? primaryColor : "white",
                        bgcolor: isActive ? "white" : "transparent",
                        m: 1,
                      }}
                    >
                      {page.label}
                    </Button>
                  )}
                </NavLink>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box mt={3}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
