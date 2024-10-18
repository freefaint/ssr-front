/**
 * Представляет общие аргументы запроса.
 */
export class CommonQueryArgs<T> {
    /**
     * @param originalArgs Базовые аргументы, необходимые непосредственно для выполнения запроса.
     * @param skipError Значение "истина", если не нужно никак реагировать на ошибки, кроме авторизации.
     */
    constructor(readonly originalArgs: T, readonly skipError: boolean = false) {}
}
