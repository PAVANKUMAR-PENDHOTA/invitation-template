import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Floral from './Floral';
import Envelope from './Envelope';
import { invitation as inv } from '../data/invitation';

export default function Hero({ play }) {
  return (
    <Box component="section" id="home" sx={{ position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
      {/* faint botanical watermark */}
      <Floral name="botanical" sx={{ right: '-14%', top: 40, width: '82%', opacity: 0.75, zIndex: 0 }} />

      {/* ---------- screen 1 : flowers + envelope ---------- */}
      <Box sx={{ position: 'relative', minHeight: 'min(calc(100svh / var(--zoom, 1)), 410px)', pt: 4, pb: 2, zIndex: 1 }}>
        <Floral name="corner_tl" sx={{ top: -12, left: -18, width: '64%', zIndex: 1 }} />
        <Floral name="edge_right" sx={{ right: -4, top: 150, width: '32%', zIndex: 1 }} />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={play ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <Typography
            sx={{
              position: 'relative', zIndex: 3, textAlign: 'right', pr: '6%', fontFamily: '"Playfair Display", serif',
              fontWeight: 700, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: '#6f7164', textShadow: '0 0 6px #f6f5f8, 0 0 10px #f6f5f8',
            }}
          >
            {inv.saveTheDate}
          </Typography>
        </motion.div>

        <Box sx={{ mt: { xs: 10, sm: 11 } }}>
          <Envelope play={play} />
        </Box>
      </Box>

      {/* ---------- screen 2 : names over a lavender-tinted ceremony photo ---------- */}
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '1 / 0.9',
          zIndex: 1,
          mt: '-6%',
          overflow: 'hidden',
          backgroundImage: "linear-gradient(rgba(201, 187, 230, 0.3), rgba(232, 224, 246, 0.4)), url('/images/engagement-background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 38%',
        }}
      >
        <Floral name="edge_right" sx={{ right: -8, top: '-16%', width: '20%', opacity: 0.95, zIndex: 3 }} />

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={play ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 3.8 }}
        >
          <Typography
            sx={{
              position: 'relative', zIndex: 2, pt: '9%', fontFamily: '"Bodoni Moda", "Playfair Display", serif', fontWeight: 400,
              fontSize: { xs: 29, sm: 35 }, lineHeight: 2, letterSpacing: 1, color: '#6f65a3',
              textShadow: '0 0 8px #f6f5f8, 0 0 14px #f6f5f8',
            }}
          >
            {inv.groomShort1}<br />{inv.brideShort1}
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
}
