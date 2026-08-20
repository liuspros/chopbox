// Shared Firebase Admin setup for all API routes.
// The Admin SDK authenticates with a service account (full server-side
// access, bypasses Firestore security rules) — completely separate from
// the public web config used in src/lib/firebase.js on the frontend.
//
// FIREBASE_SERVICE_ACCOUNT_KEY is the *entire* service account JSON file,
// minified to one line, stored as a single environment variable.
// Get it from: Firebase Console > Project Settings > Service Accounts >
// Generate New Private Key. Never commit the downloaded JSON file.

import admin from "firebase-admin";

// Safely check if any apps are initialized yet
// Safely check if any apps are initialized yet
if (!admin.apps || admin.apps.length === 0) {
  // Clean up any rogue newline issues or invisible spaces before parsing
  const rawKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY.trim();
  const serviceAccount = JSON.parse(rawKey);
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}



export const db = admin.firestore();
export const auth = admin.auth();
export const FieldValue = admin.firestore.FieldValue;

// Every protected API route calls this first. It reads the Firebase ID
// token the frontend attached as "Authorization: Bearer <token>" and
// verifies it really was issued by Firebase for a real signed-in user —
// this is the equivalent of what onCall's `request.auth` gave us for free
// in the old Cloud Functions version.
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
