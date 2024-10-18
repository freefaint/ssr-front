import {hasValue} from './has-value';

/**
 * Возвращает значение, если оно не null или undefined. В противном случае возвращает значение по умолчанию.
 * @param value Значение.
 * @param defaultValue Значение по умолчанию.
 */
export function valueOrDefault(value: string | null | undefined, defaultValue: string = ''): string {
    return hasValue(value) ? value :  defaultValue;
}
