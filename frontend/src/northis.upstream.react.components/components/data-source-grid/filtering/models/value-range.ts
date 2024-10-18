import {DateTime} from 'luxon';

/**
 * Представляет диапазон значений.
 */
export class ValueRange<T> {
    /**
     * @param minValue Минимальное значение.
     * @param maxValue Максимальное значение.
     */
    constructor(readonly minValue: T | null, readonly maxValue: T | null) {}
}

/**
 * Представляет диапазон дат.
 */
export class DateRange extends ValueRange<DateTime> {}

/**
 * Представляет диапазон чисел.
 */
export class NumberRange extends ValueRange<number> {}
