# ChopBox — Ghost Kitchen Pickup App

A pickup-ordering web app: browse menu → add to cart → pay by wallet or card
(Paystack) → track order → collect at the kitchen.

## Stack

- **Frontend:** React + Vite + Tailwind v4, light mode by default with a
  dark mode toggle
- **Auth & data:** Firebase Authentication (Email/Password + Google) and
  Firestore
- **Money-handling backend:** Vercel Serverless Functions (`/api`), using
  firebase-admin — NOT Firebase Cloud Functions. This avoids needing
  Firebase's Blaze billing plan and deploys on the same `vercel deploy` as
  the frontend, on the same domain (no CORS issues).

## Why a backend at all?

Two things can never be trusted to the browser alone:
1. Your Paystack **secret key** — if it lived in frontend code, anyone
   could read it from the page source and make charges as you.
2. "Payment succeeded" — the browser's word alone isn't proof. `/api/paystack/webhook`
   is the only thing that credits a wallet or confirms an order, and it
   only trusts a signature-verified, server-to-server call from Paystack
   itself.

## What's built (v1 scaffold)

- Home, Menu browsing by category, Cart, Checkout, Wallet, Orders, Account
- Email/password + Google sign in (`/auth`) — checkout, wallet, orders, and
  account are gated behind sign-in; home/menu browsing stays public
- Wallet: top up via Paystack (presets + custom amount), spend-only balance
- Checkout: pay from wallet OR pay directly by card/bank transfer via Paystack
- Firestore security rules (`firestore.rules`) block all direct client
  writes to wallets/orders — only `/api` routes (via firebase-admin) can
  change a balance or confirm a payment
- Placeholder menu items in `src/data/menu.js` — swap with real ChopBox items

## Already connected

- **Firebase project:** `chopbox-ccf42` (Auth + Firestore)
- **Paystack test public key** — in `.env`, safe to expose client-side

## What you still need to do

### 1. Firebase service account (for the /api routes)
Firebase Console > Project Settings > Service Accounts > **Generate New
Private Key**. This downloads a JSON file. Minify it to one line (remove
line breaks) and set it as the `FIREBASE_SERVICE_ACCOUNT_KEY` value in
`.env` (local) and in your Vercel project's environment variables
(production). Never commit the downloaded file.

### 2. Paystack secret key
Different from the public key you already gave me. Get it from Paystack
Dashboard > Settings > API Keys & Webhooks. Set it as `PAYSTACK_SECRET_KEY`
in `.env` (local) and in Vercel's environment variables (production).

### 3. Enable Firebase Auth providers
Console > Authentication > Sign-in method — Email/Password and Google
should both show "Enabled" (you've already confirmed this).

### 4. Deploy Firestore rules
Needs the Firebase CLI (`npm install -g firebase-tools`, then `firebase login`):
```
firebase deploy --only firestore:rules
```

### 5. Register the Paystack webhook URL
Once deployed to Vercel, your webhook lives at:
```
https://<your-vercel-domain>/api/paystack/webhook
```
Paste that into Paystack Dashboard > Settings > API Keys & Webhooks >
Webhook URL.

## Local development

Two servers run side by side — don't use `vercel dev` alone for this project,
it has a known bug where it breaks Vite's dev server (see the comment at
the top of `vite.config.js` for why).

**Terminal 1 — the API functions:**
```
vercel dev --listen 3001
```
(First run will ask a couple of setup questions — accept the defaults.)

**Terminal 2 — the frontend:**
```
npm run dev
```

Open the URL Terminal 2 prints (usually `http://localhost:5173`) — NOT the
one from Terminal 1. Vite is configured to automatically forward any
`/api/...` request to the Vercel dev server on port 3001, so both pieces
work together from that one URL.

## Deploying

```
vercel
```
Then set the environment variables (`VITE_...` ones plus
`PAYSTACK_SECRET_KEY` and `FIREBASE_SERVICE_ACCOUNT_KEY`) in the Vercel
project dashboard under Settings > Environment Variables, and redeploy.

## Still to build (v2 candidates)
- QR code / pickup confirmation screen
- Order status push notifications
- Admin view for the kitchen to manage incoming orders and menu items
- Phone number verification
