import { prisma } from "../lib/prisma.js";

export class WaitlistService {
  static async addEmail(email: string) {
    return prisma.waitlistMail.create({
      data: {
        email,
      },
    });
  }
}
