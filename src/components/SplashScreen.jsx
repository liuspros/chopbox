import { useEffect, useState } from "react";

// Shown once when the app first loads. Pure CSS keyframe animation (see
// index.css for .splash-* classes) — no animation library needed, keeps
// the bundle small. Auto-dismisses after the animation finishes.
export default function SplashScreen({ onFinish }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 1400);
    const doneTimer = setTimeout(() => onFinish(), 1800);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  return (
    <div className={`splash-screen ${exiting ? "splash-exit" : ""}`}>
      <div className="splash-glow" />
      <div className="splash-mark">
        <span className="splash-box">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2 21 7v10l-9 5-9-5V7z" fill="#E8491D" />
            <path d="M12 2 21 7l-9 5-9-5z" fill="#F4A623" />
            <path d="M12 12v10" stroke="#0F0D0C" strokeWidth="0.5" opacity="0.2" />
          </svg>
        </span>
        <h1 className="splash-word">
          <span className="splash-chop">Chop</span>
          <span className="splash-boxtext">Box</span>
        </h1>
      </div>
      <p className="splash-tagline">Order & Chop.</p>
    </div>
  );
}
