import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, updateQty, removeItem, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="pb-28 min-h-screen bg-paper dark:bg-ink">
        <Header title="Cart" showBack />
        <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-mist dark:bg-panel flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-graphiteDim dark:text-creamDim">
              <circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" />
              <path d="M2 3h2l2.4 12.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6" />
            </svg>
          </div>
          <p className="text-graphiteDim dark:text-creamDim mb-6">Your box is empty. Let's fix that.</p>
          <Link to="/" className="btn-primary">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-44 min-h-screen bg-paper dark:bg-ink">
      <Header title="Cart" showBack />
      <div className="px-5 pt-4 flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.id} className="card flex items-center justify-between p-3">
            <div>
              <p className="font-display font-semibold text-graphite dark:text-cream text-sm">{item.name}</p>
              <p className="text-rust text-xs font-bold mt-1">₦{(item.price * item.qty).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-mist dark:bg-ink rounded-full px-1">
                <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 text-rust font-bold">−</button>
                <span className="text-graphite dark:text-cream text-xs font-semibold w-4 text-center">{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 text-rust font-bold">+</button>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-graphiteDim dark:text-creamDim">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-20 inset-x-0 max-w-md mx-auto bg-paper dark:bg-panel border-t border-line dark:border-white/10 px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-graphiteDim dark:text-creamDim text-sm">Total</span>
          <span className="font-display text-xl font-bold text-graphite dark:text-cream">₦{total.toLocaleString()}</span>
        </div>
        <button onClick={() => navigate("/checkout")} className="btn-primary w-full max-w-md mx-auto block text-center">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
