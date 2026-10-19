import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Reveal from './Reveal';
import Floral from './Floral';
import { invitation as inv } from '../data/invitation';
import { PURPLE_SOFT } from '../theme';

export default function PhotoGallery() {
  return (
    <Box component="section" id="gallery" sx={{ position: 'relative', pb: 6, textAlign: 'center' }}>
      <Floral name="ghost_roses" sx={{ left: '-20%', top: -40, width: '140%', opacity: 0.9 }} />
      <Reveal>
        <Typography sx={{ position: 'relative', fontFamily: '"Tinos", "Times New Roman", serif', fontWeight: 700, fontSize: 16, letterSpacing: 1, color: PURPLE_SOFT, mb: 2 }}>
          PHOTO GALLERY
        </Typography>
      </Reveal>
      <Reveal delay={0.1} sx={{ position: 'relative' }}>
        <Swiper
          className="polaroid-swiper"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          rewind
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          coverflowEffect={{ rotate: 28, stretch: 0, depth: 110, modifier: 1, slideShadows: false }}
          pagination={{ clickable: true }}
          navigation
        >
          {inv.gallery.map((src, i) => (
            <SwiperSlide key={src}>
              <img src={src} alt={`Gallery photo ${i + 1}`} loading="lazy" draggable={false} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Reveal>
    </Box>
  );
}
