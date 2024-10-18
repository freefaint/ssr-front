/**
 * Представляет расширенную тему.
 */
export interface ExtendedTheme {
    northis: {
        messageBox: {
            confirmButton: {
                variant: string;
                text: string;
            };
            declineButton: {
                variant: string;
                text: string;
            };
        };
    };
}

/**
 * Представляет расширенную тему для конфигурации.
 */
export interface ExtendedThemeThemeOptions {
    northis?: {
        messageBox?: {
            confirmButton?: {
                variant?: string;
                text?: string;
            };
            declineButton?: {
                variant?: string;
                text?: string;
            };
        };
    };
}
// Аугментация расширенных типов тем в стандартные типы mui.
// Этот код нужно копировать также в проект приложения, в которое подключается пакет.
declare module '@mui/material/styles' {
    interface Theme extends ExtendedTheme {}
    interface ThemeOptions extends ExtendedThemeThemeOptions {}
}
