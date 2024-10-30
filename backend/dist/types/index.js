"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.singInSchema = exports.SingUpSchema = void 0;
const zod_1 = require("zod");
exports.SingUpSchema = zod_1.z.object({
    username: zod_1.z.string().min(5),
    password: zod_1.z.string().min(6),
});
exports.singInSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
