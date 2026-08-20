// Firebase config — pulled from environment variables, set in .env
// (see .env.example for the required keys). .env is gitignored, so real
// keys never get committed to source control.
//
// Note: this file only sets up Auth and Firestore for the frontend.
// Money-handling logic (Paystack, wallet crediting) lives in /api —
// Vercel Serverless Functions using firebase-admin — never here.
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
