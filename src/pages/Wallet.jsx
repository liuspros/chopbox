import { useState } from "react";
import Header from "../components/Header";
import { useWallet } from "../context/WalletContext";
import { walletPresets } from "../data/menu";

export default function Wallet() {
  const { balance, transactions, initiateTopup } = useWallet();
  const [amount, setAmount] = useState(walletPresets[1]);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);

  const effectiveAmount = custom ? Number(custom) : amount;

  async function handleTopup() {
    if (!effectiveAmount || effectiveAmount < 100) return;
    setLoading(true);
    try {
      const { authorization_url } = await initiateTopup(effectiveAmount);
      window.location.href = authorization_url;
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <div className="pb-28 min-h-screen bg-paper dark:bg-ink">
      <Header title="Wallet" showBack />

      <div className="px-5 pt-4">
        <div className="card p-5 mb-6 bg-gradient-to-br from-rust to-rustDark !border-none">
          <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Balance</p>
          <p className="font-display text-3xl font-bold text-white">₦{balance.toLocaleString()}</p>
          <p className="text-white/70 text-xs mt-2">Spend-only — top up anytime for faster checkout.</p>
        </div>

        <h2 className="font-display font-semibold text-graphite dark:text-cream mb-3">Top Up</h2>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {walletPresets.map((preset) => (
            <button
              key={preset}
              onClick={() => { setAmount(preset); setCustom(""); }}
              className={`py-3 rounded-full text-sm font-semibold border ${
                !custom && amount === preset
                  ? "bg-rust border-rust text-white"
                  : "chip"
              }`}
            >
              ₦{preset.toLocaleString()}
            </button>
          ))}
        </div>
        <input
          type="number"
          placeholder="Or enter custom amount"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          className="input-field w-full mb-4"
        />
        <button onClick={handleTopup} disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading ? "Redirecting…" : `Top Up ₦${effectiveAmount ? effectiveAmount.toLocaleString() : "0"}`}
        </button>

        <h2 className="font-display font-semibold text-graphite dark:text-cream mt-8 mb-3">Recent Activity</h2>
        <div className="flex flex-col gap-2">
          {transactions.length === 0 && (
            <p className="text-graphiteDim dark:text-creamDim text-sm">No transactions yet.</p>
          )}
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between py-2 border-b border-line dark:border-white/5">
              <p className="text-graphite dark:text-cream text-sm font-medium capitalize">
                {tx.reason === "topup" ? "Wallet Top-up" : "Order Payment"}
              </p>
              <span className={`text-sm font-semibold ${tx.type === "credit" ? "text-amber" : "text-graphiteDim dark:text-creamDim"}`}>
                {tx.type === "credit" ? "+" : "−"}₦{tx.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
