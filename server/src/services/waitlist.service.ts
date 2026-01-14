import { prisma } from "../../lib/prisma";

export class WaitlistService {
  static async addEmail(email: string) {
    return prisma.waitlistMail.create({
      data: {
        email,
      },
    });
  }
}
