import { Fab, Tooltip } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';

export default function MusicButton({ playing, onToggle, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1500 }}
        >
          <Tooltip title={playing ? 'Pause music' : 'Play music'} placement="left">
            <Fab
              color="primary"
              onClick={onToggle}
              aria-label="toggle music"
              component={motion.button}
              animate={playing ? { rotate: 360 } : { rotate: 0 }}
              transition={playing ? { duration: 6, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
            >
              {playing ? <MusicNoteIcon /> : <MusicOffIcon />}
            </Fab>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
