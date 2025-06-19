// Обработка Telegram WebApp событий
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем, что мы внутри Telegram
    if (window.Telegram && window.Telegram.WebApp) {
        const tgWebApp = window.Telegram.WebApp;
        
        // Расширяем приложение на весь экран
        tgWebApp.expand();
        
        // Получаем данные пользователя
        const user = tgWebApp.initDataUnsafe.user;
        if (user) {
            console.log('Telegram user:', user);
            // Можно использовать user.id, user.first_name и т.д.
        }
        
        // Обработчик кнопки "Назад" в Telegram
        tgWebApp.BackButton.onClick(() => {
            tgWebApp.close();
        });
        
        // Показываем кнопку "Назад"
        tgWebApp.BackButton.show();
        
        // Настройка цветовой схемы
        const setTheme = () => {
            document.documentElement.style.setProperty(
                '--tg-color-scheme', 
                tgWebApp.colorScheme
            );
            document.documentElement.style.setProperty(
                '--tg-theme-bg-color', 
                tgWebApp.themeParams.bg_color || '#ffffff'
            );
            document.documentElement.style.setProperty(
                '--tg-theme-text-color', 
                tgWebApp.themeParams.text_color || '#000000'
            );
            document.documentElement.style.setProperty(
                '--tg-theme-hint-color', 
                tgWebApp.themeParams.hint_color || '#707579'
            );
            document.documentElement.style.setProperty(
                '--tg-theme-link-color', 
                tgWebApp.themeParams.link_color || '#3390ec'
            );
            document.documentElement.style.setProperty(
                '--tg-theme-button-color', 
                tgWebApp.themeParams.button_color || '#3390ec'
            );
            document.documentElement.style.setProperty(
                '--tg-theme-button-text-color', 
                tgWebApp.themeParams.button_text_color || '#ffffff'
            );
        };
        
        // Устанавливаем тему при загрузке и при изменении
        setTheme();
        tgWebApp.onEvent('themeChanged', setTheme);
        
        // Отправка данных в бот при закрытии
        tgWebApp.onEvent('viewportChanged', (event) => {
            if (event.isStateStable) {
                // Можно отправить данные о состоянии игры
            }
        });
    } else {
        console.log('Not running in Telegram WebApp');
    }
});
