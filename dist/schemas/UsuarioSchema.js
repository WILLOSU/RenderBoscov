"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioSchema = void 0;
const zod_1 = require("zod");
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
exports.usuarioSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1, 'Nome é obrigatório'),
    senha: zod_1.z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    email: zod_1.z.string()
        .regex(emailRegex, 'E-mail inválido, verifique o formato ex: nome@dominio.com'),
    apelido: zod_1.z.string().optional(),
    dataNascimento: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Data de nascimento inválida',
    }),
    tipoUsuarioId: zod_1.z.number({ invalid_type_error: 'Tipo de usuário deve ser um número' }),
});
