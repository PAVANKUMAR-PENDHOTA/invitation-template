import { useEffect, useState } from 'react';
import { Box, Button, ClickAwayListener, IconButton, Paper, TextField, Typography } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Reveal from './Reveal';
import { invitation as inv } from '../data/invitation';
import { PURPLE, PURPLE_SOFT } from '../theme';

const KEY = 'invitation-guestbook-v1';
const EMOJIS = ['❤️', '🎉', '🥰', '🙏', '🌹', '💐', '✨', '😍', '👏', '🥂', '💜', '😊'];

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (Array.isArray(raw)) return raw;
  } catch { /* ignore */ }
  return inv.seedWishes;
}

export default function Guestbook() {
  const [wishes, setWishes] = useState(load);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [emojiOpen, setEmojiOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(wishes)); } catch { /* ignore */ }
  }, [wishes]);

  const send = () => {
    if (!name.trim() || !message.trim()) return;
    setWishes((w) => [{ name: name.trim(), message: message.trim(), at: new Date().toISOString() }, ...w]);
    setName(''); setMessage(''); setEmojiOpen(false);
  };

  const fieldSx = {
    '& .MuiOutlinedInput-root': { fontSize: 12, bgcolor: '#fff', '& fieldset': { borderColor: PURPLE } },
    '& input, & textarea': { color: '#6b6785' },
  };

  return (
    <Box component="section" id="guestbook" sx={{ pb: 4 }}>
      <Reveal>
        <Paper elevation={0} sx={{ width: { xs: '86%', sm: '84%' }, mx: 'auto', p: 3, pb: 2, borderRadius: '12px', boxShadow: '0 10px 26px rgba(60,50,100,.22)' }}>
          <Typography component="h2" sx={{ fontFamily: '"Tinos", "Times New Roman", serif', fontWeight: 700, fontSize: 18, letterSpacing: 1, color: PURPLE_SOFT, textAlign: 'center', mb: 2 }}>
            GUESTBOOK
          </Typography>

          <TextField fullWidth size="small" placeholder="Enter your name*" value={name} onChange={(e) => setName(e.target.value)} sx={{ ...fieldSx, mb: 1.5 }} />
          <TextField fullWidth multiline minRows={3} placeholder="Enter your wishes*" value={message} onChange={(e) => setMessage(e.target.value)} sx={fieldSx} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.2, position: 'relative' }}>
            <ClickAwayListener onClickAway={() => setEmojiOpen(false)}>
              <Box sx={{ position: 'relative' }}>
                <IconButton size="small" onClick={() => setEmojiOpen((o) => !o)} aria-label="emoji" sx={{ color: PURPLE_SOFT }}>
                  <SentimentSatisfiedAltIcon fontSize="small" />
                </IconButton>
                {emojiOpen && (
                  <Paper sx={{ position: 'absolute', bottom: 38, left: 0, zIndex: 5, p: 1, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0.5, boxShadow: '0 8px 24px rgba(0,0,0,.2)' }}>
                    {EMOJIS.map((e) => (
                      <Box key={e} component="button" type="button" onClick={() => setMessage((m) => m + e)}
                        sx={{ border: 0, bgcolor: 'transparent', fontSize: 20, cursor: 'pointer', borderRadius: 1, '&:hover': { bgcolor: '#f0ecf8' } }}>
                        {e}
                      </Box>
                    ))}
                  </Paper>
                )}
              </Box>
            </ClickAwayListener>

            <Button variant="contained" onClick={send} disabled={!name.trim() || !message.trim()}
              sx={{ bgcolor: PURPLE, fontSize: 11, letterSpacing: 1, px: 2.5, borderRadius: '6px', textTransform: 'uppercase', '&:hover': { bgcolor: '#5a5280' } }}>
              Send wishes
            </Button>
          </Box>

          <Box sx={{ mt: 2, maxHeight: 330, overflowY: 'auto', pr: 0.5, display: 'flex', flexDirection: 'column', gap: 1.2 }}>
            {wishes.map((w, i) => (
              <Box key={`${w.at}-${i}`} sx={{ border: '1px solid #e1ddee', borderRadius: '8px', p: 1.3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: PURPLE_SOFT }}>{w.name}</Typography>
                  <Typography sx={{ fontSize: 9, color: '#b4b0c8', whiteSpace: 'nowrap' }}>
                    {new Date(w.at).toLocaleString('en-US')}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 11.5, color: '#8c88a3', mt: 0.5, wordBreak: 'break-word' }}>{w.message}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Reveal>
    </Box>
  );
}
