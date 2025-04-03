"use client";

import * as React from "react";
import { 
  BottomNavigation, 
  BottomNavigationAction, 
  Box, 
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LoginIcon from "@mui/icons-material/Login";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from '@mui/icons-material/Person';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from '@/components/ThemeProvider';

export default function Navbar() {
  const [value, setValue] = React.useState<string>("/");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
  const { data: session, status } = useSession();
  const { mode, toggleTheme } = useTheme();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    router.push('/profil');
  };

  const handleSignOut = () => {
    handleMenuClose();
    signOut();
  };

  const handleThemeToggle = () => {
    toggleTheme();
    handleMenuClose();
  };

  const nonAuthPaths = [
    { label: "Domov", value: "/", icon: <HomeIcon /> },
    { label: "O mne", value: "/o-mne", icon: <AccessibilityIcon /> },
    { label: "Registrácia", value: "/auth/registracia", icon: <AppRegistrationIcon /> },
    { label: "Prihlásenie", value: "/auth/prihlasenie", icon: <LoginIcon /> },
  ];

  const authPaths = [
    { label: "Domov", value: "/", icon: <HomeIcon /> },
    { label: "Hľadať", value: "/hladanie", icon: <SearchIcon /> },
    { label: "Pridať", value: "/prispevok", icon: <AddCircleIcon /> },
    {
      label: "Profil",
      value: "profile-menu",
      icon: session?.user?.image ? (
        <Avatar 
          alt={session?.user?.name || "User"} 
          src={session?.user?.image || undefined}
          onClick={handleMenuOpen}
          sx={{ cursor: 'pointer' }}
        />
      ) : (
        <Avatar 
          onClick={handleMenuOpen}
          sx={{ cursor: 'pointer' }}
        >
          {session?.user?.name?.charAt(0) || "U"}
        </Avatar>
      ),
    },
  ];

  const navigationPaths = status === "authenticated" ? authPaths : nonAuthPaths;

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          if (newValue !== "profile-menu") {
            setValue(newValue);
            router.push(newValue);
          }
        }}
      >
        {navigationPaths.map((path) => (
          <BottomNavigationAction
            key={path.value}
            label={path.label}
            value={path.value}
            icon={path.icon}
          />
        ))}
      </BottomNavigation>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profil</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleThemeToggle}>
          <ListItemIcon>
            {mode === 'dark' ? (
              <Brightness7Icon fontSize="small" />
            ) : (
              <Brightness4Icon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>
            {mode === 'dark' ? 'Svetlý režim' : 'Tmavý režim'}
          </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Odhlásiť sa</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
