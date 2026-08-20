import { useCart } from "../context/CartContext";

export default function MenuItemCard({ item }) {
  const { items, addItem, updateQty } = useCart();
  const inCart = items.find((i) => i.id === item.id);

  return (
    <div className="card overflow-hidden flex flex-col">
      <div className="relative">
        <img src={item.image} alt={item.name} className="w-full h-28 object-cover" />
        {item.discount && (
          <span className="absolute top-2 left-2 bg-graphite/90 dark:bg-ink/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
            -{item.discount}%
          </span>
        )}

        {/* Floating quantity control, overlapping the image's bottom-right corner */}
        {!inCart ? (
          <button
            onClick={() => addItem(item)}
            className="absolute -bottom-3 right-3 w-8 h-8 rounded-full bg-rust text-white flex items-center justify-center shadow-md text-lg font-bold"
          >
            +
          </button>
        ) : (
          <div className="absolute -bottom-3 right-3 flex items-center gap-1.5 bg-graphite dark:bg-cream rounded-full px-1.5 py-1 shadow-md">
            <button
              onClick={() => updateQty(item.id, inCart.qty - 1)}
              className="w-5 h-5 flex items-center justify-center text-white dark:text-ink text-xs font-bold"
            >
              −
            </button>
            <span className="text-white dark:text-ink text-xs font-bold w-3 text-center">{inCart.qty}</span>
            <button
              onClick={() => updateQty(item.id, inCart.qty + 1)}
              className="w-5 h-5 flex items-center justify-center text-white dark:text-ink text-xs font-bold"
            >
              +
            </button>
          </div>
        )}
      </div>

      <div className="p-3 pt-4">
        <h3 className="font-display font-semibold text-graphite dark:text-cream text-sm leading-snug line-clamp-1">
          {item.name}
        </h3>
        <p className="text-graphiteDim dark:text-creamDim text-xs mt-0.5 line-clamp-1">
          {item.description}
        </p>
        <p className="text-rust font-bold text-sm mt-1.5">₦{item.price.toLocaleString()}</p>
      </div>
    </div>
  );
}
