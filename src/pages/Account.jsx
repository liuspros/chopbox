import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { auth } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";

export default function Account() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="pb-28 min-h-screen bg-paper dark:bg-ink">
      <Header title="Account" showBack />
      <div className="px-5 pt-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-rust flex items-center justify-center font-display font-bold text-xl text-white">
            {(user?.displayName || user?.email || "?")[0].toUpperCase()}
          </div>
          <div>
            <p className="font-display font-semibold text-graphite dark:text-cream">
              {user?.displayName || "ChopBox Customer"}
            </p>
            <p className="text-graphiteDim dark:text-creamDim text-xs">{user?.email}</p>
          </div>
        </div>

        <div className="flex flex-col divide-y divide-line dark:divide-white/10 border-t border-b border-line dark:border-white/10">
          {["Profile Details", "Saved Pickup Locations", "Help & Support"].map((label) => (
            <button key={label} className="flex items-center justify-between py-4 text-left">
              <span className="text-graphite dark:text-cream text-sm font-medium">{label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-graphiteDim dark:text-creamDim">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
          ))}
          <button
            onClick={() => signOut(auth).then(() => navigate("/"))}
            className="flex items-center justify-between py-4 text-left"
          >
            <span className="text-rust text-sm font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
