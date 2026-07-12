import { useState } from 'react';
import { EMOJI_OPTIONS } from '../lib/colors';

interface AddHabitFormProps {
  onAdd: (name: string, emoji: string) => void;
}

export function AddHabitForm({ onAdd }: AddHabitFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState(EMOJI_OPTIONS[0]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name, emoji);
    setName('');
    setEmoji(EMOJI_OPTIONS[0]);
    setIsOpen(false);
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-center rounded-3xl border-2 border-dashed border-ink/20
                   py-8 font-display text-base font-medium text-ink-muted transition-colors hover:border-ink/40 hover:text-ink"
      >
        + New habit
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border-2 border-ink/10 bg-white/70 p-5">
      <label className="mb-1.5 block font-display text-sm font-medium text-ink">What do you want to track?</label>
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Read 10 pages, Meditate, No smoking"
        className="w-full rounded-xl border border-ink/15 bg-cream px-3 py-2 text-sm text-ink
                   placeholder:text-ink-muted focus:outline-none focus:border-ink/40"
      />

      <p className="mb-1.5 mt-3 font-display text-sm font-medium text-ink">Pick an icon</p>
      <div className="flex flex-wrap gap-1.5">
        {EMOJI_OPTIONS.map((e) => (
          <button
            key={e}
            type="button"
            onClick={() => setEmoji(e)}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-lg transition-transform
              ${emoji === e ? 'bg-ink/10 scale-110' : 'hover:bg-ink/5'}`}
          >
            {e}
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="rounded-full bg-ink px-4 py-2 font-display text-sm font-medium text-cream"
        >
          Start tracking
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded-full px-4 py-2 font-display text-sm font-medium text-ink-muted"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
