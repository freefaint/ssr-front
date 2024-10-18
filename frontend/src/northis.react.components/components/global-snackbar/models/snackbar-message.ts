import {SnackbarMessageType} from './snackbar-message-type';

/**
 * Представляет интерфейс сообщения snackbar.
 */
export interface SnackbarMessage {
    /**
     * Возвращает или устанавливает идентификатор сообщения.
     */
    messageId: string;
    /**
     * Возвращает или устанавливает текст сообщения.
     */
    message: string;
    /**
     * Возвращает или устанавливает тип сообщения.
     */
    messageType: SnackbarMessageType;
    /**
     * Возвращает или устанавливает длительность (мс., не скрывается, если null).
     */
    duration: number | null;
    /**
     * Возвращает или устанавливает действие.
     */
    action: SnackbarAction | null;
}

/**
 * Представляет дополнительную кнопку с действием для snackbar.
 */
export interface SnackbarAction {
    /**
     * Возвращает или устанавливает обработчик нажатия на кнопку действия.
     */
    action: () => void;
    /**
     * Возвращает или устанавливает текст для кнопки действия.
     */
    text: string;
}
