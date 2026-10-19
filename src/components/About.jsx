import { useEffect, useRef, useState } from 'react';
import { Box, Chip, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { animate, useInView } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';
import Reveal from './Reveal';

function Counter({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, Number(to) || 0, {
      duration: 1.6,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{val}+</span>;
}

export function SectionTitle({ eyebrow, title }) {
  return (
    <Box sx={{ textAlign: 'center', mb: 6 }}>
      <Typography variant="overline" sx={{ letterSpacing: 5, color: 'secondary.main' }}>{eyebrow}</Typography>
      <Typography variant="h3" sx={{ color: 'primary.dark' }}>{title}</Typography>
      <Typography sx={{ color: 'secondary.main', fontSize: 24 }}>❦</Typography>
    </Box>
  );
}

export default function About() {
  const { profile } = useProfile();

  return (
    <Box component="section" id="about" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Reveal><SectionTitle eyebrow="Who I am" title="About Me" /></Reveal>

        <Reveal delay={0.1}>
          <Typography sx={{ textAlign: 'center', fontSize: { xs: 15, md: 17 }, lineHeight: 1.9, color: 'text.secondary', mb: 6 }}>
            {profile.bio}
          </Typography>
        </Reveal>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {profile.stats.map((s, i) => (
            <Grid item xs={12} sm={4} key={s.label}>
              <Reveal delay={0.15 * i}>
                <Paper elevation={0} sx={{ p: 3, textAlign: 'center', border: '1px solid rgba(123,75,183,.15)', borderRadius: 4, transition: '.3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 14px 30px rgba(123,75,183,.18)' } }}>
                  <Typography variant="h3" sx={{ color: 'primary.main' }}><Counter to={s.value} /></Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>{s.label}</Typography>
                </Paper>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        <Reveal delay={0.2}>
          <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={1.2}>
            {profile.skills.map((s) => (
              <Chip key={s} label={s} color="primary" variant="outlined" sx={{ fontSize: 14, px: 0.5 }} />
            ))}
          </Stack>
        </Reveal>
      </Container>
    </Box>
  );
}
