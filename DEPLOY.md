# Деплой KYE ROOM

Это готовая к публикации папка. Внутри только статика — ни сборки, ни зависимостей.

```
dist/
├── index.html        весь сайт: HTML + CSS + JS в одном файле
├── frames/           193 кадра скролл-анимации (webp, 1600px) — 15 МБ
├── img/              фото коллекции и секций (webp)
├── og.jpg            превью для соцсетей 1200×630
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── _headers          кэш-заголовки для Netlify / Cloudflare Pages
└── vercel.json       то же самое для Vercel
```

Общий вес — около 16 МБ, из них 15 МБ приходится на кадры анимации.

## Как выложить

**Netlify** — перетащите папку `dist` на app.netlify.com/drop. Файл `_headers` подхватится сам.

**Cloudflare Pages**
```bash
npx wrangler pages deploy dist --project-name kye-room
```

**Vercel**
```bash
cd dist && npx vercel --prod
```

**GitHub Pages** — см. раздел «Загрузка через git» ниже. Кэш-заголовки не поддерживаются, но сайт работает.

## Загрузка через git

В файлах 211 штук, а веб-интерфейс GitHub принимает не больше 100 за раз — поэтому только командная строка. Общий вес 16 МБ, самый крупный файл 126 КБ, так что ни в лимит репозитория, ни в Git LFS вы не упрётесь.

Сначала создайте на github.com пустой репозиторий — **без** галочек «Add a README» и «Add .gitignore», иначе при первом пуше будет конфликт.

Дальше в Терминале:

```bash
cd ~/Documents/Claude/Projects/Kye_room/dist

git init -b main
git add .
git commit -m "KYE ROOM — сайт со скролл-анимацией"
git remote add origin https://github.com/ВАШ_ЛОГИН/kye-room.git
git push -u origin main
```

Все 211 файлов уйдут одним пушем.

### Если есть GitHub CLI

Тогда репозиторий создавать вручную не нужно:

```bash
cd ~/Documents/Claude/Projects/Kye_room/dist
git init -b main && git add . && git commit -m "KYE ROOM"
gh repo create kye-room --public --source=. --push
```

### Про пароль

На `git push` GitHub спросит логин и пароль. Обычный пароль от аккаунта он больше не принимает — нужен personal access token: **Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token**, отметить область `repo`. Токен вставляется в поле пароля. Чтобы не вводить его каждый раз:

```bash
git config --global credential.helper osxkeychain
```

С `gh auth login` этот шаг не нужен — CLI сам всё настроит.

### Включить GitHub Pages

В репозитории: **Settings → Pages → Source: Deploy from a branch → Branch: main → / (root) → Save**. Через минуту сайт откроется на `https://ВАШ_ЛОГИН.github.io/kye-room/`.

Файл `.nojekyll` в папке уже лежит — без него GitHub Pages выбросил бы `_headers` (Jekyll игнорирует всё, что начинается с подчёркивания).

### Обновить сайт потом

```bash
cd ~/Documents/Claude/Projects/Kye_room/dist
git add .
git commit -m "что изменилось"
git push
```

**Свой nginx**
```nginx
server {
    root /var/www/kyeroom;
    index index.html;

    location ~* \.(webp|jpg|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    location = /index.html {
        add_header Cache-Control "no-cache";
    }
}
```

## Проверить локально перед публикацией

```bash
cd dist && python3 -m http.server 8000
```
Откройте http://localhost:8000 — из `file://` часть браузеров не отдаст кадры.

## Что заменить перед запуском

1. **Домен.** Строки `https://kyeroom.com` в `index.html` (canonical, og:url, og:image), `robots.txt`, `sitemap.xml`.
2. **Контакты.** Телефон и почта в секции `#contact` — сейчас заглушки `+7 000 000 00 00` и `hello@kyeroom.com`.
3. **Форма.** Сейчас она только показывает сообщение об успехе. Подключите к своей CRM или сервису форм в обработчике `f.addEventListener("submit", …)` внизу `index.html`.
4. **Карточки коллекции.** Названия Steppe / Wave / Gobelin и материалы придуманы под фото — поправьте на реальные.

## Как настроить анимацию

| Что | Где в `index.html` |
|---|---|
| Скорость: больше высота — медленнее прокрутка | `#hero { height: 700vh }` |
| Плавность: меньше значение — мягче | `current += (target - current) * 0.18` |
| Число кадров | `var TOTAL = 193` |

## Если 15 МБ кадров это много

Оставьте каждый второй кадр — анимация станет чуть менее плавной, вес упадёт вдвое:

```bash
cd dist/frames
i=0; for f in f*.webp; do i=$((i+1)); [ $((i % 2)) -eq 0 ] && rm "$f"; done
# затем перенумеровать и поставить var TOTAL = 97 в index.html
```

Либо пережать сильнее: `-quality 60` вместо `72` даёт примерно 10 МБ без заметной потери на движении.
