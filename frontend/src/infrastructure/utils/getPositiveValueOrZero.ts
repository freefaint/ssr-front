import Decimal from 'decimal.js';
import {hasValue} from 'northis.typescript.utils';

/**
 * Возвращает значение, если оно больше либо равно 0. В противном случае возвращает 0.
 * @param value Проверяемое значение.
 */
export function getPositiveValueOrZero(value: Decimal | undefined): Decimal {
    const zero = new Decimal(0);
    return hasValue(value) && value >= zero ? value : zero;
}
