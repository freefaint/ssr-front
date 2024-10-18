import {useCallback, useMemo, useState} from 'react';
import {FilterMode} from './filter-mode';
import {FilterModel} from './models/filter-model';
import {FilterState} from './models/filter-state';

/**
 * Представляет модель фильтрации запроса.
 * @param filterMode Режим фильтрации.
 */
export function useFilter(filterMode: FilterMode): FilterState {
    const [filterModel, setFilterModel] = useState<FilterModel>(FilterModel.defaultValue);
    const onFilterChange = useCallback((newModel: FilterModel) => setFilterModel(newModel), []);

    return useMemo(() => new FilterState(filterModel, onFilterChange, filterMode), [filterModel, onFilterChange, filterMode]);
}
