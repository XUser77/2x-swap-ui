import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { useSignMessage } from "wagmi";

export function useWalletAuth() {
  const { signMessageAsync } = useSignMessage();
  const { login: setAuth, logout, token, wallet } = useAuth();
  const queryClient = useQueryClient();

  async function login(walletAddress: string) {
    const { data } = await api.post("/api/auth/nonce", {
      wallet: walletAddress,
    });

    const signature = await signMessageAsync({
      message: data.nonce,
    });

    const res = await api.post("/api/auth/login", {
      wallet: walletAddress,
      signature,
    });

    setAuth(res.data.token, walletAddress);

    queryClient.invalidateQueries({ queryKey: ["season-status"] });

    return res.data.user;
  }

  function isLoggedIn() {
    return Boolean(token);
  }

  return { login, logout, isLoggedIn, authWallet: wallet };
}
