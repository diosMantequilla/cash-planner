# 💸 Cash Planner

Gestor de gastos colaborativo para parejas y grupos, con dashboard web, bot de WhatsApp para registro rápido y reportes automáticos.

---

## 🚀 Tecnologías usadas

- **Frontend:** React + Vite + TypeScript + TailwindCSS
- **Backend:** Express + TypeScript + Supabase (PostgreSQL)
- **Bot WhatsApp:** Baileys + TypeScript
- **Base de Datos:** Supabase.io

---

## 📦 Estructura del proyecto

cash-planner/
│
├── backend/ # API Express para recibir y servir datos
├── bot/ # Bot WhatsApp con Baileys
├── frontend/ # Aplicación web (dashboard)
├── README.md # Este archivo


---

## 🧩 Requisitos previos

- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- Cuenta en [Supabase](https://supabase.com/) (y credenciales .env)
- (Para bot) Un número de WhatsApp dedicado sólo para el bot

---

## ⚡ Instalación rápida

1. Clona el repositorio y entra al directorio:

    ```bash
    git clone <REPO_URL>
    cd cash-planner
    ```

2. **Copia las variables de entorno en cada módulo (`backend/`, `bot/`).**

3. **Instala dependencias en cada módulo:**

    ```bash
    cd backend && npm install
    cd ../bot && npm install
    cd ../frontend && npm install
    ```

---

## 🛠️ Cómo iniciar cada parte

### 1️⃣ **Backend (API Express)**
- Archivo de entorno `.env` requerido con tus claves de Supabase.
- Inicia el servidor:

    ```bash
    cd backend
    npm run dev
    ```

- Corre en [http://localhost:4000](http://localhost:4000)

---

### 2️⃣ **Bot de WhatsApp**
- Archivo `.env` con la variable `BACKEND_URL`.
- Primer uso: Borra la carpeta `auth_info` para escanear el QR y vincular el número.
- Inicia el bot:

    ```bash
    cd bot
    npm run dev
    ```

---

### 3️⃣ **Frontend (Dashboard Web)**
- TailwindCSS y React ya configurados.
- Archivo `.env` si quieres cambiar el endpoint del backend.
- Inicia la app:

    ```bash
    cd frontend
    npm run dev
    ```

- Abre [http://localhost:5173](http://localhost:5173)

---

## 🧑‍💻 **Funcionalidades actuales**

- ✅ Registro de gastos vía WhatsApp (formato: `monto, descripción`)
- ✅ Dashboard web con filtros (fecha, usuario, categoría, descripción)
- ✅ Paginación de 100 registros por vista
- ✅ Visualización de totales y reportes rápidos
- ✅ Listado único de usuarios, categorías y descripciones
- ✅ Validación de datos en bot y backend
- ✅ Estructura modular y lista para crecer

---

## 📒 Recursos y documentación

- [Supabase SQL Table example](#) <!-- agrega enlace si tienes script o instrucción -->
- [Documentación Baileys](https://github.com/WhiskeySockets/Baileys)
- [Tailwind CSS Docs](https://tailwindcss.com/docs/installation)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)

---

## ✨ Créditos y licencia

Creado por [Tu nombre o usuario]  
Licencia MIT

---
