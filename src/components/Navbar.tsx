import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Container,
  Box,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  Code,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import { toggleTheme } from "../store/themeSlice";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    handleMenuClose();
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "History", path: "/history" },
  ];

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            <Code sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Avatar Project
            </Typography>
          </Box>

          {/* Desktop Menu */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: "flex", ml: 4 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  href={item.path}
                  sx={{
                    my: 2,
                    color: "text.primary",
                    display: "block",
                    fontWeight:
                      router.pathname === item.path ? "bold" : "normal",
                    borderBottom:
                      router.pathname === item.path ? "2px solid" : "none",
                    borderRadius: 0,
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Theme Toggle */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip
              title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
            >
              <IconButton
                onClick={() => dispatch(toggleTheme())}
                color="inherit"
              >
                {mode === "light" ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Tooltip>

            {/* Mobile Menu */}
            {isMobile && (
              <>
                <IconButton
                  size="large"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {navItems.map((item) => (
                    <MenuItem
                      key={item.path}
                      onClick={() => handleNavigate(item.path)}
                      selected={router.pathname === item.path}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
