"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../documentacao/swagger.json"));
router.use("/", swagger_ui_express_1.default.serve);
router.get("/", swagger_ui_express_1.default.setup(swagger_json_1.default));
exports.default = router;
