import {DataSourceState} from './data-source-state';
import {EMPTY_ARRAY} from 'northis.typescript.utils';
import {FilterState} from '../filtering/models/filter-state';
import {SortingState} from '../sorting/sorting-state';

/**
 * Создает состояние источника данных для жадного запроса без пагинации.
 * @typeParam R Тип единицы данных.
 * @param data Данные загруженные жадно.
 * @param isFetching Истина, если данные загружаются.
 * @param filtering Состояние фильтрации.
 * @param sorting Состояние сортировки.
 */
export function createDataSourceStateGreedyAdapter<R>(
    data: readonly R[] | undefined,
    isFetching: boolean,
    filtering: FilterState,
    sorting: SortingState,
) {
    return new DataSourceState(data ?? EMPTY_ARRAY, data?.length ?? 0, null, isFetching, filtering, sorting);
}
