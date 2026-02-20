export function extractRevertReason(err: any): string {
  if (!err) return "Transaction failed";

  // viem shortMessage format
  if (err.shortMessage) {
    const lines = err.shortMessage.split("\n");
    return lines[lines.length - 1].trim();
  }

  // metaMessages (sometimes used)
  if (err.metaMessages?.length) {
    const last = err.metaMessages[err.metaMessages.length - 1];
    return last.trim();
  }

  // custom error decoding fallback
  if (err.cause?.reason) {
    return err.cause.reason;
  }

  if (err.message?.includes("User rejected")) {
    return "Transaction rejected by user";
  }

  return err.message || "Transaction failed";
}
