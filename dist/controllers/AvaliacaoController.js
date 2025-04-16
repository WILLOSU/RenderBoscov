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
exports.verificarAvaliacao = exports.deletar = exports.atualizar = exports.buscarPorId = exports.listar = exports.criar = void 0;
const AvaliacaoService_1 = require("../services/AvaliacaoService");
const service = new AvaliacaoService_1.AvaliacaoService();
const criar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioId = req.userId;
        if (!usuarioId) {
            res.status(401).json({ error: 'Usuário não autenticado' });
            return;
        }
        const novaAvaliacao = yield service.criar(Object.assign(Object.assign({}, req.body), { usuarioId }));
        res.status(201).json(novaAvaliacao);
    }
    catch (error) {
        console.error('Erro ao criar avaliação:', error);
        res.status(500).json({ error: 'Erro ao criar avaliação' });
    }
});
exports.criar = criar;
const listar = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const avaliacoes = yield service.listar();
        res.status(200).json(avaliacoes);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao listar avaliações' });
    }
});
exports.listar = listar;
const buscarPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const avaliacao = yield service.buscarPorId(id);
        if (avaliacao) {
            res.status(200).json(avaliacao);
        }
        else {
            res.status(404).json({ message: 'Avaliação não encontrada' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar avaliação' });
    }
});
exports.buscarPorId = buscarPorId;
const atualizar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const atualizada = yield service.atualizar(id, req.body);
        res.status(200).json(atualizada);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar avaliação' });
    }
});
exports.atualizar = atualizar;
const deletar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        yield service.deletar(id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao deletar avaliação' });
    }
});
exports.deletar = deletar;
const verificarAvaliacao = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idUsuario = Number(req.query.usuario);
        const idFilme = Number(req.query.filme);
        const avaliacao = yield service.verificarAvaliacao(idUsuario, idFilme);
        if (avaliacao) {
            res.status(200).json({ message: 'Usuário já avaliou este filme', avaliacao });
        }
        else {
            res.status(404).json({ message: 'Avaliação não encontrada' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao verificar avaliação' });
    }
});
exports.verificarAvaliacao = verificarAvaliacao;
