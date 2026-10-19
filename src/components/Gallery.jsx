import { Box, Container, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useProfile } from '../context/ProfileContext';
import Reveal from './Reveal';
import { SectionTitle } from './About';

export default function Gallery() {
  const { profile } = useProfile();
  const photos = profile.gallery;

  return (
    <Box component="section" id="gallery" sx={{ py: { xs: 8, md: 12 }, background: 'linear-gradient(180deg,#fbf7ff,#f3e9ff)' }}>
      <Container maxWidth="lg">
        <Reveal><SectionTitle eyebrow="Moments" title="Gallery" /></Reveal>

        {photos.length === 0 ? (
          <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
            No photos yet. Click “Edit Profile” to add some.
          </Typography>
        ) : (
          <Reveal delay={0.1}>
            <Swiper
              className="gallery-swiper"
              modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView="auto"
              loop={photos.length > 4}
              autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }}
              coverflowEffect={{ rotate: 30, stretch: 0, depth: 120, modifier: 1, slideShadows: false }}
              pagination={{ clickable: true }}
              navigation
              key={photos.length}
            >
              {photos.map((p, i) => (
                <SwiperSlide key={`${p.src.slice(0, 40)}-${i}`}>
                  <img src={p.src} alt={p.caption || `Photo ${i + 1}`} loading="lazy" />
                </SwiperSlide>
              ))}
            </Swiper>
          </Reveal>
        )}
      </Container>
    </Box>
  );
}
