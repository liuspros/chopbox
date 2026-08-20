import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wraps any route that requires a signed-in user. Home/menu browsing stays
// public (people should be able to see the menu without an account) —
// this only guards checkout, wallet, orders, and account.
export default function AuthGate({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-paper dark:bg-ink flex items-center justify-center">
        <p className="text-graphiteDim dark:text-creamDim text-sm">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}
