import {hasValue} from 'northis.typescript.utils';

/**
 * Возвращает true, если переданное число не пустое, в противном случае возвращает текст ошибки.
 * @param value Число.
 */
export function numberRequiredValidation(value: number | undefined | null): boolean | string {
    return !hasValue(value) ? 'Поле не может быть пустым' : true;
}
