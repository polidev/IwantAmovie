# Architecture

## Overview

A single-page movie/series search app built with React 19, Vite 8, and Tailwind CSS 4. Uses the TMDB API to search for movies and view details. No state management library — data flows via props and local state.

## Tech Stack

| Layer | Choice |
|---|---|
| UI | React 19 with JSX (no TypeScript) |
| Bundler | Vite 8 + Rolldown |
| CSS | Tailwind CSS 4 (`@import "tailwindcss"`, no PostCSS config) |
| Routing | React Router v8 (`react-router` package) |
| Linting | oxlint |
| Compiler | React Compiler via `babel-plugin-react-compiler` + `@rolldown/plugin-babel` |
| Build | `npm run build` (Vite), `npm run preview` to serve production |

## Directory Layout

```
src/
├── api/
│   └── tmdb.js            # TMDB API client
├── components/
│   └── ui/
│       ├── Header.jsx      # Sticky header with burger menu
│       ├── image/
│       │   └── image.jsx   # Poster with SVG fallback
│       ├── pagination/
│       │   └── pagination.jsx  # Sliding 5-page window
│       ├── resultCard/
│       │   └── resultCard.jsx  # Search result card
│       └── searchBar/
│           └── searchBar.jsx   # Search form
├── hooks/
│   └── useDebounce.js      # Debounce hook (400ms default)
├── pages/
│   ├── home.jsx            # / — search + results + pagination
│   └── detail.jsx          # /:type/:id — movie/series detail
├── App.jsx                 # Routes + Suspense + Header
├── main.jsx                # Entry: BrowserRouter + StrictMode
└── index.css               # Tailwind import + @theme tokens + base styles
```

## Routes

| Path | Component | Description |
|---|---|---|
| `/` | `Home` (lazy) | Search bar, results grid, pagination |
| `/:type/:id` | `Details` (lazy) | Full movie/TV detail page |

Both pages are lazy-loaded via `React.lazy()` + `Suspense` in `App.jsx`.

## Data Flow

### API Client (`src/api/tmdb.js`)

- **`getMovie(query, page)`** — `GET /3/search/movie` → returns `{ results, total_pages, ... }`
- **`getMovieDetail(type, id)`** — `GET /3/{type}/{id}` → full movie/TV detail object
- **`getImageUrl(path, size)`** — builds `https://image.tmdb.org/t/p/{size}{path}`

API key is a Bearer token from `import.meta.env.VITE_TMDB_API_KEY` (set in `.env`).

### Search Flow (`Home`)

```
User types → searchInput (state) → useDebounce(400ms) → debouncedSearch
                                                              ↓
                                              useEffect calls getMovie()
                                              sets searchQuery, movies, totalPages
                                              |
User presses Enter or Submit button ─────────→ handleSubmit()
                                              calls getMovie() directly
                                              resets currentPage to 1
                                              clears input
```

Two input paths share the same fetch logic:

1. **Debounced typing** — `useEffect` watches `debouncedSearch`, calls `getMovie(query, 1)`
2. **Form submit** — `handleSubmit` reads `inputRef.current.value`, calls `getMovie(query, 1)`

Both set `searchQuery` so the results display correctly regardless of which path triggered the search.

### Pagination

`Pagination` receives `currentPage`, `totalPages`, and `onPageChange`. The parent (`Home`) implements `handlePageChange(page)` which calls `getMovie(searchQuery, page)` and updates state. The component renders a sliding window of 5 page buttons with prev/next arrows and scrolls to top on change.

### Detail Page

`Details` reads `:type` and `:id` from URL params via `useParams()`, calls `getMovieDetail(type, id)` in a `useEffect`, and renders:

- Backdrop hero image with gradient overlay
- Poster (via `Image` component)
- Type badge, rating star, year, runtime
- Genre pills
- Overview text
- Metadata grid (status, language, budget, revenue)

## Design System

Defined in `src/index.css` via Tailwind's `@theme`:

### Colors

| Token | Value | Usage |
|---|---|---|
| `canvas` | `#0d0d0d` | Page background |
| `canvas-soft` | `#161616` | Secondary background |
| `surface` | `#1e1e1e` | Card/input background |
| `ink` | `#f5f5f0` | Primary text |
| `body` | `#c9c0ad` | Body text |
| `muted` | `#888` | Secondary text |
| `accent` | `#f5a623` | Gold accent (links, badges, stars) |
| `danger` | `#ef4444` | Error text |

### Typography

- **Syne** (Google Font) — display headings via `--font-display`
- **DM Sans** (Google Font) — body text via `--font-body`
- Fluid sizing via `clamp()` for `h1`–`h3` and `p`

### Global Styles

- Thin custom scrollbar
- Gold `::selection` highlight
- Consistent `focus-visible` ring on all interactive elements
- `a` hover transitions to accent color

## Component Responsibilities

| Component | Props | Responsibility |
|---|---|---|
| `Header` | none | Sticky top bar, logo link, burger menu (mobile), nav links |
| `SearchBar` | `inputRef, handleSubmit, searchInput, onSearchInput` | Controlled input + submit button, `role="search"` |
| `ResultCard` | `movie` | Poster, type badge, rating, title, year |
| `Image` | `src, alt, className` | Renders `<img>` or SVG fallback if `src` is null |
| `Pagination` | `currentPage, totalPages, onPageChange` | Windowed 5-page pagination with scroll-to-top |

## React Compiler

Enabled in `vite.config.js` via:

```js
babel({ presets: [reactCompilerPreset()] })
```

All `setState` calls are placed in promise `.then()`/`.catch()` callbacks or event handlers — never directly inside `useEffect` bodies — to comply with React Compiler's rules.

## Linting

Run `npm run lint` (oxlint). No ESLint config; oxlint uses defaults.

## Environment

`VITE_TMDB_API_KEY` in `.env` (gitignored). Never committed.
