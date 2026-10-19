import { useMemo } from 'react';

// Decorative floating petals (pure CSS animation, see index.css)
export default function Petals({ count = 14 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 12,
        duration: 12 + Math.random() * 14,
        delay: -Math.random() * 20,
      })),
    [count]
  );
  return (
    <>
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}
