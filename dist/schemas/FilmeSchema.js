"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filmeSchema = void 0;
// schemas/FilmeSchema.ts
const zod_1 = require("zod");
exports.filmeSchema = zod_1.z.object({
    nome: zod_1.z.string(),
    diretor: zod_1.z.string(),
    anoLancamento: zod_1.z.number().int(),
    duracao: zod_1.z.number().int(),
    produtora: zod_1.z.string(),
    classificacao: zod_1.z.string(),
    poster: zod_1.z.string().url().optional(),
    generoId: zod_1.z.number().int(),
    sinopse: zod_1.z.string().optional(),
    status: zod_1.z.boolean().optional()
});
