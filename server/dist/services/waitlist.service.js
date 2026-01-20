import { prisma } from "../lib/prisma";
export class WaitlistService {
    static async addEmail(email) {
        return prisma.waitlistMail.create({
            data: {
                email,
            },
        });
    }
}
