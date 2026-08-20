import { useState } from "react";
import Header from "../components/Header";
import CategoryTabs from "../components/CategoryTabs";
import MenuItemCard from "../components/MenuItemCard";
import { categories, menuItems } from "../data/menu";

export default function Home() {
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");

  const allCategories = [{ id: "all", label: "All" }, ...categories];

  const filtered = menuItems.filter((item) => {
    const matchesCategory = active === "all" || item.category === active;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-28 min-h-screen bg-paper dark:bg-ink">
      <Header />

      <div className="px-5 pt-3 pb-4">
        <h1 className="font-display text-2xl font-bold text-graphite dark:text-cream leading-tight">
          Hungry? <span className="text-rust">Order & Chop.</span>
        </h1>
      </div>

      <div className="px-5 pb-5 flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 input-field">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-graphiteDim dark:text-creamDim flex-shrink-0">
            <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a meal..."
            className="bg-transparent outline-none w-full text-sm placeholder:text-graphiteDim dark:placeholder:text-creamDim/60"
          />
        </div>
      </div>

      <div className="mb-5">
        <CategoryTabs categories={allCategories} active={active} onChange={setActive} />
      </div>

      <div className="px-5 grid grid-cols-2 gap-3">
        {filtered.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-2 text-center text-graphiteDim dark:text-creamDim text-sm py-10">
            No items match "{search}".
          </p>
        )}
      </div>
    </div>
  );
}
