import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Floral from './Floral';
import Sparkles from './Sparkles';
import { invitation as inv } from '../data/invitation';
import { PURPLE, PURPLE_SOFT } from '../theme';

const dateText = new Date(inv.date.year, inv.date.month - 1, inv.date.day).toLocaleDateString('en-US', {
  month: 'long', day: 'numeric', year: 'numeric',
});

export default function Cover({ opening, onOpen }) {
  return (
    <Box
      component={motion.div}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
      sx={{
        position: 'fixed', inset: 0, zIndex: 2000, display: 'grid', placeItems: 'center',
        px: 2, overflow: 'hidden',
        background: 'linear-gradient(165deg,#9189b8 0%,#7b73a3 50%,#6a6296 100%)',
      }}
    >
      <Sparkles />

      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 30, filter: 'blur(0px)', scale: 1 }}
        animate={
          opening
            ? { opacity: 0, y: -10, filter: 'blur(12px)', scale: 1.08 }
            : { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }
        }
        transition={{ duration: opening ? 1.2 : 1 }}
        sx={{
          position: 'relative', width: 'min(92vw, 420px)', zoom: 'var(--zoom, 1)', bgcolor: '#fbf6fc', borderRadius: '8px',
          textAlign: 'center', pt: 5, pb: 4.5, px: 3, overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(40,30,80,.45)',
        }}
      >
        <Floral name="corner_small" sx={{ top: -6, left: -6, width: '36%' }} />
        <Floral name="corner_small" flip sx={{ top: -6, right: -6, width: '36%' }} />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            component={motion.div}
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            sx={{
              width: 38, height: 38, mx: 'auto', mb: 2, borderRadius: '50%', bgcolor: PURPLE,
              display: 'grid', placeItems: 'center', color: '#fff', boxShadow: '0 6px 14px rgba(109,101,148,.5)',
            }}
          >
            <FavoriteIcon sx={{ fontSize: 20 }} />
          </Box>

          <Typography sx={{ fontFamily: '"Bodoni Moda", "Playfair Display", serif', fontSize: 31, lineHeight: 1.15, color: PURPLE_SOFT }}>
            {inv.groomShort}
          </Typography>
          <Typography sx={{ fontFamily: '"Bodoni Moda", serif', fontStyle: 'italic', fontSize: 15, color: PURPLE_SOFT, my: 0.3 }}>&amp;</Typography>
          <Typography sx={{ fontFamily: '"Bodoni Moda", "Playfair Display", serif', fontSize: 31, lineHeight: 1.15, color: PURPLE_SOFT }}>
            {inv.brideShort}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, my: 2, color: PURPLE_SOFT }}>
            <Box sx={{ width: 40, height: '1px', bgcolor: '#cfcbe0' }} />
            <Typography sx={{ fontSize: 12}}>💜</Typography>
            <Box sx={{ width: 40, height: '1px', bgcolor: '#cfcbe0' }} />
          </Box>

          <Typography sx={{ fontSize: 14, color: '#9a96b3' }}>{dateText}</Typography>
          <Typography sx={{ fontSize: 14, color: '#9a96b3', mt: 1.5, mb: 2.5 }}>Cordially Invites</Typography>

          <Button
            variant="contained"
            onClick={onOpen}
            disabled={opening}
            sx={{
              bgcolor: PURPLE, px: 4.5, py: 0.9, fontSize: 15, boxShadow: '0 6px 16px rgba(109,101,148,.45)',
              '&:hover': { bgcolor: '#5a5280' },
            }}
          >
            Open
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
