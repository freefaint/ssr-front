import {SubscriptionMessage} from './contracts/subscription-message';
import {TrendMessage} from './contracts/trend-message';
import {TelegramMessage} from './contracts/telegram.message';
import {SignalRConfiguration, SignalrConnector, SignalrConnectorErrorHandler} from "northis.react.signalr";

/**
 * Представляет коннектор для Upstream.
 */
class UpstreamConnector extends SignalrConnector {
    /**
     * Экземпляр UpstreamConnector.
     */
    static instance: UpstreamConnector;

    /**
     * @param endpoint  Точка доступа.
     * @param errorHandler Обработчик ошибок.
     */
    private constructor(endpoint: string, errorHandler: SignalrConnectorErrorHandler) {
        super(new SignalRConfiguration(endpoint), errorHandler);
    }

    /**
     * Подписывается на сообщение.
     * @param message Сообщение.
     */
    public async subscribeAsync(message: SubscriptionMessage): Promise<void> {
        return super.sendAsync(ConnectorMethod.Subscribe, message.trendIds, message.telegramIds);
    }

    /**
     * Выполняет отписку от сообщения.
     * @param message Сообщение.
     */
    public async unsubscribeAsync(message: SubscriptionMessage): Promise<void> {
        return super.sendAsync(ConnectorMethod.Unsubscribe, message.trendIds, message.telegramIds);
    }

    /**
     * Выполняет отписку от всех сообщений.
     */
    public async unsubscribeFromAllAsync(): Promise<void> {
        return super.sendAsync(ConnectorMethod.Unsubscribe, SubscriptionMessage.EMPTY.trendIds, SubscriptionMessage.EMPTY.telegramIds);
    }

    /**
     * Регистрирует обработчик получения тренда.
     * @param onReceive Обработчик получения тренда.
     */
    public registerTrendReceiver(onReceive: (trend: TrendMessage) => void) {
        super.receive(ConnectorMethod.ReceiveTrend, onReceive);
    }

    /**
     * Отменяет регистрацию обработчика получения тренда.
     * @param onReceive Обработчик получения тренда.
     */
    public unregisterTrendReceiver(onReceive: (trend: TrendMessage) => void) {
        super.removeHandler(ConnectorMethod.ReceiveTrend, onReceive);
    }

    /**
     * Регистрирует обработчик получения телеграммы.
     * @param onReceive Обработчик получения телеграммы.
     */
    public registerTelegramReceiver(onReceive: (trend: TelegramMessage) => void) {
        super.receive(ConnectorMethod.ReceiveTelegram, onReceive);
    }

    /**
     * Отменяет регистрацию обработчика получения телеграммы.
     * @param onReceive Обработчик получения телеграммы.
     */
    public unregisterTelegramReceiver(onReceive: (trend: TelegramMessage) => void) {
        super.removeHandler(ConnectorMethod.ReceiveTelegram, onReceive);
    }

    /**
     * Создает новый экземпляр UpstreamConnector, если он не был создан ранее.
     * В противном случае возвращает существующий экземпляр UpstreamConnector.
     * @param endpoint  Точка доступа.
     * @param errorHandler Обработчик ошибок.
     */
    static Create(endpoint: string, errorHandler: SignalrConnectorErrorHandler): UpstreamConnector {
        if (!UpstreamConnector.instance) {
            UpstreamConnector.instance = new UpstreamConnector(endpoint,errorHandler);
        }
        return UpstreamConnector.instance;
    }
}

export default UpstreamConnector.Create;

/**
 * Представляет метод коннектора.
 */
enum ConnectorMethod {
    Subscribe = 'Subscribe',
    Unsubscribe = 'Unsubscribe',
    ReceiveTrend = 'ReceiveTrend',
    ReceiveTelegram = 'ReceiveTelegram',
}
