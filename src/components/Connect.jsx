import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';
import { socialConfig } from '../data/socials';
import Reveal from './Reveal';
import { SectionTitle } from './About';

export default function Connect() {
  const { profile } = useProfile();
  const active = socialConfig.filter((s) => profile.socials?.[s.key]);

  return (
    <Box component="section" id="connect" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Reveal><SectionTitle eyebrow="Let's talk" title="Connect With Me" /></Reveal>

        {active.length === 0 ? (
          <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
            No social links yet. Click “Edit Profile” to add them.
          </Typography>
        ) : (
          <Grid container spacing={2.5} justifyContent="center">
            {active.map(({ key, label, Icon, color, href }, i) => (
              <Grid item xs={6} sm={4} md={3} key={key}>
                <Reveal delay={0.07 * i} y={30}>
                  <Paper
                    component={motion.a}
                    whileHover={{ y: -8, scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    href={href(profile.socials[key])}
                    target="_blank"
                    rel="noopener noreferrer"
                    elevation={0}
                    sx={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
                      py: 3, textDecoration: 'none', color: 'text.primary',
                      border: '1px solid rgba(123,75,183,.15)', borderRadius: 4,
                      '&:hover': { boxShadow: `0 14px 30px ${color}33`, borderColor: color },
                    }}
                  >
                    <Box sx={{ width: 56, height: 56, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: `${color}1a`, color }}>
                      <Icon fontSize="large" />
                    </Box>
                    <Typography variant="body2" fontWeight={500}>{label}</Typography>
                  </Paper>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
