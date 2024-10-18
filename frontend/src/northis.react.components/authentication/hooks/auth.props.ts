import {AuthContextProps} from 'react-oidc-context';

/**
 * Представляет состояние авторизации.
 */
export interface AuthProps {
    /**
     * Выполняет вход в систему.
     */
    login(): Promise<void> | undefined;
    /**
     * Выполняет выход из системы.
     */
    logout(): Promise<void> | undefined;
    /**
     * Состояние (url), с которого был запущен процесс входа/выхода.
     */
    readonly actionInitState: string | undefined;
    /**
     * Очищает состояние "actionInitState".
     */
    clearActionInitState(): void;
    /**
     * Контекст.
     */
    readonly authContext: AuthContextProps;
    /**
     * Завершает сессию пользователя.
     */
    endSessionAsync(): Promise<void>;
    /**
     * Возвращает истину если сессия пользователя истекла.
     */
    readonly showSessionExpired: boolean;
}
