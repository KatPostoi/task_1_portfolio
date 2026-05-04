# Portfolio Website

Минимальный frontend-шаблон на React + TypeScript + Vite для нового проекта. После total cleanup приложение содержит одну базовую страницу `Hello world`, пустой layout-каркас и сохранённую Docker-инфраструктуру для дальнейшей разработки.

## Docker запуск

Docker остаётся основным способом работы с проектом.

### Dev

```bash
docker compose -f docker-compose.dev.yaml up --build
```

### Prod

```bash
docker compose -f docker-compose.prod.yaml up --build
```

По умолчанию используются:

- `WEBSITE_DEV_PORT=5173`
- `WEBSITE_PROD_PORT=4173`
- `VITE_DEV_SERVER_PORT=5173`

Оба compose-сценария работают как standalone frontend и не требуют внешней backend-сети.

## Локальный запуск без Docker

Команды запускать из `web_site/`:

```bash
npm install
npm run dev
npm run build
npm run preview
```

Рекомендуемая версия Node.js: `20.19.0` или новее в поддерживаемом диапазоне Vite 7 (`20.19+` или `22.12+`).

## Текущее состояние шаблона

После очистки в `src/` сохранены только базовые заготовки:

- `App.tsx` — корневой компонент;
- `components/layout/Layout.tsx` — пустой layout;
- `pages/HomePage.tsx` — минимальная главная страница;
- `hooks/` — пустой каталог под будущие хуки;
- `assets/styles/normalize.css` и пустой `assets/styles/root.css`;
- `assets/images/` — сохранённая структура каталогов без старых изображений.

## Healthcheck

`healthcheck.js` performs a GET request to `/` and is used by Docker to verify that the dev or prod container is serving the application.
