/**
 * Возвращает список значений для перечисления типа {@link enumType}.
 * Перечисления должно иметь числовой тип значений.
 */
export function getNumberEnumValues<T>(enumType: {[p: string]: unknown}): T[] {
    return Object.values(enumType).filter((x) => typeof x === 'number') as T[];
}

/**
 * Возвращает список значений для перечисления типа {@link enumType}.
 * Перечисления должно иметь строковый тип значений.
 */
export function getStringEnumValues<T>(enumType: {[p: string]: unknown}): T[] {
    return Object.values(enumType).filter((x) => typeof x === 'string') as T[];
}
