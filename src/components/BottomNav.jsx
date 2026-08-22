import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/", label: "Home", icon: "home" },
  { to: "/orders", label: "Orders", icon: "receipt" },
  { to: "/wallet", label: "Wallet", icon: "wallet" },
  { to: "/account", label: "Account", icon: "user" },
];

const icons = {
  home: (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5 12 3l9 6.5" /><path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
    </svg>
  ),
  receipt: (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2h12v20l-3-2-3 2-3-2-3 2z" /><path d="M9 7h6M9 11h6" />
    </svg>
  ),
  wallet: (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="14" rx="2" /><path d="M2 10h20" /><circle cx="17" cy="14" r="1.5" fill={color} />
    </svg>
  ),
  user: (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  ),
};

export default function BottomNav() {
  return (
    <nav className="fixed bottom-4 inset-x-0 max-w-md mx-auto px-4 z-30">
      <div className="bg-graphite dark:bg-panel rounded-full shadow-lg flex items-center justify-between p-1.5">
        {tabs.map((tab) => (
          <NavLink key={tab.to} to={tab.to} className="flex-shrink-0">
            {({ isActive }) =>
              isActive ? (
                <span className="flex items-center gap-2 bg-rust text-white rounded-full pl-3 pr-4 py-2.5 transition-all duration-300">
                  {icons[tab.icon]("#FFFFFF")}
                  <span className="text-sm font-semibold whitespace-nowrap">{tab.label}</span>
                </span>
              ) : (
                <span className="flex items-center justify-center w-11 h-11 rounded-full transition-colors">
                  {icons[tab.icon]("#9C948A")}
                </span>
              )
            }
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
