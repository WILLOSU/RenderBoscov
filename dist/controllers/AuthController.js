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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AuthService_1 = require("../services/AuthService");
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                // Busca o usuário no banco de dados
                const user = yield (0, AuthService_1.loginService)(email);
                if (!user) {
                    console.log("Usuário não encontrado");
                    res.status(404).json({ message: 'Usuário ou senha inválidos' });
                    return;
                }
                // Verifica a senha comparando o hash armazenado com a senha fornecida
                const passwordIsValid = yield bcryptjs_1.default.compare(password, user.senha);
                if (!passwordIsValid) {
                    console.log("Senha inválida");
                    res.status(404).json({ message: 'Usuário ou senha inválidos' });
                    return;
                }
                // Se a senha for válida, gera o token
                const token = (0, AuthService_1.generateToken)(user.id);
                // Remover a senha do objeto de resposta
                const { senha } = user, userWithoutPassword = __rest(user, ["senha"]);
                // Retorna o token e os dados do usuário sem a senha
                res.status(200).json({
                    token,
                    user: userWithoutPassword,
                });
            }
            catch (error) {
                console.error('Erro no login:', error);
                res.status(500).json({ message: 'Erro ao autenticar usuário' });
            }
        });
    }
}
exports.AuthController = AuthController;
