// Thin wrapper for calling our /api routes (Vercel Serverless Functions).
// Attaches the current user's Firebase ID token as a Bearer header so the
// server can verify who's calling — same idea as onCall's request.auth,
// just done manually since plain HTTP functions don't get that for free.
import { auth } from "./firebase";

export async function callApi(path, body) {
  const user = auth.currentUser;
  const token = user ? await user.getIdToken() : null;

  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong. Try again.");
  }

  return data;
}
