
// // src/app/o-mne/page.tsx

// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";

// export const metadata = {title: "O mne | ZoškaSnap"};

// export default function AboutMe() {
//   return (
//     <Container>
//       <Typography> Stránka o mne </Typography>
//     </Container>
//   );
// }



// src/app/o-mne/page.tsx

import { Typography, Container, Link, Box } from "@mui/material";

export const metadata = { title: "O mne | ZoškaSnap" };

export default function AboutMe() {
  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" color="primary">
          Stránka o mne
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
          Vitajte na mojej stránke ZochovaSnap! Volám sa Juraj Kopičiar a som študentom SPŠE Zochova odboru umelej inteligencie
        </Typography>
      </Box>

      {/* Stránka školy link */}
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Link href="https://zochova.sk/" target="_blank" rel="noopener" sx={{ fontStyle: 'italic' }}>
          Stránka školy
        </Link>
      </Box>
    </Container>
  );
}
