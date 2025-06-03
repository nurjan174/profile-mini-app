   window.onload = function() {
     const user = window.Telegram.WebApp.initDataUnsafe.user;
     document.getElementById("photo").src = user.photo_url || "default.jpg";
     document.getElementById("username").innerText = "@" + (user.username || "unknown");
   };
        bot.sendInvoice(chatId, {
       title: "Покупка Telegram Stars",
       description: "Покупка 100 Telegram Stars",
       payload: "stars_purchase_100",
       provider_token: "YOUR_PROVIDER_TOKEN",
       currency: "XTR", // Telegram Stars
       prices: [{ label: "100 Stars", amount: 10000 }], // 100 Stars = 100.00 XTR
     });
          Telegram.WebApp.openInvoice("https://t.me/$YOUR_BOT?start=invoice_123", (status) => {
       if (status === "paid") {
         alert("Покупка успешна!");
       }
     });
       const TelegramBot = require('node-telegram-bot-api');
  const bot = new TelegramBot('YOUR_BOT_TOKEN', { polling: true });

  bot.on('pre_checkout_query', (query) => {
    bot.answerPreCheckoutQuery(query.id, true);
  });

  bot.on('message', (msg) => {
    if (msg.text === '/buy') {
      bot.sendInvoice(msg.chat.id, {
        title: 'Покупка Stars',
        description: '100 Telegram Stars',
        payload: 'stars_100_' + msg.chat.id,
        provider_token: 'YOUR_PROVIDER_TOKEN',
        currency: 'XTR',
        prices: [{ label: '100 Stars', amount: 10000 }],
      });
    }
  });

  bot.on('successful_payment', (msg) => {
    console.log('Платеж успешен:', msg.successful_payment);
    // Обновите баланс пользователя в базе данных
  });
  
