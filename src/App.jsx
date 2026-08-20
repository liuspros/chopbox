import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WalletProvider } from "./context/WalletContext";
import { ThemeProvider } from "./context/ThemeContext";
import BottomNav from "./components/BottomNav";
import AuthGate from "./components/AuthGate";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wallet from "./pages/Wallet";
import Orders from "./pages/Orders";
import Account from "./pages/Account";
import Auth from "./pages/Auth";

export default function App() {
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
