/**
 * Представляет сообщения валидации для диапазона занчений.
 */
export interface RangeValuesValidationMessages {
    /**
     * Возвращает сообщение с валидацией начального значения диапазона.
     */
    readonly startValueValidationMessage: string | undefined;
    /**
     * Возвращает сообщение с валидацией конечного значения диапазона.
     */
    readonly endValueValidationMessage: string | undefined;
}
