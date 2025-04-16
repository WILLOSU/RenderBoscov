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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneroController = void 0;
const PrismaService_1 = require("../services/PrismaService");
class GeneroController {
    // Buscar todos os gêneros (ativos)
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const generos = yield PrismaService_1.prisma.genero.findMany({
                    where: { status: true }
                });
                res.status(200).json(generos);
            }
            catch (error) {
                console.error('Erro ao buscar gêneros:', error);
                res.status(500).json({ error: 'Erro ao buscar gêneros' });
            }
        });
    }
    // Buscar gênero por ID
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const genero = yield PrismaService_1.prisma.genero.findUnique({ where: { id } });
                if (!genero) {
                    res.status(404).json({ error: 'Gênero não encontrado' });
                    return;
                }
                res.status(200).json(genero);
            }
            catch (error) {
                console.error('Erro ao buscar gênero:', error);
                res.status(500).json({ error: 'Erro ao buscar gênero' });
            }
        });
    }
    // Criar um novo gênero
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { descricao } = req.body;
                const genero = yield PrismaService_1.prisma.genero.create({
                    data: { descricao },
                });
                res.status(201).json(genero);
            }
            catch (error) {
                console.error('Erro ao criar gênero:', error);
                res.status(500).json({ error: 'Erro ao criar gênero' });
            }
        });
    }
    // Atualizar um gênero
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const { descricao } = req.body;
                const genero = yield PrismaService_1.prisma.genero.update({
                    where: { id },
                    data: { descricao },
                });
                res.status(200).json(genero);
            }
            catch (error) {
                console.error('Erro ao atualizar gênero:', error);
                res.status(500).json({ error: 'Erro ao atualizar gênero' });
            }
        });
    }
    // Desativar (inativar) um gênero
    desativar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const genero = yield PrismaService_1.prisma.genero.update({
                    where: { id },
                    data: { status: false },
                });
                res.status(200).json({ message: 'Gênero desativado com sucesso', genero });
            }
            catch (error) {
                console.error('Erro ao desativar gênero:', error);
                res.status(500).json({ error: 'Erro ao desativar gênero' });
            }
        });
    }
    // Reativar um gênero
    reativar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const genero = yield PrismaService_1.prisma.genero.update({
                    where: { id },
                    data: { status: true },
                });
                res.status(200).json({ message: 'Gênero reativado com sucesso', genero });
            }
            catch (error) {
                console.error('Erro ao reativar gênero:', error);
                res.status(500).json({ error: 'Erro ao reativar gênero' });
            }
        });
    }
}
exports.GeneroController = GeneroController;
