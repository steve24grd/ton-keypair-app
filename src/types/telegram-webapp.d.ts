interface TelegramWebApp {
    ready(): void;
    MainButton: {
        text: string;
        show(): void;
        hide(): void;
        onClick(callback: Function): void;
    };
    // Add other Telegram WebApp types as needed
}

interface Window {
    Telegram?: {
        WebApp: TelegramWebApp;
    };
}