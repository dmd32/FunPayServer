<h1 align="center">
    FunPayServer
</h1>

<h4 align="center">
    Консольное приложение для автоматического управления вашим аккаунтом FunPay
</h4>

![FunPayServer](https://i.ibb.co/zsk9q0T/2022-08-18-143923152.png "FunPayServer")

## 🤖 **Возможности**

1. Автовыдача товаров.
2. Автоподнятие предложений.
3. Автовосстановление предложений после продажи.
4. Автоответ на сообщения.
5. Подсчёт продаж.
6. Подсчёт заработка с продаж.

## ⚡ **Установка**

Данный вид установки подходит для большинства пользователей.

1. Скачайте `FunPayServer.exe` со страницы **[релизов](https://github.com/NightStrang6r/FunPayServer/releases)**.
2. Переместите программу в любую папку.
3. Запустите програму, создасться файл `settings.json`.
3. Получите `golden_key` из cookie FunPay. Вы можете использовать расширение [Edit This Cookie](https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg). 
4. Откройте файл `settings.json`, пропишите ваш `golden_key` в поле `token`.
5. Запустите программу. Готово!

## 🔨 **Продвинутая установка из исходного кода**

Данный вид установки подходит пользователей, которым нужен больший контроль над работой программы.

1. Установите **[Node.JS](https://nodejs.org/en/)**.
2. Скачайте данный **[репозиторий](https://github.com/NightStrang6r/FunPayServer)**.
3. Распакуйте загруженный архив в любую папку.
4. Запустите файл `Start.bat`, это установит зависимости для работы программы. После запустите этот файл повторно, создасться файл `settings.json`.
5. Получите `golden_key` из cookie FunPay. Вы можете использовать расширение [Edit This Cookie](https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg). 
6. Откройте файл `settings.json`, пропишите ваш `golden_key` в поле `token`.
7. Запустите файл `Start.bat`. Готово!

## 📦 Настройка автовыдачи

1. Проверьте, что в файле `settings.json` включена настройка автовыдачи: `"autoIssue": true`.
2. Переходим в папку `data`, открываем файл `autoIssueGoods.json`.
3. Заполняем необходимыми товарами в формате JSON по примерам:
- Если у вас выдаётся один и тот же товар (к примеру, какая-либо инструкция):
```
[{
    "name": "ТУТ ТОЧЬ В ТОЧЬ НАЗВАНИЕ ТОВАРА НА FUNPAY",
    "message": "Тут сообщение, которое будет выдано после оплаты. Для переноса строки используйте символы \n. Пример: первая строка\nвторая строка"
},
{
    "name": "ТУТ ТОЧЬ В ТОЧЬ НАЗВАНИЕ ТОВАРА НА FUNPAY",
    "message": "Тут другое сообщение, которое будет выдано после оплаты другого лота"
}]
```
- Если у вас выдаются разные товары (например, аккаунты):
```
[{
    "name": "ТУТ ТОЧЬ В ТОЧЬ НАЗВАНИЕ ТОВАРА НА FUNPAY",
    "nodes": [
        {
            "message": "Тут сообщение, которое будет выдано после первой оплаты. Для переноса строки используйте символы \n. Пример: первая строка\nвторая строка ",
            "sold": false
        },
        {
            "message": "Тут сообщение, которое будет выдано после второй оплаты данного лота.",
            "sold": false
        }
    ]
}]
```
- Их можно комбинировать:
```
[{
    "name": "ТУТ ТОЧЬ В ТОЧЬ НАЗВАНИЕ ТОВАРА НА FUNPAY",
    "nodes": [
        {
            "message": "Тут сообщение, которое будет выдано после первой оплаты. Для переноса строки используйте символы \n. Пример: первая строка\nвторая строка ",
            "sold": false
        },
        {
            "message": "Тут сообщение, которое будет выдано после второй оплаты данного лота.",
            "sold": false
        }
    ]
},
{
    "name": "ТУТ ТОЧЬ В ТОЧЬ НАЗВАНИЕ ТОВАРА НА FUNPAY",
    "message": "Тут сообщение, которое будет выдано после оплаты. Для переноса строки используйте символы \n. Пример: первая строка\nвторая строка"
}]
```
Для проверки правильности заполнения файла можете использовать сервис http://json.parser.online.fr
Для проверки работы автовыдачи без покупки товара используйте команду в чате: `!автовыдача "НАЗВАНИЕ ПРЕДЛОЖЕНИЯ"`. Для включения данной команды пропишите в файле настроек `settings.json` `"autoIssueTestCommand": true`. 

4. Сохраняем и перезапускаем программу.

## 💬 Настройка автоответа

1. Проверьте, что в файле `settings.json` включена настройка автовыдачи: `"autoResponse": true`.
2. Переходим в папку `data`, открываем файл `autoResponse.json`.
3. Заполняем необходимыми ответами в формате JSON по примерам:

```
[
    {
        "command": "!тест",
        "response": "Тестовое сообщение"
    },
    {
        "command": "!команда",
        "response": "Ответ на команду"
    }
]
```

4. Сохраняем и перезапускаем программу.

## 💲 Функция подсчёта продаж / заработка

Бот может подсчитать количество продаж и сумму заработанных средств с продаж. Для этого запустите файл `FunPayServer.exe` с параметром `--countProfit`, т.е. чтобы получилось `FunPayServer.exe --countProfit`. Запустить файл с параметром можно при помощи командной строки. Если вы использовали продвинутую установку, просто запустите файл `CountTradeProfit.bat`.

## 🌀 Работа с прокси

Бот поддерживает работу с http / https прокси с / без авторизации. Для включения работы через прокси пропишите в файле настроек `settings.json` настройку `"useProxy": true`, а также данные хоста в поле `host` и порт в поле `port`. Если ваш прокси не требует авторизации, оставьте поля `login` и `pass` пустыми.

## ⚙️ Файл настроек

Бот имеет модульную структуру, что позволяет отключать или подключать необходимые модули, редактируя файл настроек `settings.json`. Этот файл генерируется автоматически при первом запуске. После редактирования файла не забудьте перезапустить программу.

```
{
    "token": "golden_key",        // golden_key с FunPay cookies [string]
    "lotsRaise": true,            // функция автоподнятия предложений [true / false]
    "goodsStateCheck": true,      // функция автовосстановления предложений [true / false]
    "autoIssue": true,            // функция автовыдачи [true / false]
    "autoResponse": true,         // функция автоответа [true / false]
    "userDataUpdate": true,       // функция автоматического обновления данных (не рекомендуется отключать) [true / false]
    "intervals": {                // настройка интервалов обновления данных в секундах [number]
        "lotsRaise": 120,
        "goodsStateCheck": 120,
        "autoIssue": 20,
        "autoResponse": 5,
        "userDataUpdate": 100
    },
    "autoIssueTestCommand": false, // функция включения команды "!автовыдача" для теста автовыдачи; требуется функция "autoResponse" для работы [true / false]
    "proxy": {
        "useProxy": false,        // функция использования прокси [true / false]
        "host": "",               // хост прокси [string]
        "port": 3128,             // порт прокси [number]
        "login": "",              // логин прокси [string]
        "pass": "",               // пароль прокси [string]
        "type": "http"            // тип прокси [string: "http" / "https"]
    },
    "requestsDelay": 0,           // задержка перед каждым запросом в миллисекундах [number]
    "watermark": "[ 🔥NightBot ]" // строка, которая добавляется перед отправкой сообщения ботом [string]
}
```

## 🔥 Аналоги
Если по какой-то причине данная версия бота не подходит для вас, попробуйте расширение для браузера - [FunPay Lite Bot](https://chrome.google.com/webstore/detail/funpay-lite-bot/amicfiagmpbgfiiopieeemlkblfeeeip) (функционал будет расширяться).

## 📧 Контакты
Если у вас есть какие-либо вопросы, я буду рад ответить.

Быстрый ответ:

- Telegram - [FunPay Lite Bot - chat / support](https://t.me/fplite)

- Discord - [Chat / Voice / Support](https://discord.gg/gEPnwzVD3H)

Более долгий ответ:

- Lolz.Guru - https://lolz.guru/threads/4149637/

## 🎉 Понравилось приложение?

Оцените данный репозиторий, поставив звёздчку в верхнем правом углу страницы на GitHub (нужно быть авторизованным в свой аккаунт). Это даёт мне мотивацию развивать данный проект.

![](https://i.ibb.co/x3hFFvf/2022-08-18-132617815.png)

Вы также можете поддержать разработчика материально, чтобы ускорить выход будущих обновлений:

- [DonationAlerts](https://www.donationalerts.com/r/nightstranger)
- [ЮMoney](https://yoomoney.ru/to/4100115656349483)