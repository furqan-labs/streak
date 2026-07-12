interface FlameIndicatorProps {
  streak: number;
}

function tierFor(streak: number): { scale: string; glow: string; label: string } {
  if (streak === 0) return { scale: 'scale-75 opacity-30 grayscale', glow: '', label: 'No streak yet' };
  if (streak < 3) return { scale: 'scale-90', glow: '', label: 'Just started' };
  if (streak < 7) return { scale: 'scale-100', glow: 'drop-shadow-[0_0_6px_rgba(255,90,54,0.4)]', label: 'Warming up' };
  if (streak < 30)
    return {
      scale: 'scale-110',
      glow: 'drop-shadow-[0_0_12px_rgba(255,90,54,0.55)]',
      label: 'On fire',
    };
  return {
    scale: 'scale-125',
    glow: 'drop-shadow-[0_0_18px_rgba(255,90,54,0.7)]',
    label: 'Blazing',
  };
}

export function FlameIndicator({ streak }: FlameIndicatorProps) {
  const tier = tierFor(streak);

  return (
    <div className="flex flex-col items-center" title={tier.label}>
      <span
        className={`inline-block text-4xl transition-transform duration-300 ${tier.scale} ${tier.glow} ${
          streak > 0 ? 'animate-flicker' : ''
        }`}
        aria-hidden
      >
        🔥
      </span>
      <span className="font-display text-2xl font-semibold leading-none text-ink">{streak}</span>
    </div>
  );
}
