/**
 * Представляет часть конфигурации, отвечающую за настройки режима скипа.
 */
export class SkipModeConfigurationBlock {
    /**
     * @param skipModeParamId Идентификатор параметра телеграммы для получения режима.
     * @param cargoValue Значение для режима "Груз".
     * @param revisionValue Значение для режима "Ревизия".
     * @param rearrangeValue Значение для режима "Перестановка".
     * @param notSelectedValue Значение для режима "Не выбран".
     */
    constructor(
        readonly skipModeParamId: string | undefined,
        readonly cargoValue: string | undefined,
        readonly revisionValue: string | undefined,
        readonly rearrangeValue: string | undefined,
        readonly notSelectedValue: string | undefined,
    ) {}
}
