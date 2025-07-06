# React + TypeScript + Vite

# 🖥️ Frontend – Cash Planner

Dashboard web construido con React + Vite + TypeScript + TailwindCSS.

## 🛠️ Instalación

```bash
npm install

## 🚦 Comandos

Desarrollo:
npm run dev

## 🏗️ Estructura

src/components/
Header, filtros, tabla, paginación, etc.

src/api/
Funciones para consumir endpoints del backend

src/pages/Dashboard.tsx
Página principal, muestra tabla de gastos, filtros y total

src/types/gasto.ts
Tipos TypeScript

## 🎯 Funcionalidades

Filtros por fecha, categoría, usuario, descripción

Paginación de 100 registros por vista

Visualización de total filtrado en el header

Listado y autocompletado de usuarios/categorías/descripciones

UI responsiva y limpia con TailwindCSS

## 🧑‍💻 Personaliza en .env el endpoint del backend si lo necesitas
VITE_API_URL=http://localhost:4000

## 🏁 Inicia el dashboard y accede en http://localhost:5173

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
