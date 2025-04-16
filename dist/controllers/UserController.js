"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
class UserController {
    // GET /usuarios
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield prisma.usuario.findMany({
                    where: { status: true },
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        apelido: true,
                        dataNascimento: true,
                        dataCriacao: true,
                        dataAtualizacao: true,
                        status: true,
                        tipousuario: true, // inclua apenas se necessário
                    }
                });
                res.json(users);
            }
            catch (error) {
                console.error('Erro ao buscar usuários:', error);
                res.status(500).json({ error: 'Erro ao buscar usuários' });
            }
        });
    }
    // GET /usuarios/:id
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (isNaN(id)) {
                    res.status(400).json({ error: 'ID inválido' });
                    return;
                }
                const user = yield prisma.usuario.findUnique({
                    where: { id },
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        apelido: true,
                        dataNascimento: true,
                        dataCriacao: true,
                        dataAtualizacao: true,
                        status: true,
                        tipousuario: true,
                    }
                });
                if (!user || !user.status) {
                    res.status(404).json({ error: 'Usuário não encontrado ou inativo' });
                    return;
                }
                res.json(user);
            }
            catch (error) {
                console.error('Erro ao buscar usuário por ID:', error);
                res.status(500).json({ error: 'Erro ao buscar usuário' });
            }
        });
    }
    // POST /usuarios
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome, senha, email, apelido, dataNascimento, tipoUsuarioId } = req.body;
                if (!nome || !senha || !email || !tipoUsuarioId || !dataNascimento) {
                    res.status(400).json({ error: 'Nome, email, senha, tipo de usuário e data de nascimento são obrigatórios' });
                    return;
                }
                const tipoUsuarioExistente = yield prisma.tipousuario.findUnique({
                    where: { id: Number(tipoUsuarioId) },
                });
                if (!tipoUsuarioExistente) {
                    res.status(400).json({ error: 'Tipo de usuário inválido ou inexistente' });
                    return;
                }
                const senhaCriptografada = yield bcrypt_1.default.hash(senha, 10);
                const user = yield prisma.usuario.create({
                    data: {
                        nome,
                        senha: senhaCriptografada,
                        email,
                        status: true,
                        apelido,
                        dataNascimento: new Date(dataNascimento),
                        dataCriacao: new Date(),
                        dataAtualizacao: new Date(),
                        tipoUsuarioId: Number(tipoUsuarioId)
                    }
                });
                res.status(201).json(user);
            }
            catch (error) {
                console.error('Erro ao criar usuário:', error);
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        });
    }
    // PUT /usuarios/:id
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (isNaN(id)) {
                    res.status(400).json({ error: 'ID inválido' });
                    return;
                }
                const { nome, senha, email, apelido, dataNascimento, tipoUsuarioId } = req.body;
                const user = yield prisma.usuario.update({
                    where: { id },
                    data: Object.assign(Object.assign(Object.assign({ nome,
                        senha,
                        email,
                        apelido }, (dataNascimento && { dataNascimento: new Date(dataNascimento) })), { dataAtualizacao: new Date() }), (tipoUsuarioId && { tipoUsuarioId: Number(tipoUsuarioId) }))
                });
                res.json(user);
            }
            catch (error) {
                console.error('Erro ao atualizar usuário:', error);
                res.status(500).json({ error: 'Erro ao atualizar usuário' });
            }
        });
    }
    // DELETE /usuarios/:id
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (isNaN(id)) {
                    res.status(400).json({ error: 'ID inválido' });
                    return;
                }
                const user = yield prisma.usuario.update({
                    where: { id },
                    data: {
                        status: false,
                        dataAtualizacao: new Date()
                    }
                });
                res.status(200).json({ message: 'Usuário desativado com sucesso', user });
            }
            catch (error) {
                console.error('Erro ao desativar usuário:', error);
                res.status(500).json({ error: 'Erro ao desativar usuário' });
            }
        });
    }
    // PATCH /usuarios/:id/restaurar
    restore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try { // tente fazer alguma coisa
                const id = Number(req.params.id);
                if (isNaN(id)) {
                    res.status(400).json({ error: 'ID inválido' });
                    return;
                }
                const user = yield prisma.usuario.update({
                    where: { id },
                    data: {
                        status: true,
                        dataAtualizacao: new Date()
                    }
                });
                res.status(200).json({ message: 'Usuário reativado com sucesso', user });
            }
            catch (error) { // se não der mostra o erro !!
                console.error('Erro ao reativar usuário:', error);
                res.status(500).json({ error: 'Erro ao reativar usuário' });
            }
        });
    }
}
exports.UserController = UserController;
