import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Gentle auto-scroll (requestAnimationFrame based).
 *  - starts by itself `startDelay` ms after `enabled` becomes true
 *  - TAP / CLICK anywhere on the page  -> pause;   tap again -> resume   (no button needed)
 *  - mouse wheel, arrow/space keys, swiping or dragging the scrollbar also pause it
 *  - stops at the bottom of the page
 * Taps on interactive things (buttons, links, inputs, carousel arrows, dialogs) do not toggle it.
 */
const INTERACTIVE =
  'button, a, input, textarea, select, label, iframe, [role="button"], [role="dialog"], .MuiDialog-root, .MuiPopover-root, .swiper-button-next, .swiper-button-prev, .swiper-pagination, [data-no-stop]';

export default function useAutoScroll({ enabled, speed = 55, startDelay = 6000 }) {
  const [active, setActive] = useState(false);
  const activeRef = useRef(false);
  const pos = useRef(0);
  const lastT = useRef(0);
  const vel = useRef(0);
  const raf = useRef(0);
  const timer = useRef(0);

  const stop = useCallback(() => {
    activeRef.current = false;
    cancelAnimationFrame(raf.current);
    setActive(false);
  }, []);

  const tick = useCallback(
    (t) => {
      if (!activeRef.current) return;
      const dt = Math.min((t - lastT.current) / 1000, 0.05);
      lastT.current = t;

      // page was moved by something else (swipe / scrollbar drag) -> respect the user
      if (Math.abs(window.scrollY - pos.current) > 4) {
        stop();
        return;
      }
      vel.current = Math.min(speed, vel.current + (speed / 1.2) * dt); // ease-in
      pos.current += vel.current * dt;
      window.scrollTo({ top: pos.current, behavior: 'instant' });

      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (pos.current >= max - 1) {
        stop();
        return;
      }
      raf.current = requestAnimationFrame(tick);
    },
    [speed, stop]
  );

  const start = useCallback(() => {
    if (activeRef.current) return;
    pos.current = window.scrollY;
    vel.current = 0;
    lastT.current = performance.now();
    activeRef.current = true;
    setActive(true);
    raf.current = requestAnimationFrame(tick);
  }, [tick]);

  const toggle = useCallback(() => {
    clearTimeout(timer.current); // a manual tap cancels the pending auto-start
    if (activeRef.current) stop();
    else start();
  }, [start, stop]);

  // automatic start after the intro animation
  useEffect(() => {
    if (!enabled) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    timer.current = setTimeout(start, startDelay);
    return () => clearTimeout(timer.current);
  }, [enabled, start, startDelay]);

  // tap anywhere = pause / resume
  useEffect(() => {
    if (!enabled) return;

    const onClick = (e) => {
      if (e.target?.closest?.(INTERACTIVE)) return;
      if (window.getSelection?.().toString()) return; // user was selecting text
      const ae = document.activeElement;
      if (ae?.matches?.('input, textarea')) { ae.blur(); return; }
      toggle();
    };
    const onWheel = () => { if (activeRef.current) { clearTimeout(timer.current); stop(); } };
    const onKey = (e) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key) && activeRef.current) stop();
    };
    const onFocus = (e) => { if (e.target?.matches?.('input, textarea')) stop(); };

    window.addEventListener('click', onClick);
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('focusin', onFocus);
    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('focusin', onFocus);
      cancelAnimationFrame(raf.current);
    };
  }, [enabled, toggle, stop]);

  return { active, start, stop, toggle };
}
