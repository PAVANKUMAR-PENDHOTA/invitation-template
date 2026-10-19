import { Box, Button, Typography } from '@mui/material';
import PurpleCard, { CardHeading } from './PurpleCard';
import Calendar from './Calendar';
import Floral from './Floral';
import Reveal from './Reveal';
import { invitation as inv } from '../data/invitation';
import { PURPLE } from '../theme';

function downloadIcs() {
  const { year, month, day } = inv.date;
  const [h, m] = inv.time.split(':').map(Number);
  const pad = (n) => String(n).padStart(2, '0');
  const start = `${year}${pad(month)}${pad(day)}T${pad(h)}${pad(m)}00`;
  const end = `${year}${pad(month)}${pad(day)}T${pad(Math.min(h + 5, 23))}${pad(m)}00`;
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Invitation//EN', 'BEGIN:VEVENT',
    `DTSTART:${start}`, `DTEND:${end}`,
    `SUMMARY:${inv.groomShort} & ${inv.brideShort} - ${inv.ceremonyTitle}`,
    `LOCATION:${inv.venue.address.replace(/,/g, '\\,')}`, 'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  const a = document.createElement('a');
  a.href = url; a.download = 'engagement.ics'; a.click();
  URL.revokeObjectURL(url);
}

export default function PartyInfo({ onConfirm }) {
  const { year, month, day } = inv.date;
  const dt = new Date(year, month - 1, day);
  const weekday = dt.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const monthName = dt.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();

  return (
    <Box component="section" id="info" sx={{ position: 'relative', pb: 5, textAlign: 'center' }}>
      <Floral name="ghost_roses" flip sx={{ right: '-30%', top: -80, width: '120%', opacity: 0.8 }} />
      <Reveal>
        <PurpleCard sx={{ overflow: 'visible', pb: 3.5 }}>
          <CardHeading>{inv.partyTitle}</CardHeading>
          <Typography sx={{ fontFamily: '"Tinos", "Times New Roman", serif', fontWeight: 700, fontSize: 13, letterSpacing: 0.5, mb: 1.5 }}>
            THE ENGAGEMENT PARTY WILL TAKE PLACE AT:
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, fontSize: 11, opacity: 0.9, mb: 0.5 }}>
            <span>{inv.time}</span><span>{weekday}</span>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
            <Typography sx={{ fontFamily: '"Tinos", "Times New Roman", serif', fontSize: 44, lineHeight: 1 }}>{String(day).padStart(2, '0')}</Typography>
            <Box sx={{ width: '1px', height: 36, bgcolor: 'rgba(255,255,255,.7)' }} />
            <Box sx={{ textAlign: 'left', fontSize: 11, letterSpacing: 1, lineHeight: 1.5 }}>
              {monthName}<br /><span style={{ fontSize: 15 }}>{year}</span>
            </Box>
          </Box>

          <Box sx={{ width: '82%', mx: 'auto' }}>
            <Calendar year={year} month={month} highlight={day} />
          </Box>

          <Button
            onClick={downloadIcs}
            sx={{ color: '#fff', textDecoration: 'underline', fontSize: 12, mt: 2, '&:hover': { textDecoration: 'underline', bgcolor: 'transparent' } }}
          >
            Add to Calendar
          </Button>

          <Floral name="bouquet_side" sx={{ left: '-30%', bottom: '-4%', width: '43%' }} />
        </PurpleCard>
      </Reveal>

      <Reveal delay={0.1}>
        <Button
          variant="contained" onClick={onConfirm}
          sx={{ mt: 3, bgcolor: PURPLE, fontSize: 11, letterSpacing: 1, px: 3.5, textTransform: 'uppercase', '&:hover': { bgcolor: '#5a5280' } }}
        >
          Confirm Attendance
        </Button>
      </Reveal>
    </Box>
  );
}
