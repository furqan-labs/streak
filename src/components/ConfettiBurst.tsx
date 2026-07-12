import { useMemo } from 'react';

interface ConfettiBurstProps {
  triggerKey: number;
}

const PARTICLE_COLORS = ['#FF5A36', '#2F8FFF', '#9C4DFF', '#14B87F', '#FFB800'];

export function ConfettiBurst({ triggerKey }: ConfettiBurstProps) {
  const particles = useMemo(() => {
    if (triggerKey === 0) return [];
    return Array.from({ length: 14 }, (_, i) => {
      const angle = (i / 14) * Math.PI * 2 + Math.random() * 0.4;
      const distance = 28 + Math.random() * 24;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance * 0.6 - 10,
        color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
        delay: Math.random() * 0.12,
        rotate: Math.random() * 360,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerKey]);

  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
      {particles.map((p) => (
        <span
          key={`${triggerKey}-${p.id}`}
          className="animate-confetti absolute left-1/2 top-1/2 block h-2 w-2 rounded-sm"
          style={{
            backgroundColor: p.color,
            transform: `translate(${p.x}px, ${p.y}px) rotate(${p.rotate}deg)`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
