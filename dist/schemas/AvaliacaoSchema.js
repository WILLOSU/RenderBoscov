"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avaliacaoSchema = void 0;
const zod_1 = require("zod");
exports.avaliacaoSchema = zod_1.z.object({
    filmeId: zod_1.z.number(),
    nota: zod_1.z.number().min(0).max(10),
    comentario: zod_1.z.string().optional()
});
