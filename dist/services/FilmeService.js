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
exports.calcularMediaAvaliacoesFilme = exports.getAvaliacoesByFilmeId = exports.getAvaliacaoByUserAndFilme = exports.deleteAvaliacao = exports.updateAvaliacao = exports.createAvaliacao = exports.converterNotaParaEstrelasQuartos = exports.validarNotaFilme = exports.findFilmesByNome = exports.countFilmesByNome = exports.restoreFilme = exports.deleteFilme = exports.updateFilme = exports.createFilme = exports.getFilmeById = exports.topFilme = exports.countFilmes = exports.getAllFilmes = void 0;
// src/services/FilmeService.ts
const PrismaService_1 = require("./PrismaService");
const getAllFilmes = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (limit = 5, offset = 0) {
    // Aqui mantemos a implementação do Prisma para paginação
    return yield PrismaService_1.prisma.filme.findMany({
        skip: offset,
        take: limit,
        orderBy: {
            id: 'desc' // do último postado
        }
    });
});
exports.getAllFilmes = getAllFilmes;
const countFilmes = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield PrismaService_1.prisma.filme.count();
});
exports.countFilmes = countFilmes;
const topFilme = () => __awaiter(void 0, void 0, void 0, function* () {
    const filmes = yield PrismaService_1.prisma.filme.findMany({
        include: {
            avaliacao: true,
            genero: true
        }
    });
    if (!filmes.length)
        return null;
    // Calcula a média das avaliações de cada filme e retorna o que tiver a maior média
    return filmes
        .map(filme => {
        const totalNotas = filme.avaliacao.reduce((somaNotas, avaliacaoAtual) => {
            return somaNotas + avaliacaoAtual.nota;
        }, 0);
        const mediaNotas = filme.avaliacao.length > 0
            ? totalNotas / filme.avaliacao.length
            : 0;
        return Object.assign(Object.assign({}, filme), { media: mediaNotas });
    })
        .sort((filmeA, filmeB) => filmeB.media - filmeA.media)[0]; // Retorna o filme com a maior média
});
exports.topFilme = topFilme;
const getFilmeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PrismaService_1.prisma.filme.findUnique({
        where: { id },
        include: {
            genero: true,
            avaliacao: {
                include: {
                    usuario: {
                        select: {
                            id: true,
                            nome: true,
                            email: true,
                            apelido: true,
                        },
                    },
                },
            },
        },
    }); // busca no bd usar await
});
exports.getFilmeById = getFilmeById;
const createFilme = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PrismaService_1.prisma.filme.create({ data });
});
exports.createFilme = createFilme;
const updateFilme = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PrismaService_1.prisma.filme.update({
        where: { id },
        data,
    });
});
exports.updateFilme = updateFilme;
const deleteFilme = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PrismaService_1.prisma.filme.update({
        where: { id },
        data: {
            status: false,
            dataAtualizacao: new Date(),
        },
    });
});
exports.deleteFilme = deleteFilme;
const restoreFilme = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PrismaService_1.prisma.filme.update({
        where: { id },
        data: {
            status: true,
            dataAtualizacao: new Date(),
        },
    });
});
exports.restoreFilme = restoreFilme;
// Contar filmes pelo nome
const countFilmesByNome = (nome) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PrismaService_1.prisma.filme.count({
        where: {
            nome: {
                contains: nome.toLowerCase(),
                //mode: 'insensitive'
            }
        }
    });
});
exports.countFilmesByNome = countFilmesByNome;
// Buscar filmes pelo nome com paginação
const findFilmesByNome = (nome_1, ...args_1) => __awaiter(void 0, [nome_1, ...args_1], void 0, function* (nome, limit = 5, offset = 0) {
    return yield PrismaService_1.prisma.filme.findMany({
        where: {
            nome: {
                contains: nome.toLowerCase(),
                // mode: 'insensitive'
            },
        },
        skip: offset,
        take: limit,
        orderBy: {
            nome: 'asc'
        },
    });
});
exports.findFilmesByNome = findFilmesByNome;
// Funções para avaliações de filmes
// Função para validar a nota do filme
const validarNotaFilme = (nota) => {
    return nota >= 1 && nota <= 10;
};
exports.validarNotaFilme = validarNotaFilme;
// Função para converter a nota para estrelas (com granularidade de quartos)
const converterNotaParaEstrelasQuartos = (nota, maxEstrelas = 5) => {
    if (!(0, exports.validarNotaFilme)(nota)) {
        console.warn(`A nota ${nota} está fora do intervalo válido (1 - 10).`);
        return 0;
    }
    const escalaQuartosEstrelas = ((nota - 1) * (maxEstrelas * 4)) / 9;
    const quartosArredondados = Math.round(escalaQuartosEstrelas) / 4;
    return Math.min(maxEstrelas, Math.max(0, quartosArredondados));
};
exports.converterNotaParaEstrelasQuartos = converterNotaParaEstrelasQuartos;
// Criar nova avaliação
const createAvaliacao = (idUsuario, idFilme, nota, comentario) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PrismaService_1.prisma.avaliacao.create({
        data: {
            idUsuario,
            idFilme,
            nota,
            comentario,
        },
        include: {
            usuario: {
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    apelido: true,
                },
            },
        },
    });
});
exports.createAvaliacao = createAvaliacao;
// Atualizar avaliação existente
const updateAvaliacao = (id, nota, comentario) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PrismaService_1.prisma.avaliacao.update({
        where: { id },
        data: {
            nota,
            comentario,
        },
        include: {
            usuario: {
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    apelido: true,
                },
            },
        },
    });
});
exports.updateAvaliacao = updateAvaliacao;
// FUTURO
// Remover avaliação
const deleteAvaliacao = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PrismaService_1.prisma.avaliacao.delete({
        where: { id },
    });
});
exports.deleteAvaliacao = deleteAvaliacao;
// Buscar avaliação por usuário e filme
const getAvaliacaoByUserAndFilme = (idUsuario, idFilme) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PrismaService_1.prisma.avaliacao.findFirst({
        where: {
            idUsuario,
            idFilme,
        },
        include: {
            usuario: {
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    apelido: true,
                },
            },
        },
    });
});
exports.getAvaliacaoByUserAndFilme = getAvaliacaoByUserAndFilme;
// Buscar todas as avaliações de um filme
const getAvaliacoesByFilmeId = (idFilme) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PrismaService_1.prisma.avaliacao.findMany({
        where: { idFilme },
        include: {
            usuario: {
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    apelido: true,
                },
            },
        },
        orderBy: {
            id: "desc",
        },
    });
});
exports.getAvaliacoesByFilmeId = getAvaliacoesByFilmeId;
// Calcular média de avaliações de um filme
const calcularMediaAvaliacoesFilme = (idFilme) => __awaiter(void 0, void 0, void 0, function* () {
    const avaliacoes = yield PrismaService_1.prisma.avaliacao.findMany({
        where: { idFilme },
        select: { nota: true },
    });
    if (avaliacoes.length === 0) {
        return 0;
    }
    const somaNotas = avaliacoes.reduce((sum, avaliacao) => sum + avaliacao.nota, 0);
    return somaNotas / avaliacoes.length;
});
exports.calcularMediaAvaliacoesFilme = calcularMediaAvaliacoesFilme;
