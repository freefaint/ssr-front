import Decimal from 'decimal.js';

/**
 * Преобразует строку с запятой в число, если это возможно, либо в null, если это не число.
 * @param initialString Изначальная строка.
 */
export function parseCommaStringToNumber(initialString: string) {
    const newString = initialString.replace(',', '.');
    if (!Number.isNaN(newString)) {
        return new Decimal(newString).toNumber();
    }
    return null;
}
