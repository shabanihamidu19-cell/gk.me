# Sprout Tracker

A calm botanical habit tracker.

Track daily habits, goals, focus sessions, screen time, and reflections in a gentle, plant-inspired interface. Built for consistency without pressure.

## Features

- **Today** — See what's scheduled, mark habits done, and stay on track
- **Progress** — Streaks, completion rates, and day archives
- **Goals** — Group habits under meaningful intentions
- **Focus** — Timed deep-work / focus sessions
- **Screen time** — Log and review time spent on devices
- **Reflections** — Mood and end-of-day notes
- **Settings** — Reminders, goals, and preferences

Habits support flexible frequencies: every day, weekdays, selected days, X times per week, or once a week. Each habit can have a "why", a minimum version (the smallest version that still counts), an icon, and a color.

Data lives in the browser (local storage / client state) for a lightweight, private experience.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | [TanStack Start](https://tanstack.com/start) + React 19 |
| Routing | TanStack Router |
| Styling | Tailwind CSS v4 + Radix UI primitives |
| State | Zustand |
| Forms / validation | React Hook Form + Zod |
| Build | Vite 8 |
| Deploy | Vercel (Nitro preset) |

Optional platform pieces (auth, Postgres / PGLite, app-data connectors) are wired in the template but not required for the core tracker.

## Getting started

```bash
# Clone
git clone https://github.com/shabanihamidu19-cell/gk.me.git
cd gk.me

# Install dependencies
npm install

# Run the dev server (listens on 0.0.0.0:8080)
npm run dev
```

Open the app in your browser at the address shown by Vite (typically `http://localhost:8080`).

### Useful scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Production build (+ DB migrate if configured) |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm test` | Run tests |

## Project structure (high level)

```
src/
  components/
    sprout/          # App shell and views (Today, Progress, Goals, Focus, Settings)
    ui/              # Shared UI primitives
  lib/
    sprout/          # Domain types, store, automation, export
    auth/            # Optional auth helpers
    app-data/        # Optional connector helpers
  routes/            # TanStack file-based routes
  styles.css
```

## License

Private / personal project unless otherwise stated.
