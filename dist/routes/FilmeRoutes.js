"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const Validate_1 = require("../middlewares/Validate");
const FilmeController_1 = require("../controllers/FilmeController");
const AvaliacaoSchema_1 = require("../schemas/AvaliacaoSchema");
const express_1 = require("express");
const router = (0, express_1.Router)();
const filmeController = new FilmeController_1.FilmeController();
// As rotas de filmes que utilizam o middleware de autenticação
router.get('/', filmeController.getAll);
router.get('/top', filmeController.getTopFilme);
router.get('/search', filmeController.findBySearch);
router.get('/:id', filmeController.getById);
//router.post('/', verifyToken, validate(filmeSchema), filmeController.create);
//router.put('/:id', validate(filmeSchema), filmeController.update);
//router.delete('/:id', filmeController.delete);
//router.patch('/:id/desativar', filmeController.delete);
//router.patch('/:id/restaurar', filmeController.restore);
// Rotas para avaliações de filmes
router.patch("/nota/:id", AuthMiddleware_1.verifyToken, (0, Validate_1.validate)(AvaliacaoSchema_1.avaliacaoSchema), filmeController.avaliarFilme);
//router.delete("/:id/nota", verifyToken, filmeController.removerAvaliacao)
//router.get("/:id/avaliacoes", filmeController.getAvaliacoesFilme)
//router.get("/:id/minha-avaliacao", verifyToken, filmeController.getAvaliacaoUsuario)
exports.default = router;
