import { createContext, useContext, useState, useEffect } from "react";
import { doc, onSnapshot, collection, query, orderBy, limit } from "firebase/firestore";
import { db } from "../lib/firebase";
import { callApi } from "../lib/api";
import { useAuth } from "./AuthContext";

const WalletContext = createContext(null);

// IMPORTANT: the wallet balance is never written from the client.
// It only ever changes via POST /api/paystack/webhook, which itself only
// trusts Paystack's server-verified webhook — never the browser's
// "payment successful" callback. See /api/paystack/webhook.js.

export function WalletProvider({ children }) {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setBalance(0);
      setTransactions([]);
      setLoading(false);
      return;
    }

    const unsubBalance = onSnapshot(doc(db, "wallets", user.uid), (snap) => {
      setBalance(snap.exists() ? snap.data().balance ?? 0 : 0);
      setLoading(false);
    });

    const txQuery = query(
      collection(db, "wallets", user.uid, "transactions"),
      orderBy("createdAt", "desc"),
      limit(20)
    );
    const unsubTx = onSnapshot(txQuery, (snap) => {
      setTransactions(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubBalance();
      unsubTx();
    };
  }, [user]);

  // Kicks off a Paystack top-up. Returns the Paystack authorization_url
  // to redirect the customer to.
  async function initiateTopup(amountNaira) {
    return callApi("/api/wallet/initiate-topup", { amount: amountNaira });
  }

  return (
    <WalletContext.Provider
      value={{ balance, transactions, loading, initiateTopup }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
