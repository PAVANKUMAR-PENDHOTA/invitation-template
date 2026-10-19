import { Box, Typography } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PurpleCard, { CardHeading } from './PurpleCard';
import Floral from './Floral';
import Reveal from './Reveal';
import { invitation as inv } from '../data/invitation';

const icons = { bell: NotificationsNoneIcon, music: MusicNoteIcon, rings: DiamondOutlinedIcon, food: RestaurantIcon };

export default function Schedule() {
  return (
    <Box component="section" id="schedule" sx={{ position: 'relative', pb: 5, mt: '-8%', zIndex: 2 }}>
      <Reveal>
        <PurpleCard sx={{ overflow: 'visible', textAlign: 'left' }}>
          <CardHeading sx={{ textAlign: 'center' }}>Engagement Day Schedule</CardHeading>

          <Box sx={{ position: 'relative', mx: 'auto', maxWidth: 270 }}>
            {/* vertical timeline line */}
            <Box sx={{ position: 'absolute', left: 90, top: 12, bottom: 12, width: '1px', bgcolor: 'rgba(255,255,255,.85)' }} />
            {inv.schedule.map((s, i) => {
              const Icon = icons[s.icon] || NotificationsNoneIcon;
              return (
                <Box key={s.time} sx={{ display: 'grid', gridTemplateColumns: '34px 56px 24px 1fr', alignItems: 'center', py: 1.6 }}>
                  <Icon sx={{ fontSize: 18, opacity: 0.85 }} />
                  <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{s.time}</Typography>
                  <Box sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: '#fff', position: 'relative', zIndex: 1, ml: '-4px' }} />
                  <Typography sx={{ fontSize: 12.5 }}>{s.text}</Typography>
                </Box>
              );
            })}
          </Box>

          <Floral name="bouquet_side" flip sx={{ right: '-24%', bottom: '-5%', width: '42%' }} />
        </PurpleCard>
      </Reveal>
    </Box>
  );
}
