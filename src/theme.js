import { createTheme } from '@mui/material/styles';

export const PURPLE = '#6d6594';
export const PURPLE_DARK = '#5a5280';
export const PURPLE_SOFT = '#8f8bb0';

const theme = createTheme({
  palette: {
    primary: { main: PURPLE, dark: PURPLE_DARK },
    background: { default: '#efeaf5', paper: '#ffffff' },
    text: { primary: '#4a4568', secondary: '#8c88a3' },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Tinos", "Times New Roman", Times, serif',
    h1: { fontFamily: '"Playfair Display", serif' },
    h2: { fontFamily: '"Playfair Display", serif' },
    h3: { fontFamily: '"Playfair Display", serif' },
    h4: { fontFamily: '"Playfair Display", serif' },
    h5: { fontFamily: '"Playfair Display", serif' },
    h6: { fontFamily: '"Playfair Display", serif' },
    button: { textTransform: 'none', letterSpacing: 0.5 },
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 999, boxShadow: 'none' } } },
  },
});

export default theme;
