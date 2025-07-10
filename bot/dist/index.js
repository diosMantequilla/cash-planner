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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
function startBot() {
    return __awaiter(this, void 0, void 0, function* () {
        const { state, saveCreds } = yield (0, baileys_1.useMultiFileAuthState)('auth_info');
        const sock = (0, baileys_1.default)({ auth: state });
        sock.ev.on('creds.update', saveCreds);
        sock.ev.on('messages.upsert', (_a) => __awaiter(this, [_a], void 0, function* ({ messages }) {
            var _b;
            const msg = messages[0];
            if (!((_b = msg.message) === null || _b === void 0 ? void 0 : _b.conversation))
                return;
            const text = msg.message.conversation.trim();
            const parts = text.split(',');
            if (parts.length < 2) {
                yield sock.sendMessage(msg.key.remoteJid, { text: 'Formato: monto, descripcion\nEjemplo: 120, Super' });
                return;
            }
            const montoStr = parts[0].trim().replace(',', '.');
            const descripcion = parts.slice(1).join(',').trim();
            const monto = parseFloat(montoStr);
            if (isNaN(monto) || monto <= 0 ||
                !descripcion || descripcion.length === 0) {
                yield sock.sendMessage(msg.key.remoteJid, { text: 'Datos inválidos. El monto debe ser un número mayor a 0 y la descripción no debe estar vacía.\nEjemplo: 120, Super' });
                return;
            }
            const fecha = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
            try {
                yield axios_1.default.post(`${process.env.BACKEND_URL}/gastos`, {
                    descripcion,
                    monto,
                    categoria: 'Sin categoría',
                    fecha,
                    usuario: msg.pushName || msg.participant || 'Anon'
                });
                yield sock.sendMessage(msg.key.remoteJid, { text: '¡Gasto registrado!' });
            }
            catch (e) {
                yield sock.sendMessage(msg.key.remoteJid, { text: 'Error registrando gasto 😓' });
            }
        }));
        sock.ev.on('connection.update', (update) => {
            const { connection, qr } = update;
            if (qr) {
                console.log('====== ESCANEA ESTE QR EN TU CELULAR ======');
                console.log(qr);
                console.log('===========================================');
            }
            if (connection === 'open') {
                console.log('¡Bot conectado y autenticado!');
            }
            if (connection === 'close') {
                console.log('Bot desconectado. Vuelve a correr el bot.');
            }
        });
    });
}
startBot();
