"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const Validate_1 = require("../middlewares/Validate");
const UsuarioSchema_1 = require("../schemas/UsuarioSchema");
const router = (0, express_1.Router)();
const userController = new UserController_1.UserController();
// ✅ Agora as rotas estão no caminho direto após "/usuarios"
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', (0, Validate_1.validate)(UsuarioSchema_1.usuarioSchema), userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.patch('/:id/restaurar', userController.restore);
exports.default = router;
