/**
 * Представляет часть конфигурации, отвечающую за режимы клети.
 */
export class CageModeConfigurationBlock {
    /**
     * @param cageModeParamId Идентификатор параметра телеграммы для получения режима.
     * @param cargoValue Значение для режима "Груз".
     * @param staffValue Значение для режима "Люди".
     * @param revisionValue Значение для режима "Ревизия".
     * @param oversizeValue Значение для режима "Негабарит".
     * @param materialDescendingValue Значение для режима "Спуск мат-лов".
     * @param notSelectedValue Значение для режима "Не выбран".
     */
    constructor(
        readonly cageModeParamId: string | undefined,
        readonly cargoValue: string | undefined,
        readonly staffValue: string | undefined,
        readonly revisionValue: string | undefined,
        readonly oversizeValue: string | undefined,
        readonly materialDescendingValue: string | undefined,
        readonly notSelectedValue: string | undefined,
    ) {}
}
