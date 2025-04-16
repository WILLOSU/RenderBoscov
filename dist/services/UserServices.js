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
// UserServices.ts
const PrismaService_1 = require("./PrismaService");
const userService = {
    createUser: (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield PrismaService_1.prisma.usuario.create({ data });
    }),
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield PrismaService_1.prisma.usuario.findMany();
    }),
    getUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield PrismaService_1.prisma.usuario.findUnique({ where: { id } });
    }),
    findByIdService: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield PrismaService_1.prisma.usuario.findUnique({ where: { id } });
    }),
    updateUser: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield PrismaService_1.prisma.usuario.update({
            where: { id },
            data,
        });
    }),
    deleteUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield PrismaService_1.prisma.usuario.delete({ where: { id } });
    }),
};
exports.default = userService; // Exporte como padrão
