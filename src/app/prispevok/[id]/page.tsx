
// src/app/prispevok/[id]/page.tsx

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const metadata = {title: "Konkrétny príspevok | ZoškaSnap"};

export default function PostDetails() {
  return (
    <Container>
      <Typography> Detail konkrétneho príspevku </Typography>
    </Container>
  );
}