"use client"; 

import {
  Button,
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  FormControl 
} from "@mui/material";
import { useState } from "react";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import { useTheme } from "@mui/material/styles";

export default function SignUpView() {
  const theme = useTheme();
  const linkColor = theme.palette.mode === "dark" ? "#ffcc00" : "#4a148c"; 
  const [error, setError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    setError(false); // Reset the error when the checkbox is toggled
  };

  const handleGoogleSignIn = () => {
    if (!isChecked) {
      setError(true); // Show error if the checkbox is not checked
      return;
    }
    signIn("google"); // Proceed with Google sign-in if checked
  };

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
      {/* Title */}
      <Typography variant="h5" sx={{ mb: 3 }}>
        Registrácia
      </Typography>

      {/* Sign-in link */}
      <Typography variant="body1" sx={{ mb: 6 }}>
        Už máte účet?{" "}
        <Typography
          component="a"
          href="/auth/prihlasenie"
          sx={{ color: linkColor, textDecoration: "none", fontWeight: 500 }}
        >
          Prihláste sa
        </Typography>
      </Typography>

      {/* Google Sign Up */}
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={handleGoogleSignIn}
        sx={{ mb: 1 }}
      >
        Registrovať sa účtom Google
      </Button>

      {/* GDPR Checkbox and Terms */}
      <FormControl error={error} component="fieldset" sx={{ mt: 3 }}>
        <FormControlLabel
          control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
          label={
            <>
              Súhlasím s{" "}
              <Typography
                component="a"
                href="/gdpr"
                sx={{ color: linkColor, textDecoration: "none", fontWeight: 500 }}
              >
                GDPR
              </Typography>{" "}
              a{" "}
              <Typography
                component="a"
                href="/podmienky"
                sx={{ color: linkColor, textDecoration: "none", fontWeight: 500 }}
              >
                podmienkami používania
              </Typography>
              .
            </>
          }
        />
        {error && <FormHelperText>Musíte súhlasiť s podmienkami</FormHelperText>}
      </FormControl>
    </Container>
  );
}