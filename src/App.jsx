import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WalletProvider } from "./context/WalletContext";
import { ThemeProvider } from "./context/ThemeContext";
import BottomNav from "./components/BottomNav";
import AuthGate from "./components/AuthGate";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wallet from "./pages/Wallet";
import Orders from "./pages/Orders";
import Account from "./pages/Account";
import Auth from "./pages/Auth";
import ProfileDetails from "./pages/ProfileDetails";
import SavedLocations from "./pages/SavedLocations";
import HelpSupport from "./pages/HelpSupport";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <WalletProvider>
          <CartProvider>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/*"
                element={
                  <div className="min-h-screen max-w-md mx-auto relative bg-paper dark:bg-ink">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route
                        path="/checkout"
                        element={
                          <AuthGate>
                            <Checkout />
                          </AuthGate>
                        }
                      />
                      <Route
                        path="/wallet"
                        element={
                          <AuthGate>
                            <Wallet />
                          </AuthGate>
                        }
                      />
                      <Route
                        path="/orders"
                        element={
                          <AuthGate>
                            <Orders />
                          </AuthGate>
                        }
                      />
                      <Route
                        path="/account"
                        element={
                          <AuthGate>
                            <Account />
                          </AuthGate>
                        }
                      />
                      <Route
                        path="/account/profile"
                        element={
                          <AuthGate>
                            <ProfileDetails />
                          </AuthGate>
                        }
                      />
                      <Route
                        path="/account/locations"
                        element={
                          <AuthGate>
                            <SavedLocations />
                          </AuthGate>
                        }
                      />
                      <Route path="/account/help" element={<HelpSupport />} />
                    </Routes>
                    <BottomNav />
                  </div>
                }
              />
            </Routes>
          </CartProvider>
        </WalletProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
