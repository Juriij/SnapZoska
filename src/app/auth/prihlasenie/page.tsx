
// src/app/auth/prihlasenie/page.tsx

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const metadata = {title: "Prihlásenie | ZoškaSnap"};

export default function SignIn() {
  return (
    <Container>
      <Typography> Prihlásenie cez OAuth </Typography>
    </Container>
  );
}