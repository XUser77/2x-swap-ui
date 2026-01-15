import { prisma } from "../../lib/prisma";
import { randomBytes } from "crypto";
import { verifyMessage } from "ethers";

export class AuthService {
  static async generateNonce(wallet: string) {
    const nonce = `Login-${randomBytes(8).toString("hex")}`;

    await prisma.user.upsert({
      where: { wallet: wallet.toLowerCase() },
      update: { nonce },
      create: {
        wallet,
        referralCode: randomBytes(4).toString("hex").toUpperCase(),
        nonce,
      },
    });

    return nonce;
  }

  static async verifySignature(wallet: string, signature: string) {
    const user = await prisma.user.findUnique({
      where: { wallet: wallet.toLowerCase() },
    });

    if (!user || !user.nonce) {
      throw new Error("Nonce not found. Request nonce first.");
    }

    const recovered = verifyMessage(user.nonce, signature);

    if (recovered.toLowerCase() !== wallet.toLowerCase()) {
      throw new Error("Invalid signature");
    }

    // Clear nonce (important!)
    await prisma.user.update({
      where: { id: user.id },
      data: { nonce: null },
    });

    return user;
  }
}
