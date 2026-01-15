import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string | null;
  wallet: string | null;
  login: (token: string, wallet: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedWallet = localStorage.getItem("auth_wallet");

    if (storedToken && storedWallet) {
      setToken(storedToken);
      setWallet(storedWallet);
    }
  }, []);

  function login(token: string, wallet: string) {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_wallet", wallet);

    setToken(token);
    setWallet(wallet);
  }

  function logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_wallet");

    setToken(null);
    setWallet(null);
  }

  return (
    <AuthContext.Provider value={{ token, wallet, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
