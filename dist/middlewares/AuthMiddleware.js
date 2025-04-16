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
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JwtConfig_1 = require("../config/JwtConfig");
const UserServices_1 = __importDefault(require("../services/UserServices"));
// Tipagem correta para funções assíncronas em middlewares Express
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            res.status(403).json({ message: 'Token não fornecido' });
            return; // Apenas sai da função, não retorna o objeto res
        }
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            res.status(403).json({ message: 'Formato do token inválido' });
            return; // Apenas sai da função
        }
        const token = parts[1];
        const decoded = jsonwebtoken_1.default.verify(token, JwtConfig_1.jwtSecret);
        const user = yield UserServices_1.default.findByIdService(decoded.id);
        if (!user || !user.id) {
            res.status(403).json({ message: 'Token inválido ou usuário não encontrado' });
            return; // Apenas sai da função
        }
        req.userId = user.id;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Token inválido ou expirado' });
        // Não chama next() aqui porque já enviou uma resposta
    }
});
exports.verifyToken = verifyToken;
