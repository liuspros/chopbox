import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { auth, db } from "../lib/firebase";

export default function ProfileDetails() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, "users", user.uid)).then((snap) => {
      if (snap.exists()) setPhone(snap.data().phone || "");
    });
  }, [user]);

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    try {
      if (name !== user.displayName) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      await setDoc(doc(db, "users", user.uid), { phone }, { merge: true });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pb-28 min-h-screen bg-paper dark:bg-ink">
      <Header title="Profile Details" showBack />
      <form onSubmit={handleSave} className="px-5 pt-4 flex flex-col gap-4">
        <div>
          <label className="text-graphiteDim dark:text-creamDim text-xs mb-1.5 block">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="input-field w-full"
          />
        </div>

        <div>
          <label className="text-graphiteDim dark:text-creamDim text-xs mb-1.5 block">Email</label>
          <input value={user?.email || ""} disabled className="input-field w-full opacity-60" />
          <p className="text-graphiteDim dark:text-creamDim text-xs mt-1">Email can't be changed here.</p>
        </div>

        <div>
          <label className="text-graphiteDim dark:text-creamDim text-xs mb-1.5 block">Phone Number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 08012345678"
            className="input-field w-full"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full mt-2 disabled:opacity-60">
          {loading ? "Saving…" : saved ? "Saved ✓" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
