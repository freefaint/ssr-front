/**
 * Представляет сообщение для подписки/отписки.
 */
export class SubscriptionMessage {

    /**
     * Представляет пустое сообщение.
     */
    public static EMPTY = new SubscriptionMessage([], []);

    /**
     * @param trendIds Набор идентификаторов трендов.
     * @param telegramIds Набор идентификаторов телеграмм.
     */
    constructor(readonly trendIds: string[], readonly telegramIds: string[]) {
    }
}