import { Box } from '@mui/material';

// Decorative artwork from /public/images/<name>.svg
// names: corner_tl, edge_right, bouquet_side, corner_small, corner_br,
//        footer_border, botanical, ghost_roses, mansion
export default function Floral({ name, flip = false, flipY = false, sx }) {
  return (
    <Box
      component="img"
      src={`/images/${name}.svg`}
      alt=""
      aria-hidden
      draggable={false}
      sx={{
        position: 'absolute',
        pointerEvents: 'none',
        userSelect: 'none',
        transform: `scale(${flip ? -1 : 1}, ${flipY ? -1 : 1})`,
        ...sx,
      }}
    />
  );
}
