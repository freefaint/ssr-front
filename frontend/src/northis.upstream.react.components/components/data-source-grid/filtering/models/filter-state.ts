import {FilterModel} from './filter-model';

/**
 * Представляет состояние фильтрации.
 */
export class FilterState {
    /**
     * @param filterModel Модель фильтрации.
     * @param onFilterChange Делегат, с помощью которого можно изменить модель фильтрации.
     * @param filterMode Режим фильтрации.
     */
    constructor(
        readonly filterModel: FilterModel,
        readonly onFilterChange: (newValue: FilterModel) => void,
        readonly filterMode: 'client' | 'server',
    ) {}
}
