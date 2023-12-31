# Тестовое задание для стажёра Frontend в Avito Tech

ТЗ: https://github.com/avito-tech/frontend-trainee-assignment-2023

## Опциональные задания
✅ использование Typescript (везде использованы правильные типы и интерфейсы)

❌ учитывать тысячи тайтлов (есть несколько решений, самое идеальное, на мой взгляд, использовать виртуальный скролл по типу react-window, но возникли трудности с совмещением под UI библиотеку)

✅ при неудачном запросе, три попытки повторного запроса (реализовал, смотреть в ```/utils/fetchRetry.ts```)

✅ прерывание запросов прошлой страницы (реализовал через AbortController и его сигналы)

❌ бэкенд (не стал пробовать, так как хотел в рамках задания показать навыки фронтенда, но готов работать и с бэком)

✅ покрытие кода тестами (все утилиты в папке ```utils``` покрыты тестами)

## Запуск приложения
1. Склонировать проект
2. ```cd f2p-games```
3. ```npm run start```

После этого автоматически запустится вкладка в браузере с веб-приложением на [localhost:3001](localhost:3001)

Для корректной работы запросов, в папке ```store```, в файлах-слайсах, заменить KEY на собстенный ключ, полученный на https://rapidapi.com/digiwalls/api/free-to-play-games-database

Например, 'ddd1992d06msh69dccc24485ab56p11eed8jsn63b3f65c7074'

## Тесты
Написаны для утилит, в папке ```utils```

Запускать командой ```npx jest```

## Стек
- React 18
- Redux 4
- React Router 6
- Typescript 4
- Ant Design UI

(мой текущий стек - Angular, RxJs)

## Обратите внимание
Я использовал единую карусель для постера и скриншотов на странице игры

## Дополнительно
Реализовал ErrorBoundary для всего приложения, а не только для запросов