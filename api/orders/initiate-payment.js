import { db, requireAuth } from "../_lib/firebaseAdmin.js";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const decoded = await requireAuth(req);
    const uid = decoded.uid;
    const email = decoded.email;

    const { items, total } = req.body;
    if (!items?.length || !total) {
      return res.status(400).json({ error: "Order must include items and a total." });
    }

    const orderRef = db.collection("orders").doc();
    const reference = `order_${orderRef.id}`;

    await orderRef.set({
      uid,
      items,
      total,
      status: "awaiting_payment",
      paymentMethod: "card",
      reference,
      createdAt: new Date(),
    });

    const psRes = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: total * 100,
        reference,
        metadata: { type: "order_payment", uid, orderId: orderRef.id },
      },
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    );

    return res.status(200).json({
      authorization_url: psRes.data.data.authorization_url,
      orderId: orderRef.id,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message || "Something went wrong." });
  }
}
