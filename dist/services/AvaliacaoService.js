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
exports.AvaliacaoService = void 0;
const Client_1 = __importDefault(require("../prisma/Client"));
class AvaliacaoService {
    criar(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Client_1.default.avaliacao.create({ data });
        });
    }
    listar() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Client_1.default.avaliacao.findMany({
                include: {
                    usuario: true,
                    filme: true,
                },
            });
        });
    }
    buscarPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Client_1.default.avaliacao.findUnique({
                where: { id },
                include: {
                    usuario: true,
                    filme: true,
                },
            });
        });
    }
    atualizar(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Client_1.default.avaliacao.update({
                where: { id },
                data,
            });
        });
    }
    deletar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Client_1.default.avaliacao.delete({
                where: { id },
            });
        });
    }
    verificarAvaliacao(idUsuario, idFilme) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Client_1.default.avaliacao.findFirst({
                where: {
                    idUsuario,
                    idFilme,
                },
            });
        });
    }
}
exports.AvaliacaoService = AvaliacaoService;
