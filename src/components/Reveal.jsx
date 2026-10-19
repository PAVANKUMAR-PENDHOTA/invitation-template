import { motion } from 'framer-motion';

// Fade + slide in when the element scrolls into view
export default function Reveal({ children, delay = 0, y = 40, x = 0, sx, ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={sx}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
