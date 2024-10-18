/**
 * Представляет результат запроса с пагинацией.
 */
export class PagingResult<T> {
    /**
     * @param items Запрошенные данные.
     * @param totalCount Сколько всего данных доступно.
     */
    constructor(readonly items: readonly T[], readonly totalCount: number) {}

    /**
     * Возвращает пустое значение.
     */
    static readonly emptyValue = new PagingResult([], 0);
}
