import { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItemButton,
  ListItemText, Box, useScrollTrigger, useMediaQuery, Tooltip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import { useProfile } from '../context/ProfileContext';
import { scrollToId } from '../utils/image';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'connect', label: 'Connect' },
];

export default function NavBar({ onEdit }) {
  const { profile } = useProfile();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 30 });
  const [open, setOpen] = useState(false);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), 150);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? 'rgba(251,247,255,0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          color: 'text.primary',
          borderBottom: scrolled ? '1px solid rgba(123,75,183,0.15)' : '1px solid transparent',
          transition: 'all .3s ease',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            onClick={() => go('home')}
            sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, cursor: 'pointer', color: 'primary.dark' }}
          >
            {profile.name.split(' ')[0]} ❦
          </Typography>

          {isMobile ? (
            <Box>
              <Tooltip title="Edit profile">
                <IconButton onClick={onEdit} color="primary"><EditIcon /></IconButton>
              </Tooltip>
              <IconButton onClick={() => setOpen(true)} aria-label="menu"><MenuIcon /></IconButton>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {links.map((l) => (
                <Button key={l.id} color="inherit" onClick={() => go(l.id)} sx={{ px: 2 }}>
                  {l.label}
                </Button>
              ))}
              <Button variant="outlined" startIcon={<EditIcon />} onClick={onEdit} sx={{ ml: 1 }}>
                Edit Profile
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 240, pt: 2 }}>
          <List>
            {links.map((l) => (
              <ListItemButton key={l.id} onClick={() => go(l.id)}>
                <ListItemText primary={l.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
