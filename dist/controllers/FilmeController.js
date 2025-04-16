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
exports.FilmeController = void 0;
const FilmeService_1 = require("../services/FilmeService");
class FilmeController {
    // Buscar todos os filmes com paginação
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, offset } = req.query;
                let numLimit = Number(limit);
                let numOffset = Number(offset);
                if (!numLimit) {
                    numLimit = 5;
                }
                if (!numOffset) {
                    numOffset = 0;
                }
                // Paginação
                const filmes = yield (0, FilmeService_1.getAllFilmes)(numLimit, numOffset);
                const total = yield (0, FilmeService_1.countFilmes)();
                const currentUrl = req.baseUrl;
                // Calcular próxima página
                const next = numOffset + numLimit;
                const nextUrl = next < total ? `${currentUrl}?limit=${numLimit}&offset=${next}` : null;
                // Calcular página anterior
                const previous = numOffset - numLimit < 0 ? null : numOffset - numLimit;
                const previousUrl = previous != null ? `${currentUrl}?limit=${numLimit}&offset=${previous}` : null;
                if (filmes.length === 0) {
                    res.status(200).json({ message: "Não há filmes cadastrados" });
                    return;
                }
                res.status(200).json({
                    nextUrl,
                    previousUrl,
                    limit: numLimit,
                    offset: numOffset,
                    total,
                    results: filmes,
                });
            }
            catch (error) {
                console.error("Erro ao buscar filmes:", error);
                res.status(500).json({ error: "Erro ao buscar filmes" });
            }
        });
    }
    // Melhor Nota Filme !!
    getTopFilme(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const filme = yield (0, FilmeService_1.topFilme)();
                if (!filme) {
                    res.status(400).send({ message: "There is no registered movie" });
                    return;
                }
                res.status(200).send({
                    movie: {
                        id: filme.id,
                        nome: filme.nome,
                        diretor: filme.diretor,
                        anoLancamento: filme.anoLancamento,
                        duracao: filme.duracao,
                        produtora: filme.produtora,
                        classificacao: filme.classificacao,
                        poster: filme.poster || null,
                        sinopse: filme.sinopse || "Sinopse não disponível",
                        avaliacao: filme.avaliacao || [],
                        genero: ((_a = filme.genero) === null || _a === void 0 ? void 0 : _a.nome) || "Gênero não definido",
                    },
                });
            }
            catch (error) {
                console.error("Erro ao buscar o filme:", error);
                if (error instanceof Error) {
                    res.status(500).send({ message: error.message });
                }
                else {
                    res.status(500).send({ message: "Erro desconhecido" });
                }
            }
        });
    }
    // Buscar filme por ID
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id); // desconstroíndo
                const filme = yield (0, FilmeService_1.getFilmeById)(id);
                if (!filme) {
                    res.status(404).json({ error: "Filme não encontrado" });
                    return;
                }
                res.status(200).json(filme);
            }
            catch (error) {
                console.error("Erro ao buscar filme:", error);
                res.status(500).json({ error: "Erro ao buscar filme" });
            }
        });
    }
    // Criar um novo filme
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const filme = yield (0, FilmeService_1.createFilme)(data);
                res.status(201).json(filme);
            }
            catch (error) {
                console.error("Erro ao criar filme:", error);
                res.status(500).json({ error: "Erro ao criar filme" });
            }
        });
    }
    // Atualizar um filme
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const data = req.body;
                const filme = yield (0, FilmeService_1.updateFilme)(id, data);
                res.status(200).json(filme);
            }
            catch (error) {
                console.error("Erro ao atualizar filme:", error);
                res.status(500).json({ error: "Erro ao atualizar filme" });
            }
        });
    }
    // Desativar (soft delete) um filme
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield (0, FilmeService_1.deleteFilme)(id);
                res.status(200).json({ message: "Filme desativado com sucesso" });
            }
            catch (error) {
                console.error("Erro ao desativar filme:", error);
                res.status(500).json({ error: "Erro ao desativar filme" });
            }
        });
    }
    // Reativar um filme
    restore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield (0, FilmeService_1.restoreFilme)(id);
                res.status(200).json({ message: "Filme reativado com sucesso" });
            }
            catch (error) {
                console.error("Erro ao reativar filme:", error);
                res.status(500).json({ error: "Erro ao reativar filme" });
            }
        });
    }
    // Pesquisando Filmes por Query String
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                console.log({ id });
                const filme = yield (0, FilmeService_1.getFilmeById)(id);
                if (!filme) {
                    res.status(404).json({ message: "Filme não encontrado" });
                    return;
                }
                // Retorna o filme diretamente sem estrutura adicional
                res.status(200).json(filme);
            }
            catch (error) {
                console.error("Erro ao buscar filme por ID:", error);
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "Erro desconhecido" });
                }
            }
        });
    }
    // Método para adicionar ao FilmeController.ts
    findBySearch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extrair parâmetros da query
                const nome = req.query.nome || "";
                const limit = Number(req.query.limit) || 5;
                const offset = Number(req.query.offset) || 0;
                // Buscar total de filmes correspondentes ao filtro
                const total = yield (0, FilmeService_1.countFilmesByNome)(nome);
                // Buscar filmes com o filtro aplicado
                const filmes = yield (0, FilmeService_1.findFilmesByNome)(nome, limit, offset);
                // Construir URLs para paginação
                const currentUrl = req.baseUrl;
                const next = offset + limit;
                const nextUrl = next < total ? `${currentUrl}?nome=${nome}&limit=${limit}&offset=${next}` : null;
                const previous = offset - limit < 0 ? null : offset - limit;
                const previousUrl = previous !== null ? `${currentUrl}?nome=${nome}&limit=${limit}&offset=${previous}` : null;
                // Retornar resultados
                res.status(200).json({
                    nextUrl,
                    previousUrl,
                    total,
                    limit,
                    offset,
                    results: filmes,
                });
            }
            catch (error) {
                console.error("Erro ao buscar filmes:", error);
                res.status(500).json({
                    message: error instanceof Error ? error.message : "Erro ao buscar filmes",
                });
            }
        });
    }
    // Adicionar ou atualizar avaliação de um filme
    avaliarFilme(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idFilme = Number(req.params.id);
                const idUsuario = req.userId; // ID do usuário autenticado
                const { nota, comentario } = req.body;
                // Verificar se o filme existe
                const filme = yield (0, FilmeService_1.getFilmeById)(idFilme);
                if (!filme) {
                    res.status(404).json({ message: "Filme não encontrado" });
                    return;
                }
                // Verificar se o usuário já avaliou este filme
                const avaliacaoExistente = yield (0, FilmeService_1.getAvaliacaoByUserAndFilme)(idUsuario, idFilme);
                let avaliacao;
                if (avaliacaoExistente) {
                    // Atualizar avaliação existente
                    avaliacao = yield (0, FilmeService_1.updateAvaliacao)(avaliacaoExistente.id, nota, comentario);
                    res.status(200).json({
                        message: "Avaliação atualizada com sucesso",
                        avaliacao: Object.assign(Object.assign({}, avaliacao), { estrelas: (0, FilmeService_1.converterNotaParaEstrelasQuartos)(nota) }),
                    });
                }
                else {
                    // Criar nova avaliação
                    avaliacao = yield (0, FilmeService_1.createAvaliacao)(idUsuario, idFilme, nota, comentario);
                    res.status(201).json({
                        message: "Avaliação criada com sucesso",
                        avaliacao: Object.assign(Object.assign({}, avaliacao), { estrelas: (0, FilmeService_1.converterNotaParaEstrelasQuartos)(nota) }),
                    });
                }
            }
            catch (error) {
                console.error("Erro ao avaliar filme:", error);
                res.status(500).json({
                    message: error instanceof Error ? error.message : "Erro interno do servidor",
                });
            }
        });
    }
    // Remover avaliação de um filme
    removerAvaliacao(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idFilme = Number(req.params.id);
                const idUsuario = req.userId;
                // Verificar se a avaliação existe
                const avaliacaoExistente = yield (0, FilmeService_1.getAvaliacaoByUserAndFilme)(idUsuario, idFilme);
                if (!avaliacaoExistente) {
                    res.status(404).json({ message: "Avaliação não encontrada" });
                    return;
                }
                // Remover avaliação
                yield (0, FilmeService_1.deleteAvaliacao)(avaliacaoExistente.id);
                res.status(200).json({ message: "Avaliação removida com sucesso" });
            }
            catch (error) {
                console.error("Erro ao remover avaliação:", error);
                res.status(500).json({
                    message: error instanceof Error ? error.message : "Erro interno do servidor",
                });
            }
        });
    }
    // Buscar todas as avaliações de um filme
    getAvaliacoesFilme(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idFilme = Number(req.params.id);
                // Verificar se o filme existe
                const filme = yield (0, FilmeService_1.getFilmeById)(idFilme);
                if (!filme) {
                    res.status(404).json({ message: "Filme não encontrado" });
                    return;
                }
                // Buscar avaliações
                const avaliacoes = yield (0, FilmeService_1.getAvaliacoesByFilmeId)(idFilme);
                // Calcular média das notas
                const mediaNotas = yield (0, FilmeService_1.calcularMediaAvaliacoesFilme)(idFilme);
                // Converter para estrelas (escala de 5)
                const mediaEstrelas = (0, FilmeService_1.converterNotaParaEstrelasQuartos)(mediaNotas);
                res.status(200).json({
                    avaliacoes: avaliacoes.map((avaliacao) => (Object.assign(Object.assign({}, avaliacao), { estrelas: (0, FilmeService_1.converterNotaParaEstrelasQuartos)(avaliacao.nota) }))),
                    estatisticas: {
                        totalAvaliacoes: avaliacoes.length,
                        mediaNotas,
                        mediaEstrelas,
                    },
                });
            }
            catch (error) {
                console.error("Erro ao buscar avaliações:", error);
                res.status(500).json({
                    message: error instanceof Error ? error.message : "Erro interno do servidor",
                });
            }
        });
    }
    // Buscar a avaliação de um usuário específico para um filme
    getAvaliacaoUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idFilme = Number(req.params.id);
                const idUsuario = req.userId;
                // Buscar avaliação do usuário
                const avaliacao = yield (0, FilmeService_1.getAvaliacaoByUserAndFilme)(idUsuario, idFilme);
                if (!avaliacao) {
                    res.status(404).json({ message: "Avaliação não encontrada" });
                    return;
                }
                res.status(200).json({
                    avaliacao: Object.assign(Object.assign({}, avaliacao), { estrelas: (0, FilmeService_1.converterNotaParaEstrelasQuartos)(avaliacao.nota) }),
                });
            }
            catch (error) {
                console.error("Erro ao buscar avaliação do usuário:", error);
                res.status(500).json({
                    message: error instanceof Error ? error.message : "Erro interno do servidor",
                });
            }
        });
    }
}
exports.FilmeController = FilmeController;
