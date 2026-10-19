import { Box, Button, Typography } from '@mui/material';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import Reveal from './Reveal';
import Floral from './Floral';
import { invitation as inv } from '../data/invitation';
import { PURPLE_SOFT } from '../theme';

export default function Venue() {
  const q = encodeURIComponent(inv.venue.address);
  return (
    <Box component="section" id="venue" sx={{ position: 'relative', textAlign: 'center', pt: 2, overflow: 'hidden' }}>
      <Reveal>
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography sx={{ fontFamily: '"Tinos", "Times New Roman", serif', fontWeight: 700, fontSize: 14, letterSpacing: 0.5, color: PURPLE_SOFT, textTransform: 'uppercase' }}>
            {inv.venue.title}
          </Typography>
          <Typography sx={{ fontSize: 11, color: '#a9a5bd', px: 4, mt: 1, lineHeight: 1.6 }}>{inv.venue.address}</Typography>

          <Box sx={{ width: '78%', height: { xs: 210, sm: 240 }, mx: 'auto', mt: 2.5, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 6px 18px rgba(0,0,0,.18)' }}>
            <iframe
              title="Venue map"
              src={`https://www.google.com/maps?q=${q}&output=embed`}
              style={{ border: 0, width: '100%', height: '100%' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Box>

          <Button
            href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} target="_blank" rel="noopener noreferrer"
            startIcon={<NearMeOutlinedIcon sx={{ fontSize: 16 }} />}
            sx={{ mt: 1.5, color: '#8d89a6', fontSize: 12, fontWeight: 700 }}
          >
            Get directions
          </Button>
        </Box>
      </Reveal>

      {/* No-dress-code text sits in front of the vintage manor + trees */}
      <Box sx={{ position: 'relative', aspectRatio: '1 / 0.8', mt: '-2%', zIndex: 1 }}>
        <Floral name="manor_close" sx={{ left: '-6%', top: 0, width: '112%', maxWidth: 'none' }} />
        <Reveal delay={0.1}>
          <Box sx={{ position: 'relative', zIndex: 2, pt: '16%', textShadow: '0 0 8px #f6f5f8, 0 0 14px #f6f5f8, 0 0 22px #f6f5f8' }}>
            <Typography sx={{ fontFamily: '"Tinos", "Times New Roman", serif', fontWeight: 700, fontSize: 16, letterSpacing: 1, color: '#7168a5', textTransform: 'uppercase' }}>
              {inv.dressCode.title}
            </Typography>
            {inv.dressCode.lines.map((l) => (
              <Typography key={l} sx={{ fontSize: 12, color: '#8f8aa8', lineHeight: 1.75 }}>{l}</Typography>
            ))}
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
}
