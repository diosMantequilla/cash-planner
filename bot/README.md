# 🤖 Bot de WhatsApp – Cash Planner

Registra gastos directo desde WhatsApp usando el formato:  
`monto, descripcion`

---

## ⚙️ Variables de entorno (`.env`)

.env
BACKEND_URL=http://localhost:4000


## 🛠️ Instalación y uso

npm install
npm run dev


Primer uso:
Borra la carpeta auth_info si existe, así puedes escanear el QR.

Escanea el QR con tu WhatsApp (número dedicado para el bot).

Escribe en un grupo (donde esté el bot):
80, Tacos
350, Super

El bot responde con confirmación o error de formato.

## 🧩 Notas

No uses tu WhatsApp personal para el bot.

Valida datos antes de enviar al backend.

Fecha se asigna automáticamente al recibir el gasto.