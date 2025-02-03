"use client";

import { Typography, Container, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";



export default function GDPR() {
  const router = useRouter();

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" color="primary" >
          Stránka s GDPR informáciami
        </Typography>
      </Box>

      <Button variant="contained" color="primary" onClick={() => router.back()} sx={{ mb: 3 }}>
        Späť
      </Button>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" component="h2" color="primary" sx={{ mb: 2 }}>
          Ochrana osobných údajov
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Vaša ochrana súkromia je pre nás veľmi dôležitá. Táto stránka vysvetľuje, ako zhromažďujeme, spracúvame a chránime vaše osobné údaje v súlade s nariadením o ochrane osobných údajov (GDPR).
        </Typography>

        <Typography variant="h6" component="h2" color="primary" sx={{ mb: 2 }}>
          Zhromažďované údaje
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Naša webová stránka zhromažďuje osobné údaje, ako sú meno, e-mailová adresa, a ďalšie informácie, ktoré poskytujete pri registrácii alebo komunikácii s nami. Tieto údaje zhromažďujeme výhradne na účely poskytovania našich služieb a kontaktovania používateľov.
        </Typography>

        <Typography variant="h6" component="h2" color="primary" sx={{ mb: 2 }}>
          Účely spracovania údajov
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Vaše osobné údaje spracúvame za účelom:
          <ul>
            <li>Poskytovania našich služieb a aplikácií</li>
            <li>Komunikácie s vami ohľadom našich produktov a služieb</li>
            <li>Vylepšovania užívateľskej skúsenosti</li>
          </ul>
        </Typography>

        <Typography variant="h6" component="h2" color="primary" sx={{ mb: 2 }}>
          Práva používateľov
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Podľa GDPR máte právo na prístup k svojim osobným údajom, právo na opravu, vymazanie, obmedzenie spracovania a právo na prenosnosť údajov. Ak chcete využiť tieto práva, kontaktujte nás na našej e-mailovej adrese.
        </Typography>

        <Typography variant="h6" component="h2" color="primary" sx={{ mb: 2 }}>
          Bezpečnosť údajov
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Zaviedli sme primerané technické a organizačné opatrenia na ochranu vašich osobných údajov pred neoprávneným prístupom, zverejnením alebo zneužitím.
        </Typography>

        <Typography variant="h6" component="h2" color="primary" sx={{ mb: 2 }}>
          Kontaktné informácie
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Ak máte akékoľvek otázky alebo obavy týkajúce sa spracovania vašich osobných údajov, neváhajte nás kontaktovať na nasledujúcej e-mailovej adrese: <strong>info@zochovasnap.sk</strong>.
        </Typography>
      </Box>
    </Container>
  );
}
