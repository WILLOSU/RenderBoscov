"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
// Configuração do ambiente
dotenv_1.default.config(); // sempre no topo
// Inicialização da aplicação
const app = (0, express_1.default)();
// Configuração de middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Importação das rotas
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const FilmeRoutes_1 = __importDefault(require("./routes/FilmeRoutes"));
const GeneroRoutes_1 = __importDefault(require("./routes/GeneroRoutes"));
const AvaliacaoRoutes_1 = __importDefault(require("./routes/AvaliacaoRoutes"));
const SwaggerRoutes_1 = __importDefault(require("./routes/SwaggerRoutes"));
// Configuração das rotas
app.use('/users', UserRoutes_1.default);
app.use('/auth', AuthRoutes_1.default);
app.use('/api', FilmeRoutes_1.default);
app.use('/generos', GeneroRoutes_1.default);
app.use('/avaliacao', AvaliacaoRoutes_1.default);
app.use('/doc', SwaggerRoutes_1.default);
// Define porta de forma segura para dev e produção
const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
