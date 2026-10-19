import { useMemo } from 'react';

// Floating snow-flower particles on the purple cover background
export default function Sparkles({ count = 22 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 12,
        dur: 14 + Math.random() * 14,
        delay: -Math.random() * 24,
        drift: (Math.random() - 0.5) * 80,
      })),
    [count]
  );
  return (
    <>
      {items.map((p) => (
        <span
          key={p.id}
          className="sparkle"
          style={{
            left: `${p.left}%`,
            fontSize: p.size,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            '--drift': `${p.drift}px`,
          }}
        >
          ✻
        </span>
      ))}
    </>
  );
}
