import {SnackbarAction, SnackbarMessage} from './snackbar-message';
import {SnackbarMessageType} from './snackbar-message-type';
import {generateUUID} from '../../../generates';

/**
 * Создает сообщение об успехе.
 * @param message Текст сообщения.
 * @param duration Длительность отображения сообщения.
 */
export function successSnackbarMessage(message: string, duration: number = 3000): SnackbarMessage {
    return {
        messageId: generateUUID(),
        message,
        messageType: SnackbarMessageType.SUCCESS,
        duration: duration,
        action: null,
    };
}

/**
 * Создает сообщение об ошибке технического характера (сетевых или приложения).
 * @param message Текст сообщения.
 * @param action Предоставленное пользователю действие.
 * @param duration Длительность отображения сообщения.
 */
export function technicalErrorSnackbarMessage(message: string, action: SnackbarAction | null = null, duration: number | null = null): SnackbarMessage {
    return errorMessageCommon(message, action, SnackbarMessageType.ERROR, duration);
}

/**
 * Создает сообщение предупреждение пользователю о том, что данные невалидны, или имеются другие проблемы, на которые он должен
 * отреагировать (сетевые или приложения).
 * @param message Текст сообщения.
 * @param action Предоставленное пользователю действие.
 * @param duration Длительность отображения сообщения.
 */
export function businessWarningSnackbarMessage(message: string, action: SnackbarAction | null = null, duration: number | null = null): SnackbarMessage {
    return errorMessageCommon(message, action, SnackbarMessageType.WARNING, duration);
}

function errorMessageCommon(
    message: string,
    action: SnackbarAction | null,
    messageType: SnackbarMessageType,
    duration: number | null,
): SnackbarMessage {
    return {
        messageId: generateUUID(),
        message,
        messageType: messageType,
        action,
        duration,
    };
}
