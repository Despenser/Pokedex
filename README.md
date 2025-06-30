# React + Vite
# PokéDex - Энциклопедия покемонов

Современное веб-приложение для просмотра и поиска информации о покемонах, разработанное с использованием React, Vite, Zustand и других современных технологий.

## Функциональность

- Просмотр списка покемонов с бесконечной прокруткой
- Подробная информация о каждом покемоне
- Поиск по имени или номеру покемона
- Фильтрация по типу покемона
- Адаптивный дизайн для мобильных и десктопных устройств

## Технологический стек

- **React 19** - для создания пользовательского интерфейса
- **Vite** - для быстрой сборки и разработки
- **Zustand** - для управления состоянием приложения
- **React Router** - для навигации
- **Tailwind CSS** - для стилизации
- **Axios** - для работы с API
- **PokéAPI** - внешний API для получения данных о покемонах

## Установка и запуск

1. Клонировать репозиторий
   ```bash
   git clone <url-репозитория>
   cd pokedex
   ```

2. Установить зависимости
   ```bash
   npm install
   ```

3. Запустить в режиме разработки
   ```bash
   npm run dev
   ```

4. Для сборки продакшн версии
   ```bash
   npm run build
   ```

## Структура проекта

- `src/components` - переиспользуемые компоненты
- `src/pages` - компоненты страниц
- `src/store` - управление состоянием (Zustand)
- `src/assets` - статические ресурсы

## API

Приложение использует открытый [PokéAPI](https://pokeapi.co/) для получения данных о покемонах.

## Лицензия

MIT
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
