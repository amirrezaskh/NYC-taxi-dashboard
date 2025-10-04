import * as React from "react";
import { LocalTaxi } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from "../../theme/ColorModelconDropdown";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="absolute"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          mx: "auto",
          px: 2,
          maxWidth: {
            xl: "lg",
            lg: "md",
          },
        }}
      >
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 2}}
          >
            {/* Left section - Logo */}
            <Box
              component={NavLink}
              to=""
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                textDecoration: "none",
                flex: 1,
              }}
            >
              <LocalTaxi color="primary" sx={{ fontSize: 40 }} />
              <Typography
                variant="h6"
                color="textPrimary"
                sx={{
                  ml: 1,
                }}
              >
                NYC Taxi Trips
              </Typography>
            </Box>
            
            {/* Center section - Navigation buttons */}
            <Box 
              sx={{ 
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                flex: 1,
                gap: 1,
              }}
            >
              <Button
                component={NavLink}
                to="/"
                variant="text"
                color="info"
                size="small"
              >
                Dashboard
              </Button>
              <Button
                component={NavLink}
                to="/predict"
                variant="text"
                color="info"
                size="small"
              >
                Predict
              </Button>
              <Button
                component={NavLink}
                to="/about"
                variant="text"
                color="info"
                size="small"
              >
                About
              </Button>
            </Box>
            
            {/* Right section - Color mode dropdown */}
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <ColorModeIconDropdown />
            </Box>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem>
                  <Button
                    component={NavLink}
                    to="/"
                    variant="text"
                    color="info"
                    size="small"
                  >
                    Dashboard
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    component={NavLink}
                    to="/predict"
                    variant="text"
                    color="info"
                    size="small"
                  >
                    Predict
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    component={NavLink}
                    to="/about"
                    variant="text"
                    color="info"
                    size="small"
                  >
                    About
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Box>
    </AppBar>
  );
}
