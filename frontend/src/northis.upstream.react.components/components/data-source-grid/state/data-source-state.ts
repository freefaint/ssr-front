import {PagingState} from './paging-state';
import {SortingState} from '../sorting/sorting-state';
import {FilterState} from '../filtering/models/filter-state';

/**
 * Позволяет выполнять запрос данных с заданными параметрами. Хранит полученные данные.
 * @typeParam R Тип единицы данных.
 */
export class DataSourceState<R> {
    /**
     * @param items Загруженные элементы.
     * @param totalCount Количество всех элементов на сервисе.
     * @param paging Данные пагинации.
     * @param isFetching Истина, если происходит загрузка.
     * @param filtering Состояние фильтрации.
     * @param sorting Состояние сортировки.
     */
    constructor(
        readonly items: readonly R[],
        readonly totalCount: number,
        readonly paging: PagingState | null,
        readonly isFetching: boolean,
        readonly filtering: FilterState | null,
        readonly sorting: SortingState | null,
    ) {}
}
