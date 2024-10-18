import {DateRange, NumberRange} from './models/value-range';

/**
 * Представляет тип значения фильтра.
 */
export type FilterValue = string | number | NumberRange | DateRange | null;
