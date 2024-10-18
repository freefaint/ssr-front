/**
 * Представляет сообщение тренда.
 */
export interface TrendMessage {
    /**
     * Идентификатор сообщения.
     */
    id: string,
    /**
     * Время появления сообщения.
     */
    timeStamp: string,
    /**
     * Идентификатор тренда.
     */
    trendId: string,
    /**
     * Значение тренда, либо null если значение тренда отсутствует.
     */
    value: string | null
}
