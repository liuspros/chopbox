import { db, FieldValue } from "../_lib/firebaseAdmin.js";
import crypto from "crypto";

// Vercel parses JSON bodies by default, but we need the RAW body to verify
// Paystack's signature correctly (re-stringifying can subtly change byte
// order and break the HMAC check). Disable the default parser here.
export const config = {
  api: { bodyParser: false },
};

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const rawBody = await readRawBody(req);

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
    .update(rawBody)
    .digest("hex");

  if (hash !== req.headers["x-paystack-signature"]) {
    console.warn("Webhook signature mismatch — rejecting.");
    return res.status(401).end();
  }

  const event = JSON.parse(rawBody);

  if (event.event === "charge.success") {
    const { reference, metadata, amount } = event.data;

    if (metadata?.type === "wallet_topup") {
      await handleWalletTopupSuccess(reference, metadata.uid, amount / 100);
    } else if (metadata?.type === "order_payment") {
      await handleOrderPaymentSuccess(metadata.orderId);
    }
  }

  return res.status(200).end();
}

async function handleWalletTopupSuccess(reference, uid, amount) {
  const topupRef = db.collection("walletTopups").doc(reference);
  const walletRef = db.collection("wallets").doc(uid);

  await db.runTransaction(async (tx) => {
    const topupSnap = await tx.get(topupRef);

    // Idempotency guard — Paystack can send the same webhook more than once.
    if (!topupSnap.exists || topupSnap.data().status === "completed") return;

    tx.set(walletRef, { balance: FieldValue.increment(amount) }, { merge: true });

    tx.set(walletRef.collection("transactions").doc(), {
      type: "credit",
      amount,
      reason: "topup",
      reference,
      createdAt: new Date(),
    });

    tx.update(topupRef, { status: "completed" });
  });
}

async function handleOrderPaymentSuccess(orderId) {
  await db.collection("orders").doc(orderId).update({ status: "confirmed" });
}
