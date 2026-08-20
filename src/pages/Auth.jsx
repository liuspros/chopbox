import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../lib/firebase";

const googleProvider = new GoogleAuthProvider();

export default function Auth() {
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError(friendlyError(err.code));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-ink flex flex-col justify-center px-6">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-bold text-graphite dark:text-cream">
          Chop<span className="text-rust">Box</span>
        </h1>
        <p className="text-graphiteDim dark:text-creamDim text-sm mt-2">
          {mode === "signin" ? "Welcome back — sign in to order." : "Create an account to get started."}
        </p>
      </div>

      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="btn-secondary w-full flex items-center justify-center gap-2 mb-4 disabled:opacity-60"
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.43 3.58v2.98h3.93c2.3-2.12 3.62-5.23 3.62-8.8z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.93-2.98c-1.09.73-2.48 1.16-4 1.16-3.08 0-5.69-2.08-6.62-4.87H1.32v3.07C3.29 21.3 7.32 24 12 24z" />
          <path fill="#FBBC05" d="M5.38 14.4c-.24-.73-.38-1.5-.38-2.4s.14-1.67.38-2.4V6.53H1.32A11.96 11.96 0 0 0 0 12c0 1.93.46 3.76 1.32 5.47l4.06-3.07z" />
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0 7.32 0 3.29 2.7 1.32 6.53l4.06 3.07C6.31 6.83 8.92 4.75 12 4.75z" />
        </svg>
        <span className="text-sm font-medium">Continue with Google</span>
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-line dark:bg-white/10" />
        <span className="text-graphiteDim dark:text-creamDim text-xs">or</span>
        <div className="flex-1 h-px bg-line dark:bg-white/10" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field w-full"
        />
        <input
          type="password"
          required
          minLength={6}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field w-full"
        />

        {error && <p className="text-rust text-sm">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary w-full mt-2 disabled:opacity-60">
          {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
        </button>
      </form>

      <button
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        className="text-graphiteDim dark:text-creamDim text-sm text-center mt-6"
      >
        {mode === "signin" ? (
          <>Don't have an account? <span className="text-rust font-semibold">Sign up</span></>
        ) : (
          <>Already have an account? <span className="text-rust font-semibold">Sign in</span></>
        )}
      </button>
    </div>
  );
}

function friendlyError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "That email is already registered — try signing in instead.";
    case "auth/invalid-email":
      return "That email address doesn't look right.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    default:
      return "Something went wrong. Try again.";
  }
}
