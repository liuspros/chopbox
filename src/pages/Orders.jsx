import { useState, useEffect } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import Header from "../components/Header";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";

const statusLabels = {
  awaiting_payment: { label: "Awaiting Payment", color: "text-graphiteDim dark:text-creamDim" },
  confirmed: { label: "Confirmed", color: "text-amber" },
  preparing: { label: "Preparing", color: "text-amber" },
  ready: { label: "Ready for Pickup", color: "text-rust" },
  completed: { label: "Completed", color: "text-graphiteDim dark:text-creamDim" },
};

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "orders"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [user]);

  return (
    <div className="pb-28 min-h-screen bg-paper dark:bg-ink">
      <Header title="Orders" showBack />
      <div className="px-5 pt-4 flex flex-col gap-3">
        {orders.length === 0 && (
          <p className="text-graphiteDim dark:text-creamDim text-sm text-center py-16">
            No orders yet — your history shows up here.
          </p>
        )}
        {orders.map((order) => {
          const status = statusLabels[order.status] || statusLabels.confirmed;
          return (
            <div key={order.id} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-display font-semibold text-graphite dark:text-cream text-sm">
                  #{order.id.slice(0, 6).toUpperCase()}
                </span>
                <span className={`text-xs font-semibold ${status.color}`}>{status.label}</span>
              </div>
              <div className="border-t border-dashed border-line dark:border-white/15 pt-2 mt-2">
                {order.items?.map((item) => (
                  <p key={item.id} className="text-graphiteDim dark:text-creamDim text-xs">
                    {item.qty}× {item.name}
                  </p>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-rust font-bold text-sm">₦{order.total?.toLocaleString()}</span>
                <span className="text-graphiteDim dark:text-creamDim text-xs capitalize">{order.paymentMethod}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
