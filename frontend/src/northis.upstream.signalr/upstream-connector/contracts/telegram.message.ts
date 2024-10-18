/**
 * Представляет сообщение телеграммы.
 */
export interface TelegramMessage {
    /**
     * Идентификатор сообщения.
     */
    id: string,
    /**
     * Время появления сообщения.
     */
    timeStamp: string,
    /**
     * Идентификатор телеграммы.
     */
    telegramId: string,
    /**
     * Набор параметров телеграммы (объект с полями вида "идентификатор параметра - значение").
     * @example {Param1id: "1", param2id: "10"}
     */
    payload: Record<string, string>
}
