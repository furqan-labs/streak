import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows the empty state before any habit is added', () => {
    render(<App />);
    expect(screen.getByText(/let's build a streak/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /new habit/i })).toBeInTheDocument();
  });

  it('adds a new habit and shows it as a card', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /new habit/i }));
    await user.type(screen.getByPlaceholderText(/read 10 pages/i), 'Read 10 pages');
    await user.click(screen.getByRole('button', { name: /start tracking/i }));

    expect(screen.getByText('Read 10 pages')).toBeInTheDocument();
  });

  it('checking in today updates the current streak to 1', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /new habit/i }));
    await user.type(screen.getByPlaceholderText(/read 10 pages/i), 'Meditate');
    await user.click(screen.getByRole('button', { name: /start tracking/i }));

    await user.click(screen.getByRole('button', { name: /check in for meditate/i }));

    // The flame indicator's streak count should now read 1
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('persists habits to localStorage', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /new habit/i }));
    await user.type(screen.getByPlaceholderText(/read 10 pages/i), 'Stretch');
    await user.click(screen.getByRole('button', { name: /start tracking/i }));

    const stored = JSON.parse(localStorage.getItem('streak-habits-v1') || '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe('Stretch');
  });
});
