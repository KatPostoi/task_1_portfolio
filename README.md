# task_1_portfolio

Задание 1 портфолио с фронтендом в `web_site/` и рабочими спецификациями в `specs/`.

## Структура репозитория

- `web_site/` — минимальный React + TypeScript + Vite шаблон с обязательными Docker-сценариями.
- `specs/` — ревью, планы переименования и дальнейшие этапы рефакторинга.

## Основной запуск

```bash
cd web_site
docker compose -f docker-compose.dev.yaml up --build
```

## Альтернативный локальный запуск

```bash
cd web_site
npm install
npm run dev
```
