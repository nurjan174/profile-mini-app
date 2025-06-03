   window.onload = function() {
     const user = window.Telegram.WebApp.initDataUnsafe.user;
     document.getElementById("photo").src = user.photo_url || "default.jpg";
     document.getElementById("username").innerText = "@" + (user.username || "unknown");
   };
          const TelegramBot = require('node-telegram-bot-api');
  const bot = new TelegramBot('YOUR_BOT_TOKEN', { polling: true });

  bot.onText(/\/buy/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      const invoiceLink = await bot.createInvoiceLink({
        title: 'Покупка Telegram Stars',
        description: '100 Telegram Stars для использования в приложении',
        payload: `stars_100_${chatId}_${Date.now()}`, // Уникальный идентификатор
        provider_token: '', // Пустой для Telegram Stars
        currency: 'XTR',
        prices: [{ label: '100 Stars', amount: 10000 }], // 100 Stars = 100.00 XTR
      });
      // Отправьте invoiceLink в ваше Mini App (например, через базу данных или webhook)
      console.log('Ссылка на счет:', invoiceLink);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  });

  bot.on('pre_checkout_query', (query) => {
    bot.answerPreCheckoutQuery(query.id, true); // Подтверждаем запрос
  });

  bot.on('successful_payment', (msg) => {
    console.log('Платеж успешен:', msg.successful_payment);
    // Обновите баланс пользователя в базе данных
  });
    // Кнопка покупки
  document.getElementById('buyStars').addEventListener('click', () => {
    // Получите invoiceLink с бэкенда (например, через API-запрос)
    fetch('/api/getInvoiceLink', { method: 'POST', body: JSON.stringify({ userId: Telegram.WebApp.initDataUnsafe.user.id }) })
      .then(response => response.json())
      .then(data => {
        Telegram.WebApp.openInvoice(data.invoiceLink, (status) => {
          if (status === 'paid') {
            alert('Покупка успешна! 100 Stars добавлены.');
            // Отправьте запрос на бэкенд для обновления баланса
          } else if (status === 'cancelled') {
            alert('Покупка отменена.');
          } else if (status === 'failed') {
            alert('Ошибка при оплате.');
          }
        });
      });
  });
    const express = require('express');
  const app = express();
  app.use(express.json());

  app.post('/api/getInvoiceLink', async (req, res) => {
    const { userId } = req.body;
    try {
      const invoiceLink = await bot.createInvoiceLink({
        title: 'Покупка Telegram Stars',
        description: '100 Telegram Stars',
        payload: `stars_100_${userId}_${Date.now()}`,
        provider_token: '',
        currency: 'XTR',
        prices: [{ label: '100 Stars', amount: 10000 }],
      });
      res.json({ invoiceLink });
    } catch (error) {
      res.status(500).json({ error: 'Не удалось создать счет' });
    }
  });

  app.listen(3000, () => console.log('Сервер запущен на порту 3000'));
  
