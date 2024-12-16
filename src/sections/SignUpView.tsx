// // src/sections/SignUpView.tsx

// "use client";

// import {
//   Button,
//   Container,
//   Typography
  
// } from "@mui/material";
// import { signIn } from "next-auth/react";
// import GoogleIcon from "@mui/icons-material/Google";
// // import FacebookIcon from "@mui/icons-material/Facebook";

// export default function SignUpView() {
//   return (
//     <Container
//       maxWidth="xs"
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         mt: 5,
//         p: 3,
//         bgcolor: "background.paper",
//         boxShadow: 3,
//         borderRadius: 2,
//       }}
//     >
//       {/* Logo / Title */}
//       <Typography variant="h5" sx={{ mb: 3 }}>
//         Registrácia
//       </Typography>

//       {/* Sign-in link */}
//       <Typography variant="body1" sx={{ mb: 6 }}>
//         Už máte účet? <a href="/auth/prihlasenie">Prihláste sa</a>
//       </Typography>

//       {/* Google Sign Up */}
//       <Button
//         variant="outlined"
//         fullWidth
//         startIcon={<GoogleIcon />}
//         onClick={() => signIn("google")}
//         sx={{ mb: 1 }}
//       >
//         Registrovať sa účtom Google
//       </Button>


//     </Container>
//   );
// }














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

export default function SignUpView() {
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    setError(false); // Reset the error message when the checkbox is toggled
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
      {/* Logo / Title */}
      <Typography variant="h5" sx={{ mb: 3 }}>
        Registrácia
      </Typography>

      {/* Sign-in link */}
      <Typography variant="body1" sx={{ mb: 6 }}>
        Už máte účet? <a href="/auth/prihlasenie">Prihláste sa</a>
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
              <a href="/gdpr" target="_blank" rel="noopener noreferrer">
                GDPR
              </a>{" "}
              a{" "}
              <a href="/podmienky" target="_blank" rel="noopener noreferrer">
                podmienkami používania
              </a>
              .
            </>
          }
        />
        {error && <FormHelperText>Musíte súhlasiť s podmienkami</FormHelperText>}
      </FormControl>
    </Container>
  );
}
