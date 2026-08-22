import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ThemeToggle from "./ThemeToggle";

export default function Header({ title, showBack }) {
  const { count } = useCart();

  if (title) {
    // Sub-page header: simple title bar with optional back button
    return (
      <header className="sticky top-0 z-20 bg-paper/90 dark:bg-ink/90 backdrop-blur border-b border-line dark:border-white/10 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <Link to="/" className="w-8 h-8 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-graphite dark:text-cream">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Link>
          )}
          <h1 className="font-display text-lg font-semibold text-graphite dark:text-cream">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/cart" className="relative">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-graphite dark:text-cream">
              <circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" />
              <path d="M2 3h2l2.4 12.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-rust text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </header>
    );
  }

  // Home header: logo + pickup location + notification/cart
  return (
    <header className="px-5 pt-5 pb-2 flex items-center justify-between">
      <div className="flex items-center gap-3 text-graphite dark:text-cream">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
          <path d="M12 2 21 7v10l-9 5-9-5V7z" fill="#E8491D" />
          <path d="M12 2 21 7l-9 5-9-5z" fill="#F4A623" />
        </svg>
        <div className="w-px h-8 bg-line dark:bg-white/10" />
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 8v13H4V8M2 3h20l-3 5H5zM10 13h4v8h-4z" />
          </svg>
          <div>
            <p className="text-[11px] text-graphiteDim dark:text-creamDim leading-none">Pickup from</p>
            <p className="text-sm font-semibold leading-tight">Ogbomosho</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Link to="/cart" className="relative w-10 h-10 rounded-full bg-mist dark:bg-panel border border-line dark:border-white/10 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-graphite dark:text-cream">
            <circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" />
            <path d="M2 3h2l2.4 12.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6" />
          </svg>
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-rust text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
