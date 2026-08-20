const categoryEmoji = {
  rice: "🍚",
  swallow: "🥘",
  continental: "🍔",
  drinks: "🥤",
};

export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="flex gap-4 overflow-x-auto px-5 pb-1 no-scrollbar">
      {categories.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className="flex flex-col items-center gap-1.5 flex-shrink-0"
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 transition-colors ${
                isActive
                  ? "border-rust bg-rust/10"
                  : "border-line dark:border-white/10 bg-mist dark:bg-panel"
              }`}
            >
              {categoryEmoji[cat.id] || "🍽️"}
            </div>
            <span
              className={`text-xs font-medium whitespace-nowrap ${
                isActive ? "text-rust" : "text-graphiteDim dark:text-creamDim"
              }`}
            >
              {cat.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
