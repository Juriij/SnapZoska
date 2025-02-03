// src/app/o-mne/page.tsx

// import { Typography, Container, Link, Box } from "@mui/material";

// export const metadata = { title: "O mne | ZoškaSnap" };

// export default function AboutMe() {
//   return (
//     <Container maxWidth="md" sx={{ paddingTop: 4 }}>
//       <Box sx={{ textAlign: 'center', mb: 4 }}>
//         <Typography variant="h4" component="h1" color="primary">
//           Stránka o mne
//         </Typography>
//         <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
//           Vitajte na mojej stránke ZochovaSnap! Volám sa Juraj Kopičiar a som študentom SPŠE Zochova odboru umelej inteligencie
//         </Typography>
//       </Box>

//       {/* Stránka školy link */}
//       <Box sx={{ textAlign: 'center', mt: 3 }}>
//         <Link href="https://zochova.sk/" target="_blank" rel="noopener" sx={{ fontStyle: 'italic' }}>
//           Stránka školy
//         </Link>
//       </Box>
//     </Container>
//   );
// }



// export const metadata = { title: "O mne | ZoškaSnap" };

// import { Typography, Container, Link, Box, Card, CardContent } from "@mui/material";

// export default function AboutMe() {
//   return (
//     <Container maxWidth="md" sx={{ paddingTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <Card sx={{ width: '100%', borderRadius: 4, boxShadow: 4, mb: 4, p: 3 }}>
//         <CardContent>
//           <Typography variant="h3" component="h1" color="primary" textAlign="center" gutterBottom>
//             O mne
//           </Typography>
//           <Typography variant="body1" color="textSecondary" textAlign="center">
//             Vitajte na mojej stránke ZochovaSnap! Volám sa Juraj Kopičiar a som študentom SPŠE Zochova odboru umelej inteligencie.
//           </Typography>
//         </CardContent>
//       </Card>

//       <Box sx={{ textAlign: 'center', mt: 3 }}>
//         <Typography variant="h5" sx={{ mb: 2 }}>
//           Navštívte stránku mojej školy
//         </Typography>
//         <Link href="https://zochova.sk/" target="_blank" rel="noopener" sx={{ fontStyle: 'italic', fontSize: '1.2rem', fontWeight: 'bold', textDecoration: 'none', color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}>
//           SPŠE Zochova
//         </Link>
//       </Box>
//     </Container>
//   );
// }























export const metadata = { title: "O mne | ZoškaSnap" };

import { Typography, Container, Link, Box, Card, CardContent } from "@mui/material";

export default function AboutMe() {
  return (
    <Container maxWidth="md" sx={{ paddingTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card sx={{ width: '100%', borderRadius: 4, boxShadow: 4, mb: 4, p: 3 }}>
        <CardContent>
          <Typography variant="h3" component="h1" color="primary" textAlign="center" gutterBottom>
            O mne
          </Typography>
          <Typography variant="body1" color="textSecondary" textAlign="center">
            Vitajte na mojej stránke ZochovaSnap! Volám sa Juraj Kopičiar a som študentom SPŠE Zochova odboru umelej inteligencie.
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Navštívte stránku mojej školy
        </Typography>
        <Link href="https://zochova.sk/" target="_blank" rel="noopener" sx={{ fontStyle: 'italic', fontSize: '1.2rem', fontWeight: 'bold', textDecoration: 'none', color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}>
          SPŠE Zochova
        </Link>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Sledujte nas na sociálnych sieťach
        </Typography>
        <Link href="https://www.facebook.com/spsezochova/" target="_blank" rel="noopener" sx={{ fontStyle: 'italic', fontSize: '1.2rem', fontWeight: 'bold', textDecoration: 'none', color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}>
          Facebook
        </Link>
        <br />
        <Link href="https://www.instagram.com/spsezochova/" target="_blank" rel="noopener" sx={{ fontStyle: 'italic', fontSize: '1.2rem', fontWeight: 'bold', textDecoration: 'none', color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}>
          Instagram
        </Link>
      </Box>
    </Container>
  );
}
