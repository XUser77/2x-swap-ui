export function shareReferralOnTwitter(referralCode: string) {
  const text = `
Join me on @2xSwap — a DeFi protocol for leveraged trading and liquidity provision.

Use my referral after connect your wallet:
${referralCode}

#DeFi #Crypto #2xSwap
`.trim();

  window.open(
    `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`,
    "_blank",
    "noopener,noreferrer"
  );
}
