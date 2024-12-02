
// src/app/profil/[id]/page.tsx

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const metadata = {title: "Detail profilu | ZoškaSnap"};

export default function ProfileDetails() {
  return (
    <Container>
      <Typography> Detail konkrétneho profilu </Typography>
    </Container>
  );
}