"use client";

import {
  Button,
  Container,
  Typography
} from "@mui/material";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import { useTheme } from "@mui/material/styles";

export default function SignInView() {
  const theme = useTheme();
  const linkColor = theme.palette.mode === "dark" ? "#ffcc00" : "#4a148c"; 

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
        p: 3,
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      {/* Logo / Title */}
      <Typography variant="h5" sx={{ mb: 3 }}>
        Prihlásenie
      </Typography>

      {/* Google Sign In Button */}
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={() => signIn("google")}
        sx={{ mb: 1 }}
      >
        Prihlásiť sa účtom Google
      </Button>

      {/* Link to Registration page */}
      <Typography variant="body1" sx={{ mt: 3 }}>
        Nemáte účet?{" "}
        <Typography
          component="a"
          href="/auth/registracia"
          sx={{ color: linkColor, textDecoration: "none", fontWeight: 500 }}
        >
          Prejdite na registráciu
        </Typography>
      </Typography>
    </Container>
  );
}
