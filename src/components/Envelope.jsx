import { Box } from '@mui/material';
import { invitation as inv } from '../data/invitation';

/**
 * Closed envelope -> flap opens -> lime card slides out -> flower bouquet blooms out of the pocket.
 * All motion is plain CSS (see "envelope animation" in index.css) and starts when `play` is true.
 */
export default function Envelope({ play }) {
  return (
    <Box className={`env-wrap${play ? ' play' : ''}`} sx={{ width: { xs: 275, sm: 300 }, mx: 'auto', position: 'relative', zIndex: 3 }}>
      <svg viewBox="0 -70 440 480" style={{ width: '100%', overflow: 'visible', display: 'block' }}>
        <defs>
          <linearGradient id="pocket" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7d6ca6" /><stop offset="1" stopColor="#5b4a86" />
          </linearGradient>
          <linearGradient id="pocketL" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6a5898" /><stop offset="1" stopColor="#7a69a5" />
          </linearGradient>
          <linearGradient id="flapG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6c5a9a" /><stop offset="1" stopColor="#85749f" />
          </linearGradient>
          <radialGradient id="wax" cx="35%" cy="28%" r="85%">
            <stop offset="0" stopColor="#f4dfae" /><stop offset=".5" stopColor="#cf9f5c" /><stop offset="1" stopColor="#97692f" />
          </radialGradient>
          <pattern id="lace" width="9" height="9" patternUnits="userSpaceOnUse">
            <circle cx="4.5" cy="4.5" r="2" fill="#9c8cc6" opacity=".55" />
          </pattern>
          <clipPath id="envClip"><rect x="-120" y="-140" width="700" height="510" /></clipPath>
          <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#2a1f4d" floodOpacity=".35" />
          </filter>
        </defs>

        {/* open flap (behind the card) – lace-textured inside */}
        <g className="flap-open">
          <path d="M40 172 L220 50 L400 172Z" fill="#4c3d78" />
          <path d="M40 172 L220 50 L400 172Z" fill="url(#lace)" />
          <path d="M40 172 L220 50 L400 172" fill="none" stroke="#8a79b8" strokeOpacity=".6" strokeWidth="2" />
        </g>

        {/* back of the pocket */}
        <rect x="40" y="170" width="360" height="200" fill="#4a3b76" />

        {/* ---- lime card that slides out ---- */}
        <g clipPath="url(#envClip)">
        <g className="card-slide">
          <g transform="rotate(-9 225 110)" filter="url(#cardShadow)">
            <rect x="118" y="-34" width="214" height="330" fill="#f3fadb" stroke="#ffffff" strokeWidth="8" strokeLinejoin="round" />
            <image href="/images/card_flowers.svg" x="124" y="-28" width="118" height="105" />
            <text x="226" y="132" textAnchor="middle" fontFamily="'Kaushan Script','Brush Script MT',cursive" fontSize="80" fill="#050505" stroke="#050505" strokeWidth="2.6" strokeLinejoin="round" transform="rotate(-6 226 132)">
              {inv.hashtag}
            </text>
            {/* sparkles */}
            <g fill="none" stroke="#222" strokeWidth="1.3" strokeLinecap="round">
              <path d="M292 8 q2 10 12 12 q-10 2 -12 12 q-2 -10 -12 -12 q10 -2 12 -12Z" />
              <path d="M312 30 q1 5 6 6 q-5 1 -6 6 q-1 -5 -6 -6 q5 -1 6 -6Z" />
              <path d="M150 205 q4 -12 14 -4 q10 -8 12 4 q-8 10 -13 14 q-9 -6 -13 -14Z" />
            </g>
          </g>
        </g>

        {/* ---- bouquet blooming out of the pocket ---- */}
        <g className="bq">
          <g className="bq-sway">
            <image href="/images/env_bouquet.svg" x="158" y="30" width="330" height="309" />
          </g>
        </g>
        </g>

        {/* pocket front (V fold) */}
        <path d="M40 170 L220 288 L400 170 L400 362 Q400 370 392 370 L48 370 Q40 370 40 362Z" fill="url(#pocket)" />
        <path d="M40 170 L220 288 L40 370Z" fill="url(#pocketL)" opacity=".55" />
        <path d="M40 370 L220 288 L400 370" fill="none" stroke="#9a8bc2" strokeOpacity=".45" strokeWidth="1.6" />
        <path d="M40 170 L220 288 L400 170" fill="none" stroke="#a79ac9" strokeOpacity=".5" strokeWidth="1.6" />
        <rect x="40" y="170" width="360" height="200" rx="3" fill="none" stroke="#3e305f" strokeOpacity=".25" />

        {/* closed flap that folds open */}
        <g className="flap-closed">
          <path d="M40 170 L400 170 L220 288Z" fill="url(#flapG)" stroke="#9a8bc2" strokeOpacity=".5" strokeWidth="1.6" />
        </g>

        {/* wax seal */}
        <g className="seal">
          <path d="M220 252 q9 -2 14 4 q9 0 12 8 q8 4 5 13 q5 8 -2 14 q-1 9 -10 11 q-5 8 -14 6 q-8 6 -15 0 q-9 2 -14 -6 q-9 -2 -10 -11 q-7 -6 -2 -14 q-3 -9 5 -13 q3 -8 12 -8 q5 -6 14 -4Z" fill="url(#wax)" stroke="#8a5f2a" strokeOpacity=".55" />
          <circle cx="220" cy="285" r="22" fill="none" stroke="#f6e5bb" strokeOpacity=".65" strokeWidth="2" />
          <path d="M220 303 C196 285 200 268 211 268 C216 268 219 271 220 274 C221 271 224 268 229 268 C240 268 244 285 220 303Z" fill="none" stroke="#7c5420" strokeWidth="3" strokeLinejoin="round" />
          <path d="M214 280 q6 5 6 14" fill="none" stroke="#7c5420" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
    </Box>
  );
}
