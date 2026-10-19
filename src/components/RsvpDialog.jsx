import { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography,
} from '@mui/material';
import { invitation as inv } from '../data/invitation';
import { PURPLE } from '../theme';

const KEY = 'invitation-rsvps-v1';

export default function RsvpDialog({ open, onClose }) {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('yes');
  const [guests, setGuests] = useState(1);
  const [done, setDone] = useState(false);

  const submit = () => {
    const entry = { name: name.trim(), attending, guests, at: new Date().toISOString() };
    try {
      const all = JSON.parse(localStorage.getItem(KEY) || '[]');
      localStorage.setItem(KEY, JSON.stringify([...all, entry]));
    } catch { /* ignore */ }

    if (inv.whatsapp) {
      const text = `Hi! This is ${entry.name}. ${attending === 'yes' ? `I will attend with ${guests} guest(s)` : 'Sorry, I cannot attend'} - ${inv.groomShort} & ${inv.brideShort} engagement.`;
      window.open(`https://wa.me/${inv.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
    }
    setDone(true);
  };

  const close = () => { onClose(); setTimeout(() => { setDone(false); setName(''); }, 300); };

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontFamily: '"Tinos", "Times New Roman", serif', color: PURPLE, textAlign: 'center' }}>
        {done ? 'Thank you! 💜' : 'Confirm Attendance'}
      </DialogTitle>
      <DialogContent>
        {done ? (
          <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
            Your response has been recorded. We can't wait to celebrate with you!
          </Typography>
        ) : (
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <TextField label="Your name" required value={name} onChange={(e) => setName(e.target.value)} fullWidth />
            <ToggleButtonGroup exclusive fullWidth value={attending} onChange={(_, v) => v && setAttending(v)} color="primary">
              <ToggleButton value="yes">Joyfully accept</ToggleButton>
              <ToggleButton value="no">Regretfully decline</ToggleButton>
            </ToggleButtonGroup>
            {attending === 'yes' && (
              <TextField select label="Number of guests" value={guests} onChange={(e) => setGuests(Number(e.target.value))} fullWidth>
                {[1, 2, 3, 4, 5].map((n) => <MenuItem key={n} value={n}>{n}</MenuItem>)}
              </TextField>
            )}
          </Stack>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={close} color="inherit">{done ? 'Close' : 'Cancel'}</Button>
        {!done && <Button variant="contained" onClick={submit} disabled={!name.trim()} sx={{ bgcolor: PURPLE }}>Send</Button>}
      </DialogActions>
    </Dialog>
  );
}
