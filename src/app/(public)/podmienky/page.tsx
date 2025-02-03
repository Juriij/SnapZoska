"use client";

import { Typography, Container, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";


export default function TermsConditions() {
  const router = useRouter();

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" sx={{ mb: 3 }} color="primary">
        Podmienky používania
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Vítame Vás na platforme ZoškaSnap. Tieto podmienky používania upravujú prístup k našim službám a ich využívanie. 
        Prosím, prečítajte si tieto podmienky starostlivo, než začnete používať našu platformu.
      </Typography>

      <Typography variant="h6" sx={{ mb: 2 }} color="primary">
        1. Akceptácia podmienok
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Používaním našich služieb súhlasíte s týmito podmienkami a všetkými pravidlami a pokynmi, ktoré sa na ne vzťahujú.
      </Typography>

      <Typography variant="h6" sx={{ mb: 2 }} color="primary">
        2. Práva a povinnosti používateľa
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Používateľ má právo využívať naše služby v súlade s týmito podmienkami. Je povinný zabezpečiť, že všetky informácie poskytnuté na platforme sú správne a aktuálne.
      </Typography>

      <Typography variant="h6" sx={{ mb: 2 }} color="primary">
        3. Zodpovednosť
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Za používanie našich služieb nesie používateľ plnú zodpovednosť. Nesieme zodpovednosť iba za obsah, ktorý priamo poskytujeme.
      </Typography>

      <Typography variant="h6" sx={{ mb: 2 }} color="primary">
        4. Ochrana osobných údajov
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Vaše osobné údaje sú chránené podľa našich zásad ochrany osobných údajov. Podrobnosti nájdete v našich zásadách ochrany osobných údajov.
      </Typography>

      <Typography variant="h6" sx={{ mb: 2 }} color="primary">
        5. Zmena podmienok
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Vyhradzujeme si právo kedykoľvek upravit tieto podmienky. O akýchkoľvek zmenách budete informovaní prostredníctvom našich služieb.
      </Typography>

      {/* Footer Text */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>© ZoškaSnap 2025</strong> - Všetky práva vyhradené.
        </Typography>

        {/* Button placed below footer text */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/auth/registracia")}
          sx={{ mt: 3 }}
        >
          Prejsť späť k registrácii
        </Button>
      </Box>
    </Container>
  );
}