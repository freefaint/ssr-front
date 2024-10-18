import {DEFAULT_PAGE_SIZE} from '../paging-consts';

/**
 * Представляет параметры пагинации для таблицы данных.
 */
export class TablePagingParameters {
    /**
     * @param pageNumber Текущая страница.
     * @param pageSize Размер страницы.
     */
    constructor(readonly pageNumber: number, readonly pageSize: number) {}

    /**
     * Представляет значение по умолчанию.
     */
    static defaultValue = new TablePagingParameters(0, DEFAULT_PAGE_SIZE);
}
