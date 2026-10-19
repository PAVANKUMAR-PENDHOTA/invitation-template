import { useEffect, useState } from 'react';
import {
  Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider,
  Grid, IconButton, InputAdornment, Snackbar, Stack, TextField, Typography, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import { useProfile } from '../context/ProfileContext';
import { socialConfig } from '../data/socials';
import { fileToDataUrl } from '../utils/image';

export default function EditProfileDialog({ open, onClose }) {
  const { profile, setProfile, resetProfile } = useProfile();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [draft, setDraft] = useState(profile);
  const [toast, setToast] = useState('');

  // Refresh the draft whenever the dialog is opened
  useEffect(() => {
    if (open) setDraft(profile);
  }, [open, profile]);

  const set = (field) => (e) => setDraft((d) => ({ ...d, [field]: e.target.value }));
  const setSocial = (key) => (e) =>
    setDraft((d) => ({ ...d, socials: { ...d.socials, [key]: e.target.value } }));

  const onAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const avatar = await fileToDataUrl(file, 500);
    setDraft((d) => ({ ...d, avatar }));
    e.target.value = '';
  };

  const onGallery = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const added = await Promise.all(
      files.map(async (f) => ({ src: await fileToDataUrl(f, 700), caption: f.name.replace(/\.[^.]+$/, '') }))
    );
    setDraft((d) => ({ ...d, gallery: [...d.gallery, ...added] }));
    e.target.value = '';
  };

  const removePhoto = (idx) =>
    setDraft((d) => ({ ...d, gallery: d.gallery.filter((_, i) => i !== idx) }));

  const save = () => {
    setProfile({
      ...draft,
      skills: Array.isArray(draft.skills) ? draft.skills : [],
    });
    setToast('Profile saved!');
    onClose();
  };

  const reset = () => {
    resetProfile();
    setToast('Reset to sample data');
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullScreen={fullScreen} fullWidth maxWidth="md" scroll="paper">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Edit Profile
          <IconButton onClick={onClose} aria-label="close"><CloseIcon /></IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {/* Avatar */}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Avatar src={draft.avatar} sx={{ width: 84, height: 84 }} />
            <Box>
              <Button component="label" variant="outlined" startIcon={<PhotoCameraIcon />} size="small">
                Upload photo
                <input hidden type="file" accept="image/*" onChange={onAvatar} />
              </Button>
              <Typography variant="caption" display="block" sx={{ mt: 0.5, color: 'text.secondary' }}>
                or paste an image URL below
              </Typography>
            </Box>
          </Stack>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Profile image URL" value={draft.avatar.startsWith('data:') ? '' : draft.avatar}
                placeholder={draft.avatar.startsWith('data:') ? '(uploaded image in use)' : ''}
                onChange={set('avatar')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth required label="Full name" value={draft.name} onChange={set('name')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Title / Profession" value={draft.title} onChange={set('title')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Location" value={draft.location} onChange={set('location')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Tagline" value={draft.tagline} onChange={set('tagline')} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline minRows={4} label="Bio" value={draft.bio} onChange={set('bio')} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Skills (comma separated)"
                value={draft.skills.join(', ')}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, skills: e.target.value.split(',').map((s) => s.trimStart()) }))
                }
                onBlur={() =>
                  setDraft((d) => ({ ...d, skills: d.skills.map((s) => s.trim()).filter(Boolean) }))
                }
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }}>Stats</Divider>
          <Grid container spacing={2}>
            {draft.stats.map((s, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Stack direction="row" spacing={1}>
                  <TextField label="Label" value={s.label} size="small"
                    onChange={(e) => setDraft((d) => ({ ...d, stats: d.stats.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)) }))} />
                  <TextField label="Value" type="number" value={s.value} size="small" sx={{ width: 100 }}
                    onChange={(e) => setDraft((d) => ({ ...d, stats: d.stats.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)) }))} />
                </Stack>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 3 }}>Social links (leave empty to hide)</Divider>
          <Grid container spacing={2}>
            {socialConfig.map(({ key, label, Icon, placeholder }) => (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  fullWidth size="small" label={label} placeholder={placeholder}
                  value={draft.socials?.[key] || ''} onChange={setSocial(key)}
                  InputProps={{ startAdornment: (<InputAdornment position="start"><Icon fontSize="small" /></InputAdornment>) }}
                />
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 3 }}>Gallery photos</Divider>
          <Button component="label" variant="outlined" startIcon={<AddPhotoAlternateIcon />} sx={{ mb: 2 }}>
            Add photos
            <input hidden multiple type="file" accept="image/*" onChange={onGallery} />
          </Button>
          <Grid container spacing={1.5}>
            {draft.gallery.map((p, i) => (
              <Grid item xs={4} sm={3} md={2} key={i}>
                <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', aspectRatio: '4 / 5' }}>
                  <Box component="img" src={p.src} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <IconButton size="small" onClick={() => removePhoto(i)}
                    sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(255,255,255,.9)', '&:hover': { bgcolor: '#fff' } }}>
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, justifyContent: 'space-between' }}>
          <Button color="inherit" onClick={reset}>Reset to sample</Button>
          <Box>
            <Button onClick={onClose} sx={{ mr: 1 }}>Cancel</Button>
            <Button variant="contained" onClick={save} disabled={!draft.name.trim()}>Save</Button>
          </Box>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!toast} autoHideDuration={2500} onClose={() => setToast('')} message={toast} />
    </>
  );
}
