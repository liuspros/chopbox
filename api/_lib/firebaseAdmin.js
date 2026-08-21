// Shared Firebase Admin setup for all API routes.
// The Admin SDK authenticates with a service account (full server-side
// access, bypasses Firestore security rules) — completely separate from
// the public web config used in src/lib/firebase.js on the frontend.
//
// FIREBASE_SERVICE_ACCOUNT_KEY is the *entire* service account JSON file,
// minified to one line, stored as a single environment variable.
// Get it from: Firebase Console > Project Settings > Service Accounts >
// Generate New Private Key. Never commit the downloaded JSON file.
//
// NOTE: this uses firebase-admin's modular imports (firebase-admin/app,
// /firestore, /auth) rather than `import admin from "firebase-admin"`.
// The old default-import style breaks in newer firebase-admin versions
// (v14+) under Node's ESM ("type": "module") — `admin` comes back without
// its usual properties (e.g. admin.apps is undefined), causing every
// route to crash before it even runs. The modular imports are the
// officially documented fix and avoid that CJS/ESM interop issue entirely.

import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

if (!getApps().length) {
  const envKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!envKey) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY environment variable is missing.");
  }

  // Handle stringified JSON or double-escaped newlines
  const serviceAccount = typeof envKey === "string" ? JSON.parse(envKey) : envKey;

  if (serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
  }

  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const db = getFirestore();
export const auth = getAuth();
export { FieldValue };

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
