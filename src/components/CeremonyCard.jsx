import { Box, Typography } from '@mui/material';
import PurpleCard, { CardHeading } from './PurpleCard';
import Floral from './Floral';
import Reveal from './Reveal';
import { invitation as inv } from '../data/invitation';

function Parents({ p }) {
  return (
    <Box sx={{ flex: 1, px: 1 }}>
      <Typography sx={{ fontSize: 10, opacity: 0.75 }}>Mr. &amp; Mrs.</Typography>
      <Typography sx={{ fontSize: 13, fontWeight: 600, mt: 0.3 }}>{p.parents[0]}</Typography>
      <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{p.parents[1]}</Typography>
      <Typography sx={{ fontSize: 9, opacity: 0.7, mt: 0.6 }}>{p.place}</Typography>
    </Box>
  );
}

export default function CeremonyCard() {
  return (
    <Box component="section" id="ceremony" sx={{ position: 'relative', pb: 6, mt: '-9%', zIndex: 2 }}>
      <Reveal>
        <PurpleCard sx={{ overflow: 'visible' }}>
          <CardHeading>{inv.ceremonyTitle}</CardHeading>

          <Box sx={{ display: 'flex', alignItems: 'stretch', mb: 2.5 }}>
            <Parents p={inv.groom} />
            <Box sx={{ width: '1px', bgcolor: 'rgba(255,255,255,.55)' }} />
            <Parents p={inv.bride} />
          </Box>

          <Box sx={{ mb: 3 }}>
            {inv.inviteLines.map((l) => (
              <Typography key={l} sx={{ fontSize: 11.5, lineHeight: 1.7, opacity: 0.95 }}>{l}</Typography>
            ))}
          </Box>

          <Typography sx={{ fontFamily: '"Bodoni Moda", "Playfair Display", serif', fontSize: { xs: 28, sm: 30 }, lineHeight: 1.1 }}>{inv.groom.name}</Typography>
          <Typography sx={{ fontSize: 9, letterSpacing: 2, opacity: 0.7, my: 1 }}>{inv.groom.role}</Typography>
          <Typography sx={{ fontFamily: '"Bodoni Moda", serif', fontStyle: 'italic', fontSize: 30, lineHeight: 1 }}>&amp;</Typography>
          <Typography sx={{ fontFamily: '"Bodoni Moda", "Playfair Display", serif', fontSize: { xs: 28, sm: 30 }, lineHeight: 1.1, mt: 1 }}>{inv.bride.name}</Typography>
          <Typography sx={{ fontSize: 9, letterSpacing: 2, opacity: 0.7, mt: 1 }}>{inv.bride.role}</Typography>

          <Floral name="corner_br" sx={{ right: '-17%', bottom: '-9%', width: '40%' }} />
        </PurpleCard>
      </Reveal>
    </Box>
  );
}
