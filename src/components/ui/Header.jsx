import { Link } from "react-router";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-canvas/80 backdrop-blur-lg border-b border-border">
      <div className="mx-auto flex items-center justify-between px-4 py-3 max-w-7xl">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-ink hover:text-accent transition-colors min-h-[44px]"
        >
          <span className="text-accent text-2xl">&#9670;</span>
          iwantamovie
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2 min-w-[44px] min-h-[44px] items-center justify-center text-muted hover:text-ink transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-px w-5 bg-current transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`}
          />
          <span
            className={`block h-px w-5 bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-5 bg-current transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
          />
        </button>

        <nav
          className={`${menuOpen ? "flex" : "hidden"} lg:flex absolute lg:static top-full left-0 right-0 bg-canvas/95 lg:bg-transparent backdrop-blur-lg lg:backdrop-blur-none border-b lg:border-0 border-border flex-col lg:flex-row items-center gap-4 p-4 lg:p-0`}
        >
          <Link
            to="/"
            className="text-sm text-body hover:text-accent transition-colors min-h-[44px] flex items-center"
            onClick={() => setMenuOpen(false)}
          >
            Search
          </Link>
        </nav>
      </div>
    </header>
  );
}
