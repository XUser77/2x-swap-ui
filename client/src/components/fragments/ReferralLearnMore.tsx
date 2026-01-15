import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

export function ReferralLearnMore({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 bg-white">
        {/* Custom Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            How referrals work
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            When you refer a participant to 2xSwap, you receive 25% of the
            season points they earn through trading and liquidity provision.
          </p>

          <p className="text-sm text-gray-700 leading-relaxed">
            Points are attributed only while the referred wallet is active —
            defined as having executed at least one transaction in the last 30
            days.
          </p>

          <p className="text-sm text-gray-700 leading-relaxed">
            Referral points count toward your seasonal ranking and league
            progression, just like trading and liquidity points.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 leading-relaxed">
              Referral relationships are permanent once established. If a wallet
              becomes inactive and later resumes activity, referral attribution
              continues automatically.
            </p>
          </div>
        </div>

        {/* Footer Button */}
        <div className="px-6 pb-6">
          <button
            onClick={() => onOpenChange(false)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
