import { db, requireAuth, FieldValue } from "../_lib/firebaseAdmin.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const decoded = await requireAuth(req);
    const uid = decoded.uid;

    const { items, total } = req.body;
    if (!items?.length || !total) {
      return res.status(400).json({ error: "Order must include items and a total." });
    }

    const walletRef = db.collection("wallets").doc(uid);
    const orderRef = db.collection("orders").doc();

    await db.runTransaction(async (tx) => {
      const walletSnap = await tx.get(walletRef);
      const balance = walletSnap.exists ? walletSnap.data().balance ?? 0 : 0;

      if (balance < total) {
        const err = new Error("Insufficient wallet balance.");
        err.statusCode = 412;
        throw err;
      }

      tx.set(walletRef, { balance: FieldValue.increment(-total) }, { merge: true });

      tx.set(walletRef.collection("transactions").doc(), {
        type: "debit",
        amount: total,
        reason: "order_payment",
        orderId: orderRef.id,
        createdAt: new Date(),
      });

      tx.set(orderRef, {
        uid,
        items,
        total,
        status: "confirmed",
        paymentMethod: "wallet",
        createdAt: new Date(),
      });
    });

    return res.status(200).json({ orderId: orderRef.id });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message || "Something went wrong." });
  }
}
