# i-want-a-movie

## Stack
- **React 19** + **Vite 8** + **Tailwind CSS 4** + **React Router v8**
- **JSX only** — no TypeScript
- **React Compiler** enabled (via `babel-plugin-react-compiler` in vite config)
- **oxlint** for linting (not eslint) — run `npm run lint`
- No test framework configured

## Key conventions
- React Router v8 uses the `react-router` package (not `react-router-dom`).
- `BrowserRouter` in `main.jsx`. Routes live in `App.jsx` with `Suspense` + `lazy()`.
- Tailwind: `@import "tailwindcss"` in `index.css`. No custom CSS files. All styling via utility classes.
- TMDB API key from env: `import.meta.env.VITE_TMDB_API_KEY` (stored in `.env` — gitignored).

## Commands
| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | oxlint |
| `npm run preview` | Preview production build |

## Architecture
- `src/services/tmdb.js` — TMDB API client (`/search/multi`, `/{type}/{id}`, image URL helper)
- `src/pages/` — Route-level page components (`Home`, `Detail`)
- `src/components/` — Reusable UI (`SearchBar`, `ResultCard`, `Pagination`, `Image`)
- `src/hooks/` — Custom hooks (`useDebounce`)
- Routes: `/` (search + results), `/:type/:id` (detail; type=`movie`|`tv`)

## Gotchas
- TMDB poster images: `https://image.tmdb.org/t/p/w500{path}`. Handle null `poster_path` with fallback.
- `/search/multi` returns mixed `media_type` (`movie`, `tv`, `person`) — filter or badge accordingly.
- `.env` file is gitignored. Never commit API keys.
