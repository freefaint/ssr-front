import {FilterValue} from '../filtering/filter-value';

/**
 * Представляет допустимый тип значения фильтра.
 */
type FilterValueType = string | number;

/**
 * Представляет параметры для сервисных запросов.
 */
export class ServiceQueryParameters {
    /**
     * @param pagingParameters Параметры пагинации.
     * @param sortingParameters Параметры сортировки.
     * @param filterParameters Параметры фильтрации.
     */
    constructor(
        readonly pagingParameters: ServicePagingParameters | null = null,
        readonly sortingParameters: ServiceSortingParameters | null = null,
        readonly filterParameters: ServiceFilterParameters | null = null,
    ) {}

    /**
     * Возвращает параметры пагинации и сортировки.
     */
    getParams() {
        return {
            ...(this.pagingParameters ?? {}),
            ...(this.sortingParameters ?? {}),
        };
    }

    /**
     * Возвращает значение фильтра для указанного поля.
     * @param field Поле, по которому необходимо отфильтровать.
     */
    getFilterValue(field: string): FilterValueType | undefined {
        const foundFilter = this.filterParameters?.filterItems.find((value) => value.field === field);
        if (!foundFilter) {
            return undefined;
        }
        if (typeof foundFilter.value === 'string' || typeof foundFilter.value === 'number') {
            return foundFilter.value;
        } else {
            throw new Error('Неподдерживаемый тип значения фильтра');
        }
    }
}

/**
 * Представляет параметры пагинации сервисных запросов.
 */
export class ServicePagingParameters {
    /**
     * @param pageNumber Текущую страницу.
     * @param pageSize Размер страницы.
     */
    constructor(readonly pageNumber: number, readonly pageSize: number) {}
}

/**
 * Представляет параметры сортировки.
 */
export class ServiceSortingParameters {
    /**
     * @param PropertyName Наименование свойства для сортировки.
     * @param IsDescending Истина, если требуется сортировка по убыванию.
     */
    constructor(readonly PropertyName: string, readonly IsDescending: boolean) {}
}

/**
 * Представляет параметры фильтрации.
 */
export class ServiceFilterParameters {
    /**
     * @param filterItems Элементы фильтрации.
     */
    constructor(readonly filterItems: readonly ServiceFilterItem[]) {}
}

/**
 * Представляет элемент фильтрации.
 */
export class ServiceFilterItem {
    /**
     * @param field Поле, по которому необходимо выполнить фильтрацию.
     * @param value Значение фильтра.
     */
    constructor(readonly field: string, readonly value: FilterValue) {}
}
