import {FilterValue} from '../filter-value';
import {GridFilterItem} from '@mui/x-data-grid';

/**
 * Представляет элемент фильтра.
 */
export interface FilterItem extends GridFilterItem {
    /**
     * Поле, по которому осуществляется фильтрация.
     */
    readonly field: string;
    /**
     * Оператор сравнения.
     */
    readonly operator: string;
    /**
     * Значение фильтра.
     */
    readonly value?: FilterValue;
}
