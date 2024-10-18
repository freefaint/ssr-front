import Decimal from 'decimal.js';
import {hasValue} from 'northis.typescript.utils';

/**
 * Возвращает результат суммы двух чисел либо undefined, если значения обоих чисел не определены.
 * Если не определено значение одного из чисел, то возвращает значение другого.
 * @param value1 Первое число.
 * @param value2 Второе число.
 */
export function getDecimalSum(value1: Decimal | undefined, value2: Decimal | undefined): Decimal | undefined {
    if (hasValue(value1) && hasValue(value2)) {
        return Decimal.sum(value1, value2);
    }
    if (hasValue(value1)) {
        return value1;
    }
    if (hasValue(value2)) {
        return value2;
    }
    return undefined;
}
