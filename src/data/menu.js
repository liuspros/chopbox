// Placeholder menu data — swap with real ChopBox items later.
// Each item's `id` is used as the Firestore doc reference when ordering.

export const categories = [
  { id: "rice", label: "Rice Dishes" },
  { id: "swallow", label: "Swallow & Soups" },
  { id: "continental", label: "Continental" },
  { id: "drinks", label: "Drinks" },
];

export const menuItems = [
  {
    id: "jollof-chicken",
    category: "rice",
    name: "Party Jollof + Chicken",
    description: "Smoky party-style jollof rice with grilled chicken and fried plantain.",
    price: 3500,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
  },
  {
    id: "fried-rice-beef",
    category: "rice",
    name: "Fried Rice + Beef",
    description: "Vegetable fried rice with seasoned beef strips.",
    price: 3200,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
  },
  {
    id: "eba-egusi",
    category: "swallow",
    name: "Eba + Egusi Soup",
    description: "Smooth eba with melon-seed soup, assorted meat.",
    price: 2800,
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80",
  },
  {
    id: "pounded-yam-efo",
    category: "swallow",
    name: "Pounded Yam + Efo Riro",
    description: "Fresh pounded yam with spinach stew, stockfish and beef.",
    price: 3000,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cee6a6?w=600&q=80",
  },
  {
    id: "grilled-chicken-chips",
    category: "continental",
    name: "Grilled Chicken + Chips",
    description: "Herb-marinated grilled chicken breast with seasoned fries.",
    price: 4000,
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&q=80",
  },
  {
    id: "beef-burger",
    category: "continental",
    name: "ChopBox Beef Burger",
    description: "Double beef patty, cheddar, house sauce, brioche bun, side fries.",
    price: 4500,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
  },
  {
    id: "chapman",
    category: "drinks",
    name: "Chapman",
    description: "Classic Nigerian mocktail, chilled.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
  },
  {
    id: "zobo",
    category: "drinks",
    name: "Zobo",
    description: "Hibiscus drink with ginger and pineapple.",
    price: 1000,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&q=80",
  },
];

export const walletPresets = [1000, 2500, 5000, 10000];
