"use client";

import { motion } from "framer-motion";
import { RefObject, useEffect, useRef } from "react";

type CursorBlobProps = {
  containerRef: RefObject<HTMLElement | null>;
};

const TRAIL_COUNT = 6;

export function CursorBlob({ containerRef }: CursorBlobProps) {
  const coreRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    const previous = { ...target };
    const trail = Array.from({ length: TRAIL_COUNT }, () => ({ ...target }));
    let visible = false;
    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      visible = true;
    };

    const onPointerLeave = () => {
      visible = false;
    };

    const render = () => {
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;

      const velocityX = current.x - previous.x;
      const velocityY = current.y - previous.y;
      const speed = Math.min(Math.hypot(velocityX, velocityY), 42);
      const angle = Math.atan2(velocityY, velocityX);
      const stretch = 1 + speed * 0.018;
      const squash = 1 - Math.min(speed * 0.004, 0.18);
      const opacity = visible ? 1 : 0;

      if (coreRef.current) {
        coreRef.current.style.opacity = `${opacity}`;
        coreRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) rotate(${angle}rad) scale(${stretch}, ${squash})`;
      }

      trail.forEach((point, index) => {
        const leader = index === 0 ? current : trail[index - 1];
        point.x += (leader.x - point.x) * (0.2 - index * 0.018);
        point.y += (leader.y - point.y) * (0.2 - index * 0.018);

        const element = trailRefs.current[index];

        if (element) {
          const scale = 1 - index * 0.09;
          element.style.opacity = `${visible ? 0.2 - index * 0.026 : 0}`;
          element.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        }
      });

      previous.x = current.x;
      previous.y = current.y;
      frame = requestAnimationFrame(render);
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave);
    frame = requestAnimationFrame(render);

    return () => {
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(frame);
    };
  }, [containerRef]);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 hidden mix-blend-difference md:block">
      {Array.from({ length: TRAIL_COUNT }).map((_, index) => (
        <div
          key={index}
          ref={(node) => {
            trailRefs.current[index] = node;
          }}
          className="absolute left-0 top-0 h-16 w-16 rounded-full bg-white opacity-0 blur-xl will-change-transform"
        />
      ))}
      <motion.div
        ref={coreRef}
        initial={{ opacity: 0 }}
        className="absolute left-0 top-0 h-12 w-12 rounded-full border border-white/70 bg-white/20 shadow-[0_0_40px_rgba(255,255,255,0.7)] backdrop-blur-sm will-change-transform"
      />
    </div>
  );
}
