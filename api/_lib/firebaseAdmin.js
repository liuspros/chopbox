// Shared Firebase Admin setup for all API routes.
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const apps = getApps();

// Safely check if any apps are initialized yet
if (apps.length === 0) {
  const rawKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY.trim();
  const serviceAccount = JSON.parse(rawKey);
  
  initializeApp({
    credential: cert(serviceAccount),
  });
}

// Export the expected db, auth, and FieldValue services
export const db = getFirestore();
export const auth = getAuth();
export const FieldValue = {
  increment: (n) => admin.firestore.FieldValue.increment(n),
  arrayUnion: (...args) => admin.firestore.FieldValue.arrayUnion(...args),
  arrayRemove: (...args) => admin.firestore.FieldValue.arrayRemove(...args),
  serverTimestamp: () => admin.firestore.FieldValue.serverTimestamp()
};

// Every protected API route calls this first to verify user tokens
export async function requireAuth(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    const err = new Error("Sign in required.");
    err.statusCode = 401;
    throw err;
  }
  try {
    return await auth.verifyIdToken(token);
  } catch {
    const err = new Error("Invalid or expired session.");
    err.statusCode = 401;
    throw err;
  }
}
