import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  wallet: string;
  onComplete: () => void;
};

export default function ReferralModal({ open, wallet, onComplete }: Props) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (!open) return null;

  async function submit(referralCode?: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/api/referral/attach-referral", {
        wallet: wallet.toLowerCase(),
        referralCode,
      });

      if (!res.data?.success) {
        setError(res.data?.error ?? "Something went wrong");
        return;
      }

      onComplete();
      toast.success("Account created successfully");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to submit referral");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-2">Have a referral code?</h3>

        <p className="text-sm text-muted-foreground mb-4">
          Enter it now to earn bonus points. This can’t be changed later.
        </p>

        <input
          placeholder="Referral code (optional)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mb-4 w-full p-1 border-black border rounded-md"
        />

        <div className="flex gap-2">
          <button
            className="flex-1 bg-gray-200 py-1 rounded-xl disabled:opacity-80"
            onClick={() => submit()}
            disabled={loading}
          >
            Skip
          </button>

          <button
            className="flex-1 bg-[#113480] hover:bg-[#032368] text-white py-1 rounded-xl disabled:opacity-80"
            onClick={() => submit(code)}
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
