import {GridFilterOperator} from '@mui/x-data-grid';
import {FilterOperators} from './filter-operators';
import {FilterItem} from './models/filter-item';
import {DateRange, NumberRange} from './models/value-range';

/**
 * Представляет оператор для фильтрации в указанном диапазоне.
 */
export const FilterBetweenOperator: GridFilterOperator[] = [
    {
        label: FilterOperators.Between,
        value: FilterOperators.Between,
        getApplyFilterFn: (filterItem: FilterItem) => {
            const filterValue = filterItem.value as NumberRange | DateRange | undefined | null;
            return ({value}) => {
                const isSatisfiesToMin = filterValue && filterValue.minValue ? filterValue.minValue <= value : true;
                const isSatisfiesToMax = filterValue && filterValue.maxValue ? value <= filterValue.maxValue : true;
                return value !== null && isSatisfiesToMin && isSatisfiesToMax;
            };
        },
    },
];
