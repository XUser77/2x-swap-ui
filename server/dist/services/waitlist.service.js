"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitlistService = void 0;
const prisma_js_1 = require("../lib/prisma.js");
class WaitlistService {
    static async addEmail(email) {
        return prisma_js_1.prisma.waitlistMail.create({
            data: {
                email,
            },
        });
    }
}
exports.WaitlistService = WaitlistService;
