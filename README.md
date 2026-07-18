# iwantamovie

A dark, cinematic movie and TV series search app powered by the TMDB API. Type a title, browse results in a responsive card grid, and dive into full detail pages with posters, ratings, genres, and metadata — all wrapped in a warm gold-on-charcoal design system.

## 🚀 Features

- **Real-time search** with 400ms debounce — results appear as you type
- **Responsive card grid** with lazy-loaded poster images and SVG fallbacks
- **Full detail pages** with backdrop hero, genre pills, star ratings, and metadata
- **Windowed pagination** — sliding 5-page window with prev/next and smooth scroll-to-top
- **Sticky header** with animated burger menu on mobile
- **Warm dark design** — custom Tailwind v4 theme with gold accents and fluid `clamp()` typography
- **React Compiler** optimized — all state updates in callbacks, compliant with automatic memoization
- **Zero runtime dependencies** beyond React, React Router, and Tailwind CSS

## 🛠️ Tech Stack

- **React 19** — UI library with automatic memoization via React Compiler
- **Vite 8** — Build tool with Rolldown bundler and instant HMR
- **Tailwind CSS 4** — Utility-first styling with `@theme` custom design tokens
- **React Router v8** — Client-side routing with lazy-loaded pages and Suspense
- **oxlint** — Fast Rust-based linter (replaces ESLint)
- **TMDB API** — Movie/series data and poster images

## 📦 Prerequisites

- **Node.js** >= 18
- **npm** >= 9
- A **TMDB API key** (bearer token) — [sign up here](https://www.themoviedb.org/settings/api)

## 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/iwantamovie.git
   cd iwantamovie
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root (or edit the existing one):

   ```env
   VITE_TMDB_API_KEY="your_tmdb_bearer_token_here"
   ```

   > The `.env` file is gitignored — your API key will never be committed.

4. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 💻 Usage

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint with oxlint
npm run lint

# Run React Doctor (compatibility checks)
npm run doctor
```

Once the dev server is running:

1. Type a movie or TV series title in the search bar
2. Press **Enter** or click **Search** — results appear instantly as cards
3. Click a card to view full details (poster, backdrop, genres, rating, budget, etc.)
4. Use pagination at the bottom to browse additional pages
5. Click the **iwantamovie** logo in the header to return home

### API Client

All TMDB interaction lives in `src/api/tmdb.js`:

```js
import { getMovie, getMovieDetail, getImageUrl } from "./api/tmdb";

// Search movies
const { results, total_pages } = await getMovie("inception", 1);

// Get detail (movie or TV)
const detail = await getMovieDetail("movie", 550);

// Build poster URL
const url = getImageUrl("/abc123.jpg", "w500");
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request. For major changes, please open a discussion first to align on the approach.

## 📄 License

Distributed under the [MIT](LICENSE) License.
