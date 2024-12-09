"use client";

import * as React from "react";
import { 
  BottomNavigation, 
  BottomNavigationAction, 
  Box, 
  Avatar

} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LoginIcon from "@mui/icons-material/Login";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import ArticleIcon from '@mui/icons-material/Article';
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from '@/components/ThemeProvider';



export default function Navbar() {
  const [value, setValue] = React.useState<string>("/");
  const router = useRouter();
  const { data: session, status } = useSession();
  const { mode, toggleTheme } = useTheme();



  const nonAuthPaths = [
    { label: "Domov", value: "/", icon: <HomeIcon /> },
    { label: "O mne", value: "/o-mne", icon: <AccessibilityIcon /> },
    { label: "GDPR", value: "/gdpr", icon: <ArticleIcon />},
    { label: "Registrácia", value: "/auth/registracia", icon: <AppRegistrationIcon /> },
    { label: "Prihlásenie", value: "/auth/prihlasenie", icon: <LoginIcon /> },
  ];

  const authPaths = [
    { label: "Domov", value: "/", icon: <HomeIcon /> },
    { label: "Hľadať", value: "/hladanie", icon: <SearchIcon /> },
    { label: "Pridať", value: "/prispevok", icon: <AddCircleIcon /> },
    {
      label: "Profil",
      value: "/profil",
      icon: session?.user?.image ? (
        <Avatar alt={session?.user?.name || "User"} src={session?.user?.image || undefined} />
      ) : (
        <Avatar>{session?.user?.name?.charAt(0) || "U"}</Avatar>
      ),
    },
    { label: "Odhlásiť", value: "/auth/odhlasenie", icon: <LogoutIcon /> },
  ];

  const navigationPaths = status === "authenticated" ? authPaths : nonAuthPaths;





  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value} // Tracks the active navigation value
        onChange={(event, newValue) => {
          if (newValue !== "toggle-theme") {
            setValue(newValue); // Only update state for actual navigation
            router.push(newValue); // Navigate to the new page
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
        {/* Light/Dark Mode Button */}
        <BottomNavigationAction
          label="Mode"
          value="toggle-theme" // Unique value for the theme toggle
          icon={mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          onClick={(event) => {
            event.stopPropagation(); // Prevent triggering navigation
            toggleTheme(); // Toggle the theme
          }}
        />
      </BottomNavigation>
    </Box>
  );
  
}
