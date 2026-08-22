import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import { useWallet } from "../context/WalletContext";
import { callApi } from "../lib/api";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { balance } = useWallet();
  const navigate = useNavigate();
  const [method, setMethod] = useState(balance >= total ? "wallet" : "card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pickupLocations = ["Ogbomosho", "Ilorin", "Lagos Mainland", "Lagos Island"];
  const [location, setLocation] = useState(
    () => localStorage.getItem("chopbox-default-location") || pickupLocations[0]
  );

  async function handlePay() {
    setLoading(true);
    setError("");
    try {
      const orderItems = items.map(({ id, name, price, qty }) => ({ id, name, price, qty }));

      if (method === "wallet") {
        const res = await callApi("/api/orders/pay-from-wallet", { items: orderItems, total });
        clearCart();
        navigate(`/orders?confirmed=${res.orderId}`);
      } else {
        const res = await callApi("/api/orders/initiate-payment", { items: orderItems, total });
        window.location.href = res.authorization_url;
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pb-44 min-h-screen bg-paper dark:bg-ink">
      <Header title="Checkout" showBack />

      <div className="px-5 pt-4">
        <h2 className="font-display font-semibold text-graphite dark:text-cream mb-2">Pickup Location</h2>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input-field w-full mb-6"
        >
          {pickupLocations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <h2 className="font-display font-semibold text-graphite dark:text-cream mb-2">Pay With</h2>
        <div className="flex flex-col gap-2 mb-6">
          <button
            onClick={() => setMethod("wallet")}
            disabled={balance < total}
            className={`card p-4 flex items-center justify-between text-left ${
              method === "wallet" ? "!border-rust border-2" : ""
            } ${balance < total ? "opacity-40" : ""}`}
          >
            <div>
              <p className="font-semibold text-graphite dark:text-cream text-sm">Wallet</p>
              <p className="text-graphiteDim dark:text-creamDim text-xs">Balance: ₦{balance.toLocaleString()}</p>
              {balance < total && <p className="text-rust text-xs mt-1">Insufficient balance</p>}
            </div>
            {method === "wallet" && <span className="w-4 h-4 rounded-full bg-rust flex-shrink-0" />}
          </button>

          <button
            onClick={() => setMethod("card")}
            className={`card p-4 flex items-center justify-between text-left ${
              method === "card" ? "!border-rust border-2" : ""
            }`}
          >
            <div>
              <p className="font-semibold text-graphite dark:text-cream text-sm">Card / Bank Transfer</p>
              <p className="text-graphiteDim dark:text-creamDim text-xs">Pay via Paystack</p>
            </div>
            {method === "card" && <span className="w-4 h-4 rounded-full bg-rust flex-shrink-0" />}
          </button>
        </div>

        {error && <p className="text-rust text-sm mb-4">{error}</p>}
      </div>

      <div className="fixed bottom-20 inset-x-0 max-w-md mx-auto bg-paper dark:bg-panel border-t border-line dark:border-white/10 px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-graphiteDim dark:text-creamDim text-sm">Total</span>
          <span className="font-display text-xl font-bold text-graphite dark:text-cream">₦{total.toLocaleString()}</span>
        </div>
        <button onClick={handlePay} disabled={loading} className="btn-primary w-full max-w-md mx-auto block text-center disabled:opacity-60">
          {loading ? "Processing…" : `Pay ₦${total.toLocaleString()}`}
        </button>
      </div>
    </div>
  );
}
