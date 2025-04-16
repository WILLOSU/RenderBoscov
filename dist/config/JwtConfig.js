"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtExpiresIn = exports.jwtSecret = void 0;
exports.jwtSecret = process.env.JWT_SECRET || 'chave-padrao-dev';
exports.jwtExpiresIn = 86400; //24 horas
