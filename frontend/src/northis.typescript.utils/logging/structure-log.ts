/**
 * Представляет структурированный лог.
 */
export class StructureLog {
    /**
     * Возвращает или устанавливает пространство имён graylog.
     */
    namespace_name?: string;
    /**
     * Возвращает или устанавливает время лога.
     */
    dateTime?: Date;
    /**
     * Возвращает или устанавливает уровень лога.
     * Оставлять с большой буквы!!! Так как грейлог не принимает
     * с маленькой буквы ибо возникают конфликты переменных!
     * У него уже есть 'level'.
     */
    Level?: string | number;
    /**
     * Возвращает или устанавливает сообщение.
     */
    message?: string;
    /**
     * Возвращает или устанавливает исключение.
     */
    exception?: {stack?: string; message?: string};
    /**
     * Возвращает или устанавливает версию браузера.
     */
    browserVersion?: string;
    /**
     * Возвращает или устанавливает логин пользователя.
     */
    userName: string | null = null;
    /**
     * Возвращает или устанавливает идентификатор сессии.
     */
    sessionId: string | null = null;
}