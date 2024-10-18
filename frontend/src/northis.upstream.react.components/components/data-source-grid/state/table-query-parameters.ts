import {
    ServiceFilterItem,
    ServiceFilterParameters,
    ServicePagingParameters,
    ServiceQueryParameters,
    ServiceSortingParameters,
} from '../service/service-query-parameters';
import {TablePagingParameters} from './table-paging-parameters';
import {SortingModel} from '../sorting/sorting-model';
import {assertHasValue, hasValue} from 'northis.typescript.utils';
import {FilterModel} from '../filtering/models/filter-model';

/**
 * Представляет параметры таблицы данных.
 */
export class TableQueryParameters {
    /**
     * @param pagingParameters Параметры пагинации.
     * @param sortingModel Параметры сортировки.
     * @param filterModel Параметры фильтрации.
     */
    constructor(
        readonly pagingParameters: TablePagingParameters | null = null,
        readonly sortingModel: SortingModel | null = null,
        readonly filterModel: FilterModel | null = null,
    ) {}

    /**
     * Конвертирует {@link TableQueryParameters} в {@link ServiceQueryParameters}.
     * @param params Преобразуемые параметры.
     */
    public static createServiceParameters(params: TableQueryParameters): ServiceQueryParameters {
        return new ServiceQueryParameters(
            tryMapPaging(params.pagingParameters),
            tryMapSorting(params.sortingModel),
            tryMapFilter(params.filterModel),
        );
    }
}

/**
 * Преобразует клиентскую пагинацию в сервисную. Значение null передается без изменений.
 */
function tryMapPaging(pagingParameters: TablePagingParameters | null): ServicePagingParameters | null {
    if (!pagingParameters) {
        return null;
    }
    return new ServicePagingParameters(pagingParameters.pageNumber + 1, pagingParameters.pageSize);
}

/**
 * Преобразует клиентскую модель сортировки в сервисную. Значение null передается без изменений.
 * Также null возвращается, если список фильтров пуст или, если направление сортировки не определено.
 */
function tryMapSorting(sortingModel: SortingModel | null): ServiceSortingParameters | null {
    if (!sortingModel) {
        return null;
    }
    const sortingItem = sortingModel.at(0);
    if (!sortingItem) {
        return null;
    }
    if (!hasValue(sortingItem.sort)) {
        return null;
    }
    return new ServiceSortingParameters(sortingItem.field, sortingItem.sort === 'desc');
}

/**
 * Преобразует клиентскую модель фильтрации в сервисную. Возвращается null, если список фильтров пуст.
 */
function tryMapFilter(filterModel: FilterModel | null): ServiceFilterParameters | null {
    if (!filterModel) {
        return null;
    }
    const filterItems = filterModel.items.map((item) => {
        assertHasValue(item.value, 'Не задано значение фильтра');
        return new ServiceFilterItem(item.field, item.value);
    });
    return new ServiceFilterParameters(filterItems);
}
