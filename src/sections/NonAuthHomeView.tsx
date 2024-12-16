import { Container, Typography, Box } from "@mui/material";

export default function NonAuthHomeView() {
  return (
    <Container maxWidth="sm" sx={{ paddingTop: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" color="primary">
          Domovská stránka
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
          NEprihlásený užívateľ
        </Typography>
      </Box>

      <Typography variant="body1" sx={{ mt: 3 }}>
        Registrujte sa, aby ste mohli pridať príspevky a zobraziť svoj profil.
      </Typography>
    </Container>
  );
}
