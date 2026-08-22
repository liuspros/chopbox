import { useState } from "react";
import Header from "../components/Header";

const faqs = [
  {
    q: "How do I pick up my order?",
    a: "Once your order is ready, its status changes to \"Ready for Pickup\" in the Orders tab. Head to the pickup location you selected at checkout and show your order number.",
  },
  {
    q: "Can I get a refund?",
    a: "Wallet top-ups are spend-only and can't be withdrawn. If an order was paid by card and there's an issue, reach out via WhatsApp below and we'll sort it out.",
  },
  {
    q: "How does the wallet work?",
    a: "Top up any amount and it's saved as credit for future orders — no need to re-enter card details every time. Wallet balance can only be spent on ChopBox orders.",
  },
  {
    q: "My payment succeeded but the order still shows pending.",
    a: "This can take a few seconds to update. If it's been more than 2 minutes, contact support with your order number.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <span className="text-graphite dark:text-cream text-sm font-medium pr-4">{q}</span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className={`text-graphiteDim dark:text-creamDim flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <p className="px-4 pb-4 text-graphiteDim dark:text-creamDim text-sm leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function HelpSupport() {
  return (
    <div className="pb-28 min-h-screen bg-paper dark:bg-ink">
      <Header title="Help & Support" showBack />
      <div className="px-5 pt-4">
        <h2 className="font-display font-semibold text-graphite dark:text-cream mb-3">FAQs</h2>
        <div className="flex flex-col gap-2 mb-8">
          {faqs.map((f) => (
            <FaqItem key={f.q} {...f} />
          ))}
        </div>

        <h2 className="font-display font-semibold text-graphite dark:text-cream mb-3">Still need help?</h2>
        <div className="flex flex-col gap-2">
          <a
            href="https://wa.me/2348152283216"
            target="_blank"
            rel="noreferrer"
            className="card p-4 flex items-center gap-3"
          >
            <span className="w-10 h-10 rounded-full bg-mist dark:bg-panel flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-graphite dark:text-cream">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.46 17.5 2 12.04 2zm5.83 14.06c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.13.11-1.82-.12-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36h.55c.18 0 .42-.03.65.5.24.55.81 1.9.88 2.04.07.14.11.31.02.5-.09.19-.14.31-.27.48-.14.17-.29.37-.41.5-.14.14-.28.29-.12.57.16.29.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.61-.07.17-.19.71-.83.9-1.11.19-.29.38-.24.63-.14.26.1 1.63.77 1.9.91.28.14.46.21.53.33.07.12.07.68-.17 1.36z" />
              </svg>
            </span>
            <div>
              <p className="text-graphite dark:text-cream text-sm font-medium">WhatsApp</p>
              <p className="text-graphiteDim dark:text-creamDim text-xs">Chat with us directly</p>
            </div>
          </a>

          <a href="mailto:support@chopbox.ng" className="card p-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-mist dark:bg-panel flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-graphite dark:text-cream">
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 6 10 7 10-7" />
              </svg>
            </span>
            <div>
              <p className="text-graphite dark:text-cream text-sm font-medium">Email</p>
              <p className="text-graphiteDim dark:text-creamDim text-xs">support@chopbox.ng</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
