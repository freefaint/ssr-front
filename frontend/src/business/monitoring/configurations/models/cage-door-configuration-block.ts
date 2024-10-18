/**
 * Представляет часть конфигурации, отвечающую за двери клети.
 */
export class CageDoorConfigurationBlock {
    /**
     * @param cageDoorParameterId Идентификатор параметра телеграммы для статуса дверей.
     * @param openedValue Значение для открытых дверей.
     * @param closedValue Значение для закрытых дверей.
     */
    constructor(
        readonly cageDoorParameterId: string | undefined,
        readonly openedValue: string | undefined,
        readonly closedValue: string | undefined,
    ) {}
}
