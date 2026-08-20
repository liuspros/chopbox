import { db, requireAuth } from "../_lib/firebaseAdmin.js";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const decoded = await requireAuth(req);
    const uid = decoded.uid;
    const email = decoded.email;

    const amount = Number(req.body.amount);
    if (!amount || amount < 100) {
      return res.status(400).json({ error: "Minimum top-up is ₦100." });
    }
    if (!email) {
      return res.status(412).json({ error: "Account has no email on file." });
    }

    const reference = `topup_${uid}_${Date.now()}`;

    // Record the pending top-up before contacting Paystack, so the webhook
    // has something to reconcile against even if payment is never completed.
    await db.collection("walletTopups").doc(reference).set({
      uid,
      amount,
      status: "pending",
      createdAt: new Date(),
    });

    const psRes = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, // kobo
        reference,
        metadata: { type: "wallet_topup", uid },
      },
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    );

    return res.status(200).json({
      authorization_url: psRes.data.data.authorization_url,
      reference,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message || "Something went wrong." });
  }
}
