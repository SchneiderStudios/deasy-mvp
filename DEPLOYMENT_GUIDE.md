# 🚀 Гайд по развертыванию DEASY на Vercel

## Проблема, которую мы исправили

Твой предыдущий проект был **просто статическими HTML файлами**, а Vercel ищет **Next.js структуру** с папкой `pages/`.

**Старая структура (неправильно):**
```
❌ Был только index.html, datenschutz.html, impressum.html
```

**Новая структура (правильно):**
```
✅ pages/index.tsx → рендерит index.html
✅ pages/datenschutz.tsx → рендерит datenschutz.html
✅ pages/impressum.tsx → рендерит impressum.html
✅ public/*.html → твои HTML файлы как статические ресурсы
```

---

## Шаг 1: Локальное тестирование (на своем компьютере)

### Установи Node.js и npm

```bash
# Проверь версию Node.js (должна быть 18+)
node --version
npm --version
```

### Установи зависимости

```bash
cd deasy-mvp-correct
npm install
```

### Запусти локально

```bash
npm run dev
```

Откройте в браузере: **http://localhost:3000** ✅

Проверь:
- главная страница `/`
- `localhost:3000/datenschutz`
- `localhost:3000/impressum`

---

## Шаг 2: Загрузи на GitHub

### Создай git репозиторий

```bash
cd deasy-mvp-correct
git init
git add .
git commit -m "DEASY MVP: Next.js + правильная структура для Vercel"
```

### Загрузи на GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/deasy-mvp.git
git branch -M main
git push -u origin main
```

**Замени `YOUR_USERNAME` на твой GitHub username**

---

## Шаг 3: Развертывание на Vercel

### Вариант А: Через веб-интерфейс (быстро)

1. Открой https://vercel.com
2. Кликни **"Add New..."** → **"Project"**
3. Выбери репо **"deasy-mvp"**
4. Кликни **"Import"**
5. Vercel автоматически определит **Next.js** проект
6. Кликни **"Deploy"**
7. Готово! 🎉 Твой проект live на `deasy-mvp-xxx.vercel.app`

### Вариант Б: Через Vercel CLI

```bash
npm install -g vercel
vercel
```

Следуй инструкциям в консоли.

---

## Шаг 4: Проверка результата

После развертывания:

1. Открой URL вида `https://deasy-mvp-xxx.vercel.app` ✅
2. Проверь все страницы:
   - `/` - главная
   - `/datenschutz` - политика конфиденциальности
   - `/impressum` - импрессум

---

## Если что-то не работает

### Проблема: "404 NOT_FOUND" или "This page doesn't exist"

**Решение:**
1. Жди 1-2 минуты, Vercel может еще собирать проект
2. Жми **Ctrl + Shift + R** (полный перезагрузка страницы)
3. Проверь, нет ли ошибок в Vercel Dashboard → твой проект → Deployments → Logs

### Проблема: "Build Error"

**Решение:**
1. Открой Vercel Dashboard → Deployments
2. Кликни на последний deployment
3. Посмотри **Build Logs** (красные ошибки)
4. Скопируй ошибку и пришли мне

---

## Дальнейшие обновления

Когда ты захочешь обновить сайт:

```bash
# Отредактируй files
# Например: public/index.html

git add .
git commit -m "Описание изменения"
git push
```

**Vercel автоматически перестроит проект** за 30-60 секунд ✅

---

## Структура проекта

```
deasy-mvp/
├── pages/
│   ├── index.tsx           ← Главная страница
│   ├── datenschutz.tsx     ← Политика конфиденциальности
│   ├── impressum.tsx       ← Импрессум
│   ├── _app.tsx            ← Приложение
│   └── _document.tsx       ← Документ (стили)
├── public/
│   ├── index.html          ← Твой HTML для главной
│   ├── datenschutz.html    ← Твой HTML для датащютц
│   └── impressum.html      ← Твой HTML для импрессума
├── next.config.js          ← Конфиг Next.js
├── tsconfig.json           ← Конфиг TypeScript
├── package.json            ← Зависимости
├── .gitignore              ← Git ignore
└── .env.example            ← Пример env vars
```

---

## Нужна помощь?

Если что-то не работает, дай мне знать:
1. Скриншот ошибки из Vercel Dashboard
2. Полный текст из "Build Logs"
3. Твой GitHub username

Готово! 🎉
