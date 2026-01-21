"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/user.routes.ts
const express_1 = require("express");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const user_controller_js_1 = require("../controllers/user.controller.js");
const router = (0, express_1.Router)();
router.get("/exists", user_controller_js_1.checkUserExists);
router.get("/season-status", auth_middleware_js_1.requireAuth, user_controller_js_1.getUserSeasonStatus);
exports.default = router;
