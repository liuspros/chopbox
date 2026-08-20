// Shared Firebase Admin setup for all API routes.
import admin from "firebase-admin";

// Modern modular destructuring from the firebase-admin package
const { apps, initializeApp, credential } = admin;

// Safely check if any apps are initialized yet
if (!apps || apps.length === 0) {
  const rawKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY.trim();
  const serviceAccount = JSON.parse(rawKey);
  
  initializeApp({
    credential: credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();
export const FieldValue = admin.firestore.FieldValue;

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
