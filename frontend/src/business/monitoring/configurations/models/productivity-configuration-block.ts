/**
 * Представляет часть конфигурации, отвечающую за производительность.
 */
export class ProductivityConfigurationBlock {
    /**
     * Идентификаторы параметров телеграммы для получения данных.
     * @param skipsPerHourParameterId Количество скипов за час.
     * @param skipsPerShiftParameterId Количество скипов за смену.
     * @param skipsPerDayParameterId Количество скипов за сутки.
     * @param tonsPerHourParameterId Масса за час.
     * @param tonsPerShiftParameterId Масса за смену.
     * @param tonsPerDayParameterId Масса за сутки.
     */
    constructor(
        readonly skipsPerHourParameterId: string | undefined,
        readonly skipsPerShiftParameterId: string | undefined,
        readonly skipsPerDayParameterId: string | undefined,
        readonly tonsPerHourParameterId: string | undefined,
        readonly tonsPerShiftParameterId: string | undefined,
        readonly tonsPerDayParameterId: string | undefined,
    ) {}
}
