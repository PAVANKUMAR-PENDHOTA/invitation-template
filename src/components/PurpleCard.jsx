import { Box } from '@mui/material';

// Reusable purple rounded card used for most sections
export default function PurpleCard({ children, sx, ...rest }) {
  return (
    <Box
      sx={{
        position: 'relative', width: { xs: '84%', sm: '82%' }, mx: 'auto', color: '#fff',
        background: 'linear-gradient(180deg,#76689d 0%,#6f6196 100%)', borderRadius: '16px', textAlign: 'center', px: { xs: 2.5, sm: 3 }, py: 4,
        boxShadow: '3px 5px 6px rgba(0,0,0,.27)', ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export function CardHeading({ children, sx }) {
  return (
    <Box
      component="h2"
      sx={{
        m: 0, mb: 2.5, fontFamily: '"Tinos", "Times New Roman", serif', fontWeight: 700, fontSize: { xs: 20, sm: 22 },
        letterSpacing: 1, textTransform: 'uppercase', lineHeight: 1.3, ...sx,
      }}
    >
      {children}
    </Box>
  );
}
