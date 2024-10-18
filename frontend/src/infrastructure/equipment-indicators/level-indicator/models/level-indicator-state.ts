/**
 * Представляет состояние, в котором может находиться индикатор оборудования.
 */
export enum LevelIndicatorState {
    /**
     * Не задана конфигурация.
     */
    NotConfigured,
    /**
     * Ошибка сигнала.
     */
    SignalError,
    /**
     * Выключен.
     */
    TurnedOff,
    /**
     * Работает.
     */
    Working,
    /**
     * Выведен из эксплуатации.
     */
    OutOfService,
}
