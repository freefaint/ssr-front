/**
 * Возвращает true, если значение не равно null или undefined.
 * @param value Проверяемое значение.
 */
export function hasValue<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

/**
 * Возвращает true, если значение не равно null, undefined или ''.
 * @param value Проверяемое значение.
 */
export function hasValueNotEmpty(value: string | undefined | null): value is string {
    return hasValue(value) && value !== '';
}
