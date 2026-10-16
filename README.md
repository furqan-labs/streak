# Streak

A playful, animated habit tracker: tap a circle once a day, watch a flame grow with your streak, and see your history as a GitHub-style heatmap. Built to show a different design register than the rest of this portfolio — bold color, motion, and celebration instead of muted/corporate UI.

**Live demo:** https://furqan-labs.github.io/streak/

## Features

- **One-tap check-ins** with a confetti burst on completion
- **Growing flame indicator** — visually escalates from an ember to a full blaze as your streak lengthens
- **Heatmap calendar** per habit, styled like GitHub's contribution graph
- **Multiple habits**, each with its own color and icon
- **Stats**: current streak, longest streak ever, completion rate
- **Persistence** via `localStorage` — no account, no backend
- **Tested**: streak/longest-streak/completion-rate math and the heatmap grid are pure functions with full unit test coverage, independent of the UI
- **CI/CD**: every push to `main` runs the test suite and deploys to GitHub Pages automatically

## Tech stack

React 19, TypeScript, Vite, Tailwind CSS v4, Vitest + Testing Library.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
```

```bash
npm test          # 32 tests
npm run build
```

## Design notes

Streak logic is the trickiest part of any habit tracker to get right — off-by-one errors around "is the streak still alive if I haven't checked in *today* yet" are easy to introduce. `src/lib/streakLogic.ts` and `src/lib/date.ts` are pure functions with no DOM or timezone-UTC pitfalls (dates are handled as local `YYYY-MM-DD` keys throughout), which is what makes it possible to unit test edge cases like month/year rollovers, gaps, and duplicate check-ins directly.

Visually, this project deliberately breaks from the calmer, muted aesthetics used elsewhere in this portfolio: warm cream background, bold flat habit colors, a rounded display font, and small celebratory animations (flame flicker, confetti, pop-in) on interaction.

## License

MIT
