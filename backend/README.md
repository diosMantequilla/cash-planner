# 🗄️ Backend – Cash Planner

API REST construida en Express + TypeScript, conectada a Supabase (PostgreSQL).

## 🛠️ Instalación

```bash
npm install

## ⚙️ Variables de entorno (.env)

SUPABASE_URL=...
SUPABASE_KEY=...
PORT=4000

## 🚦 Comandos

npm run dev

## 🔌 Endpoints principales

GET /gastos
Listado de gastos, admite filtros: desde, hasta, descripcion, categoria, usuario, paginación (offset, limit)

POST /gastos
Crea gasto. Cuerpo: { descripcion, monto, categoria, usuario } (fecha automática si no se manda)

GET /gastos/total
Suma el total de los montos filtrados

GET /usuarios
Lista de usuarios únicos

GET /descripciones
Lista de descripciones únicas

GET /categorias
Lista de categorías únicas

## 🏦 Estructura de tabla en Supabase

create table gastos (
  id serial primary key,
  descripcion text,
  monto numeric,
  categoria text,
  fecha timestamp,
  usuario text
);

Todos los datos validados en backend (no acepta montos negativos, campos vacíos, etc).


---
