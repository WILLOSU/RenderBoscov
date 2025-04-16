"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const avaliacaoController = __importStar(require("../controllers/AvaliacaoController"));
const Validate_1 = require("../middlewares/Validate");
const AvaliacaoSchema_1 = require("../schemas/AvaliacaoSchema");
const router = express_1.default.Router();
// Aplicando o middleware de validação para criar e atualizar
router.post('/', (0, Validate_1.validate)(AvaliacaoSchema_1.avaliacaoSchema), avaliacaoController.criar);
router.get('/', avaliacaoController.listar);
router.get('/:id', avaliacaoController.buscarPorId);
router.put('/:id', (0, Validate_1.validate)(AvaliacaoSchema_1.avaliacaoSchema), avaliacaoController.atualizar);
router.delete('/:id', avaliacaoController.deletar);
// Essa rota provavelmente não recebe corpo, então não precisa de validação
router.get('/verificar', avaliacaoController.verificarAvaliacao);
exports.default = router;
