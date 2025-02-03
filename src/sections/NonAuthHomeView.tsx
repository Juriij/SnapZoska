"use client";

import { Container, Typography, Box, Button, Card, CardContent } from "@mui/material";
import { useRouter } from "next/navigation";

export default function NonAuthHomeView() {
  const router = useRouter();

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card sx={{ width: '100%', borderRadius: 4, boxShadow: 4, mb: 4 }}>
        <CardContent>
          <Typography variant="h3" component="h1" color="primary" gutterBottom textAlign="center">
            Vitajte na našej stránke!
          </Typography>
          <Typography variant="body1" color="textSecondary" textAlign="center">
            Ste neprihlásený užívateľ.
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Pridajte sa k nám!
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          Registrujte sa, aby ste mohli pridať príspevky a zobraziť svoj profil.
        </Typography>
        <Button variant="contained" color="primary" size="large" onClick={() => router.push('/auth/registracia')} sx={{ boxShadow: 2, borderRadius: 2 }}>
          Registrácia
        </Button>
      </Box>
    </Container>
  );
}
