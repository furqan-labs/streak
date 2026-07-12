import { useHabitsStore } from './lib/useHabitsStore';
import { calculateHabitStats } from './lib/streakLogic';
import { HabitCard } from './components/HabitCard';
import { AddHabitForm } from './components/AddHabitForm';

function App() {
  const { habits, addHabit, toggleToday, deleteHabit } = useHabitsStore();

  const bestStreak = habits.reduce((max, h) => {
    const stats = calculateHabitStats(h.checkIns, h.createdAt);
    return Math.max(max, stats.currentStreak);
  }, 0);

  return (
    <div className="bg-warm-gradient min-h-screen">
      <header className="mx-auto max-w-2xl px-6 pt-10 sm:px-8">
        <p className="font-display text-sm font-medium uppercase tracking-wide text-ink-muted">
          {habits.length === 0 ? 'Let\'s build a streak' : `${habits.length} habit${habits.length === 1 ? '' : 's'} tracked`}
        </p>
        <h1 className="mt-1 font-display text-5xl font-bold tracking-tight text-ink">
          Streak {bestStreak > 0 && <span className="text-flame">🔥{bestStreak}</span>}
        </h1>
        <p className="mt-2 max-w-md text-sm text-ink-muted">
          Tap the circle once a day. Watch the flame grow. Everything stays right here in this browser.
        </p>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-8 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} onToggleToday={toggleToday} onDelete={deleteHabit} />
          ))}
        </div>

        <div className="mt-4">
          <AddHabitForm onAdd={addHabit} />
        </div>
      </main>

      <footer className="mx-auto max-w-2xl px-6 pb-10 sm:px-8">
        <p className="font-display text-xs uppercase tracking-wide text-ink-muted">
          Data lives only in this browser — nothing is sent anywhere.
        </p>
      </footer>
    </div>
  );
}

export default App;
