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
exports.generateToken = exports.loginService = void 0;
const Client_1 = __importDefault(require("../prisma/Client"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JwtConfig_1 = require("../config/JwtConfig");
// Busca o usuário no banco pelo email
const loginService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Client_1.default.usuario.findUnique({
        where: { email },
    });
});
exports.loginService = loginService;
// Gera o token JWT
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, JwtConfig_1.jwtSecret, {
        expiresIn: JwtConfig_1.jwtExpiresIn,
    });
};
exports.generateToken = generateToken;
// 1º JWT usando a assinatura MD5  = jwtSecret
// 2º é o dado do usuário é o ID   = userID. (posso passar mais)
// 3º OPTIONS  tempo para expirar  = jwtSecret 
