import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import Cover from './components/Cover';
import Hero from './components/Hero';
import CeremonyCard from './components/CeremonyCard';
import PhotoGallery from './components/PhotoGallery';
import PartyInfo from './components/PartyInfo';
import Venue from './components/Venue';
import Schedule from './components/Schedule';
import Guestbook from './components/Guestbook';
import Footer from './components/Footer';
import RsvpDialog from './components/RsvpDialog';
import FloatingButtons from './components/FloatingButtons';
import useAutoScroll from './hooks/useAutoScroll';

// seconds the envelope intro needs before the page starts gliding (see index.css)
const INTRO_MS = 5000;
const MUSIC_START = 329;
const MUSIC_END = 383;

export default function App() {
  const audioRef = useRef(null);
  // 'cover' -> 'opening' (card blurs away) -> 'open' (invitation shown)
  const [phase, setPhase] = useState('cover');
  const [playing, setPlaying] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [hint, setHint] = useState('');

  const isOpen = phase === 'open';
  const auto = useAutoScroll({ enabled: isOpen, speed: 55, startDelay: INTRO_MS });

  // lock page scroll while the cover is visible
  useEffect(() => {
    document.body.style.overflow = isOpen ? '' : 'hidden';
    if (isOpen) window.scrollTo({ top: 0, behavior: 'instant' });
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // pause while the RSVP dialog is open
  useEffect(() => { if (rsvpOpen) auto.stop(); }, [rsvpOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // small hint messages (no buttons): first tip, then pause/resume feedback
  const hintTimer = useRef(0);
  const flash = (text, ms = 1800) => {
    setHint(text);
    clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => setHint(''), ms);
  };
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => flash('Tap anywhere to pause / resume scrolling', 4200), INTRO_MS + 600);
    return () => clearTimeout(t);
  }, [isOpen]);
  const prevActive = useRef(false);
  const startedOnce = useRef(false);
  useEffect(() => {
    if (!isOpen) return;
    if (prevActive.current !== auto.active) {
      // don't announce the very first automatic start, only later pause / resume
      if (!auto.active || startedOnce.current) flash(auto.active ? 'Scrolling… tap to pause' : 'Paused — tap to resume', 1500);
      if (auto.active) startedOnce.current = true;
      prevActive.current = auto.active;
    }
  }, [auto.active, isOpen]);

  const handleOpen = () => {
    setPhase('opening');
    const a = audioRef.current;
    if (a) {
      a.volume = 0.5;
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
    setTimeout(() => setPhase('open'), 1300);
  };

  const handleAudioMetadata = () => {
    const a = audioRef.current;
    if (a && (a.currentTime < MUSIC_START || a.currentTime >= MUSIC_END)) {
      a.currentTime = MUSIC_START;
    }
  };

  const handleAudioTimeUpdate = () => {
    const a = audioRef.current;
    if (a && a.currentTime >= MUSIC_END) a.currentTime = MUSIC_START;
  };

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {});
    else { a.pause(); setPlaying(false); }
  };

  return (
    <Box>
      <audio
        ref={audioRef}
        style={{ display: 'none' }}
        data-video-audio="true"
        data-music-track-id="yt-e1b9ad9b-cca"
        data-music-start={MUSIC_START}
        data-music-end={MUSIC_END}
        preload="metadata"
        src="https://cdn.chungdoi.com/music/yt-e1b9ad9b-cca.mp3"
        onLoadedMetadata={handleAudioMetadata}
        onTimeUpdate={handleAudioTimeUpdate}
      />

      <AnimatePresence>
        {phase !== 'open' && <Cover key="cover" opening={phase === 'opening'} onOpen={handleOpen} />}
      </AnimatePresence>

      {/* The invitation: phone-width column, enlarged automatically on desktop (see --zoom in index.css) */}
      <Box component="main" className="invite-column">
        <Hero play={isOpen} />
        <CeremonyCard />
        <PhotoGallery />
        <PartyInfo onConfirm={() => setRsvpOpen(true)} />
        <Venue />
        <Schedule />
        <Guestbook />
        <Footer />
      </Box>

      <FloatingButtons visible={isOpen} playing={playing} onToggleMusic={toggleMusic} />

      <AnimatePresence>
        {hint && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 14 }}
            sx={{ position: 'fixed', left: 0, right: 0, bottom: 26, display: 'flex', justifyContent: 'center', zIndex: 1600, pointerEvents: 'none', px: 2 }}
          >
            <Typography sx={{ bgcolor: 'rgba(90,82,128,.92)', color: '#fff', fontSize: 12.5, px: 2, py: 0.9, borderRadius: 99, boxShadow: '0 6px 18px rgba(0,0,0,.25)' }}>
              {hint}
            </Typography>
          </Box>
        )}
      </AnimatePresence>

      <RsvpDialog open={rsvpOpen} onClose={() => setRsvpOpen(false)} />
      <Analytics />
    </Box>
  );
}
