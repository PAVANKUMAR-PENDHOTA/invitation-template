import { Box, Typography } from '@mui/material';
import Floral from './Floral';
import { invitation as inv } from '../data/invitation';

export default function Footer() {
  return (
    <Box component="footer" sx={{ position: 'relative', textAlign: 'center', pt: 3, pb: 27, overflow: 'hidden' }}>
      <Typography sx={{ fontSize: 11, color: '#6f65a3', position: 'relative', zIndex: 2 }}>{inv.closing}</Typography>
      <Typography sx={{ fontSize: 9, color: '#b4b0c8', mt: 1.2, position: 'relative', zIndex: 2 }}>♡ {inv.footerCredit}</Typography>
      <Floral name="footer_border" sx={{ left: 0, bottom: 0, width: '100%', zIndex: 1 }} />
    </Box>
  );
}
