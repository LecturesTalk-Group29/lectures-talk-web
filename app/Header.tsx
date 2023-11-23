"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

// Examples of good icons
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import WindPowerIcon from '@mui/icons-material/WindPower';
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';
import SurfingIcon from '@mui/icons-material/Surfing';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import KayakingIcon from '@mui/icons-material/Kayaking';
import ArchitectureIcon from '@mui/icons-material/Architecture';


import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, userPublisher } from "./user";

const pages = ["Lectures", "About"];
const settings = ["Profile", "Logout"];

function Header() {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [userAuth, setUserAuth] = React.useState<User | null>(null);

  React.useEffect(() => {
    userPublisher.subscribe((value) => {
      setUserAuth(value);
    })
  }, []);

  const handleAccountIconClick = () => {
    if (userAuth) {
      router.push(`/users/${userAuth.username}`);
    } else {
      router.push("/login");
    }
  };

  const handleLogIn = async () => {
    // await googleLogin();
  };

  const handleLogOut = async () => {
    // await logout();
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
    // sx={{
    //     backgroundColor: "black",
    //     color: "white",
    // }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link href={"/"}>
            <ArchitectureIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mb: 0.3,
              }}
            />
          </Link>
          <Link href={"/"}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "sans-serif",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LecturesTalk
            </Typography>
          </Link>
          {/* Menu for mobile */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
            }}
          >
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
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 2,
              justifyContent: "center",
            }}
          >
            <Link href={"/"}>
              <ArchitectureIcon />
            </Link>
          </Box>

          {/* Desktop pages */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              mr: 2,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                color="inherit"
                sx={{ my: 2, display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Avatar with a menu */}
          {/* session is undefined, that's why this cind of check, its important */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={userAuth ? "Your Account" : "SignUp / LogIn"}>
              <IconButton onClick={handleAccountIconClick} sx={{ p: 0 }}>
                <Box className="w-10 h-10">
                  {userAuth ? (<ManageAccountsIcon />) : (<PersonAddIcon />)}
                </Box>
              </IconButton>
            </Tooltip>

            {/* Profile Options when logged in*/}
            {/* session is undefined, that's why this cind of check, its important */}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    // In arrow function you need to invoke the func right away "()"
                    if (setting === "Profile") {
                      router.push("/profile");
                    }
                    if (setting === "Logout") {
                      handleLogOut();
                    }
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
