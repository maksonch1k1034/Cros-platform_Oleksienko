# Coffee first — кросплатформний застосунок кав'ярні

Монорепозиторій (`npm workspaces`) кросплатформного застосунку для автоматизації роботи кав'ярні «Coffee first» зі спільним ядром бізнес-логіки та платформними адаптерами збереження даних.

## Технологічний стек і компетентності

### Стисла таблиця стеку технологій

| Рівень архітектури | Технології у проєкті | Реалізація в репозиторії |
| :--- | :--- | :--- |
| **Рівень 1 – Платформи** | Веббраузери (Chrome, Edge), мобільні ОС (Android, iOS через Expo Go), десктопні ОС (Windows, macOS) | [packages/web](./packages/web), [packages/desktop](./packages/desktop), [coffee-first-mobile](../coffee-first-mobile) |
| **Рівень 2 – Клієнтські технології** | HTML5, CSS3, JavaScript (ES Modules), React 19, Vite, Tailwind CSS v4, React Native, Expo SDK 58, Electron 35 (Preload IPC) | [packages/web](./packages/web), [packages/desktop](./packages/desktop), [coffee-first-spa](../coffee-first-spa), [coffee-first-mobile](../coffee-first-mobile) |
| **Рівень 3 – Спільний код** | JavaScript (ES Modules), `npm workspaces`, `importmap`, `localStorage`, `fs/promises`, `node:test` | [packages/core](./packages/core), [packages/web](./packages/web), [packages/desktop](./packages/desktop) |
| **Рівень 4 – Сервер і API** | Node.js (ES Modules), Express 5, Apollo Server (GraphQL), Mongoose ODM, JWT (`jsonwebtoken`), `bcryptjs`, `node:http` | [packages/web](./packages/web), [smart-notes-server](../smart-notes-server), [graphql-auth-lab3](../graphql-auth-lab3) |
| **Рівень 5 – База даних** | MongoDB Atlas (хмарна документно-орієнтована NoSQL БД), Mongoose Schema | [smart-notes-server](../smart-notes-server) |

### Історія проєкту та компетентності

| Параметр | Опис |
| :--- | :--- |
| **Назва проєкту** | Coffee first |
| **Проблема (що розв'язує застосунок і для кого призначений)** | Забезпечує єдиний інструмент для обліку, пошуку та оновлення асортименту кав'ярні на різних типах пристроїв без дублювання бізнес-логіки. Застосунок призначений для трьох ролей: клієнтів (перегляд меню, пошук і фільтрація позицій), працівників кав'ярні (швидкий доступ до актуального переліку напоїв і десертів на робочому місці) та адміністраторів (додавання, редагування та видалення позицій меню). |
| **Моя роль і внесок** | Full-Stack та Cross-Platform розробник. Самостійно спроєктував п'ятирівневу архітектуру системи, виділив платформонезалежне ядро `@coffee-first/core`, реалізував веб-, мобільний та десктопний клієнти, розробив сервери REST і GraphQL API, підключив хмарну БД MongoDB Atlas та написав 24 модульні автотести. |
| **Обраний стек технологій (обґрунтування вибору на кожному рівні)** | На клієнтському рівні обрано єдину мовну екосистему JavaScript, що дозволяє переносити підходи між платформами: стандартні вебтехнології та React забезпечують швидкий рендеринг у браузері, React Native (Expo) дає нативний мобільний інтерфейс зі знайомою компонентною моделлю, а Electron дозволяє запакувати вебінтерфейс у десктопну програму з контрольованим доступом до ОС. На рівні спільного коду обрано чисті ES-модулі без сторонніх фреймворків для повної незалежності бізнес-логіки від середовища виконання. На рівні сервера та БД обрано Node.js із документною базою даних, оскільки наскрізна робота з об'єктами у форматі JSON усуває необхідність складного перетворення типів між клієнтом, API та сховищем. |
| **Найскладніший кросплатформний виклик і рішення** | Основним викликом стала уніфікація бізнес-логіки (валідації назв позицій, пошуку, сортування та санітизації даних) для середовищ із принципово різними механізмами збереження: браузерним `localStorage` у вебі та асинхронним записом у локальний JSON-файл через `fs/promises` і безпечний міст `window.coffeeAPI` в ізольованому вікні Electron. Проблему вирішено застосуванням патерну Dependency Injection (DI): у пакеті `@coffee-first/core` створено абстрактний клас `CoffeeStorageAdapter`, а конкретні реалізації (`LocalStorageAdapter` та `FileStorageAdapter`) передаються у `CoffeeService` під час ініціалізації відповідного клієнта. |
| **Здобуті знання та вміння (підсумок за всім проєктом)** | Опановано повний цикл кросплатформної розробки: організацію монорепозиторіїв (`npm workspaces`), відділення доменної бізнес-логіки від інтерфейсу користувача, налаштування безпечної міжпроцесної взаємодії (Preload IPC) в Electron, проєктування REST і GraphQL API з JWT-автентифікацією, інтеграцію хмарних документних БД та написання автотестів на вбудованому модулі `node:test`. |

## Структура монорепозиторію

- [packages/core](./packages/core) — спільне ядро бізнес-логіки (`CoffeeService`, валідація `validateCoffeeText`, фільтрація `filterCoffeesByQuery`, абстрактний `CoffeeStorageAdapter`) та 24 автотести (`node:test`).
- [packages/web](./packages/web) — вебклієнт із `LocalStorageAdapter`, підключенням ядра через `<script type="importmap">` та локальним HTTP-сервером (`node:http`).
- [packages/desktop](./packages/desktop) — десктопний клієнт Electron 35 із `FileStorageAdapter` (`coffees.json`), винесеними обробниками `ipcHandlers.js` та ізольованим `preload.cjs`.

## Запуск та тестування

1. Встановлення залежностей у корені монорепозиторію: `npm install`
2. Запуск 24 автотестів ядра та адаптерів: `npm test`
3. Запуск вебклієнта (порт 3000): `npm --workspace=@coffee-first/web start`
4. Запуск десктопного клієнта Electron: `npm --workspace=packages/desktop start`

## Посилання на репозиторій

- Головний репозиторій проєкту: https://github.com/maksonch1k1034/Cros-platform_Oleksienko
- Монорепозиторій лабораторної роботи № 8: https://github.com/maksonch1k1034/Cros-platform_Oleksienko/tree/main/coffee-first-monorepo
