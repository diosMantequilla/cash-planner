import makeWASocket, { useMultiFileAuthState } from '@whiskeysockets/baileys';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');
  const sock = makeWASocket({ auth: state });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message?.conversation) return;

    const text = msg.message.conversation.trim();
    const parts = text.split(',');

    if (parts.length < 2) {
      await sock.sendMessage(msg.key.remoteJid!, { text: 'Formato: monto, descripcion\nEjemplo: 120, Super' });
      return;
    }

    const montoStr = parts[0].trim().replace(',', '.');
    const descripcion = parts.slice(1).join(',').trim();

    const monto = parseFloat(montoStr);

    if (
      isNaN(monto) || monto <= 0 ||
      !descripcion || descripcion.length === 0
    ) {
      await sock.sendMessage(
        msg.key.remoteJid!,
        { text: 'Datos inválidos. El monto debe ser un número mayor a 0 y la descripción no debe estar vacía.\nEjemplo: 120, Super' }
      );
      return;
    }

    const fecha = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    try {
      await axios.post(`${process.env.BACKEND_URL}/gastos`, {
        descripcion,
        monto,
        categoria: 'Sin categoría',
        fecha,
        usuario: msg.pushName || msg.participant || 'Anon'
      });
      await sock.sendMessage(msg.key.remoteJid!, { text: '¡Gasto registrado!' });
    } catch (e) {
      await sock.sendMessage(msg.key.remoteJid!, { text: 'Error registrando gasto 😓' });
    }
  });

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
}

startBot();
