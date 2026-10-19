import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { PURPLE } from '../theme';

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

// Monday-first month grid with the event day shown inside a heart
export default function Calendar({ year, month, highlight }) {
  const first = new Date(year, month - 1, 1);
  const offset = (first.getDay() + 6) % 7; // Monday = 0
  const total = new Date(year, month, 0).getDate();
  const cells = [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
  const monthName = first.toLocaleDateString('en-US', { month: 'long' });

  return (
    <Box sx={{ bgcolor: '#fff', borderRadius: '10px', color: '#8c88a3', p: { xs: 1.5, sm: 2 }, mx: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,.12)' }}>
      <Typography sx={{ fontFamily: '"Great Vibes", cursive', fontSize: 24, color: PURPLE, textAlign: 'center', mb: 1 }}>
        {monthName} {year}
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', rowGap: 0.4, textAlign: 'center', borderTop: '1px solid #e6e2f0' }}>
        {DAYS.map((d) => (
          <Typography key={d} sx={{ fontSize: 10, color: '#b4b0c8', py: 0.8, borderBottom: '2px solid #8c88a3' }}>{d}</Typography>
        ))}
        {cells.map((d, i) => (
          <Box key={i} sx={{ position: 'relative', height: 30, display: 'grid', placeItems: 'center', fontSize: 11 }}>
            {d === highlight ? (
              <>
                <FavoriteIcon sx={{ position: 'absolute', fontSize: 30, color: PURPLE }} />
                <Box component="span" sx={{ position: 'relative', color: '#fff', fontSize: 10, fontWeight: 600 }}>{d}</Box>
              </>
            ) : (
              d
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
