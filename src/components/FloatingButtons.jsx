import { Box, Fab, Tooltip } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import { PURPLE } from '../theme';

// Only the music button remains. Scrolling is paused/resumed by tapping anywhere on the page.
export default function FloatingButtons({ visible, playing, onToggleMusic }) {
  return (
    <AnimatePresence>
      {visible && (
        <Box
          component={motion.div}
          data-no-stop
          initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
          sx={{ position: 'fixed', right: 14, bottom: 18, zIndex: 1500 }}
        >
          <Tooltip title={playing ? 'Pause music' : 'Play music'} placement="left">
            <Fab onClick={onToggleMusic} aria-label="toggle music" sx={{ bgcolor: PURPLE, color: '#fff', '&:hover': { bgcolor: '#5a5280' } }}>
              {playing ? <GraphicEqIcon className="eq-pulse" /> : <MusicOffIcon />}
            </Fab>
          </Tooltip>
        </Box>
      )}
    </AnimatePresence>
  );
}
