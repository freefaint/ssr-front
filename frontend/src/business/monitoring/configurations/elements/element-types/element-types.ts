/**
 * Представляет типы элементов главного экрана.
 */
export enum ElementTypes {
    /**
     * Бункер.
     */
    Bunker = 'bunker',
    /**
     * Бункер c показателем уровня в процентах.
     */
    BunkerWithLevelPercent = 'bunkerWithLevelPercent',
    /**
     * Бункер с показателем уровня массы.
     */
    BunkerWithLevelWeight = 'bunkerWithLevelWeight',
    /**
     * Конвейер.
     */
    Conveyor = 'conveyor',
    /**
     * Конвейер с состоянием "Предпусковая сигнализация".
     */
    ConveyorWithPreLaunch = 'conveyorWithPreLaunch',
    /**
     * Конвейер с состоянием "Работа назад".
     */
    ConveyorWithWorkBackward = 'conveyorWithWorkBackward',
    /**
     * Конвейер с состояниями "Работа назад" и "Переключение".
     */
    ConveyorWithWorkBackwardWithSwitching = 'conveyorWithWorkBackwardWithSwitching',
    /**
     * Конвейер с простоем.
     */
    ConveyorWithDowntime = 'conveyorWithDowntime',
    /**
     * Конвейер с простоем с состоянием "Предпусковая сигнализация".
     */
    ConveyorWithDowntimeWithPreLaunch = 'conveyorWithDowntimeWithPreLaunch',
    /**
     * Ячейка со счетчиком, получающая данные по тренду.
     */
    CounterCellWithTrend = 'counterCellWithTrend',
    /**
     * Ячейка со счетчиком "Производительность ПЗК-2".
     */
    Pzk2ProcessingRateCell = 'pzk2ProcessingRateCell',
    /**
     * Ячейки со счетчиком, получающие данные из нескольких трендов (индикатор отгрузки).
     */
    CounterCellsWithTrends = 'counterCellsWithTrends',
    /**
     * Грохот.
     */
    VibraScreen = 'vibraScreen',
    /**
     * Контент блока "Газопоршневая".
     */
    GasPistonPowerPlantTab = 'gasPistonPowerPlantTab',
    /**
     * Бункер р/с.
     */
    MineBunkerMixer = 'mineBunkerMixer',
    /**
     * Бункер рудника.
     */
    MineBunker = 'mineBunker',
    /**
     * Мобильные конвейеры.
     */
    MobileConveyors = 'mobileConveyors',
    /**
     * Параметр-значение.
     */
    ParameterIndicator = 'parameterIndicator',
    /**
     * Воронка.
     */
    Funnel = 'funnel',
    /**
     * Дозатор.
     */
    Dispenser = 'dispenser',
    /**
     * Блок "ВЭСП" (конфигурируется целиком).
     */
    Vesp = 'vesp',
    /**
     * Бункер погрузочный.
     */
    LoadingBunker = 'loadingBunker',
    /**
     * Бункер погрузочный двойной.
     */
    DoubleLoadingBunker = 'doubleLoadingBunker',
    /**
     * Вагон с показателем веса.
     */
    RailwayCarriageWeight = 'railwayCarriageWeight',
    /**
     * Влажность.
     */
    Humidity = 'humidity',
    /**
     * Сушилка.
     */
    DrumDryer = 'drumDryer',
    /**
     * Бункер, отображающий только свое состояние загрузки.
     */
    OverloadBunker = 'overloadBunker',
    /**
     * Давление.
     */
    Pressure = 'pressure',
    /**
     * Баланс Импорт/Генерация.
     */
    PowerBalance = 'powerBalance',
}
