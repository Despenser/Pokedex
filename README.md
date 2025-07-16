<p align="center">
  <img src="public/pokeball/pokeball-header.webp" alt="Poképedia Pokeball" width="120" style="animation:spin 2s linear infinite;"/>
</p>
<h1 align="center">
  Poképedia
</h1>

<p align="center">
  <img src="https://img.shields.io/github/stars/despenser/pokepedia?style=flat-square"/>
  <img src="https://img.shields.io/github/forks/despenser/pokepedia?style=flat-square"/>
  <img src="https://img.shields.io/github/license/despenser/pokepedia?style=flat-square"/>
  <img src="https://img.shields.io/badge/PR-welcome-brightgreen.svg?style=flat-square"/>
</p>

---

## 🚀 О проекте

**Poképedia** — это интерактивный сайт с мгновенным поиском, фильтрами, подробной страницей покемона, древом эволюции, анимациями и адаптивным дизайном. 
Также отдельными страницами выведены легендарные покемоны и избранные, которых вы можете добавить самостоятельно.

Все данные берутся из [PokeAPI](https://pokeapi.co/).

---

## 🛠️ Стек технологий

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=FFD62E)
![Zustand](https://img.shields.io/badge/Zustand-000?style=flat-square&logo=react&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square)
![PokeAPI](https://img.shields.io/badge/PokeAPI-2A75BB?style=flat-square)

---

## ✨ Основные фичи

- 🔎 **Поиск и фильтрация** по имени, типу, поколению
- 🏷️ **Бейджи поколений и типов** с анимацией
- ⭐ **Избранные покемоны** (хранятся в localStorage)
- 📱 **Адаптивный дизайн** (mobile first)
- ⚡ **Мгновенная подгрузка** (infinite scroll)
- 🦾 **Кеширование данных** (Zustand + localStorage)
- 🦄 **Анимации**: плавные переходы, skeleton loading, hover-эффекты
- 🧬 **Древо эволюции** и похожие покемоны
- 🛡️ **Обработка ошибок** и fallback-страницы
- 🌗 **Светлая/тёмная тема**
- ♿ **Доступность** (aria, контраст, фокус)

---

## 🔥 Демо

[![Демо Poképedia](https://img.shields.io/badge/DEMO-online-green?style=for-the-badge&logo=vercel)](https://pokepedia.ru)

---

## ⚡ Быстрый старт

```bash
# 1. Клонируйте репозиторий
$ git clone https://github.com/despenser/pokepedia.git
$ cd pokepedia

# 2. Установите зависимости
$ npm install

# 3. Запустите в режиме разработки
$ npm run dev

# 4. Сборка для продакшена
$ npm run build
```

---

## 🏗️ Структура проекта

```
├── public/                # Статические файлы, изображения
├── src/
│   ├── api/               # Работа с PokeAPI
│   ├── assets/            # Шрифты, иконки, переводы
│   ├── components/        # UI-компоненты
│   ├── hooks/             # Кастомные хуки
│   ├── pages/             # Страницы
│   ├── store/             # Zustand store
│   ├── styles/            # CSS, темы, анимации
│   └── utils/             # Вспомогательные функции
└── vite.config.js         # Конфиг Vite
```

---

## 🛡️ Безопасность и производительность

- **Заголовки безопасности**: рекомендуется настроить [CSP](https://developer.mozilla.org/ru/docs/Web/HTTP/CSP), [HSTS](https://developer.mozilla.org/ru/docs/Web/HTTP/Headers/Strict-Transport-Security), [X-Frame-Options], [X-Content-Type-Options], [Referrer-Policy].
- **Сжатие**: включено gzip/brotli (`vite-plugin-compression`).
- **Минификация и tree-shaking**: автоматом через Vite.
- **Удаление неиспользуемого CSS**: `vite-plugin-purgecss`.
- **Оптимизация изображений**: webp, srcSet, lazy loading, preload LCP.
- **Кеширование**: Zustand + localStorage, ограничение размера кеша.

---

## ♿ Accessibility

- Контрастность текста и фонов
- Фокус-стили для интерактивных элементов
- aria-label, alt для изображений
- Семантическая разметка (main, nav, section)
- Навигация с клавиатуры

---

## 🧑‍💻 Contributing

PR, баг-репорты и идеи приветствуются! Откройте issue или отправьте pull request.

---

## 📄 Лицензия

[MIT](LICENSE)


---

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-%E2%9D%A4-red?style=for-the-badge"/>
</p>
