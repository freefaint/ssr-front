/**
 * Представляет свойства компонент ошибки по умолчанию.
 */
export interface DefaultErrorPageProps {
    /**
     * Возвращает или устанавливает код ошибки.
     */
    readonly errorCode?: string;
    /**
     * Возвращает текст сообщения.
     */
    readonly text: {
        /**
         * Возвращает главный текст.
         */
        readonly main: string;
        /**
         * Возвращает дополнительный текст.
         */
        readonly second: string;
    };
}
