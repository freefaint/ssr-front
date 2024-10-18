import {GridColDef, GridValidRowModel} from '@mui/x-data-grid';
import {ExtendColumn} from './extend-column';
import {FilterValueTypes} from './filtering/filter-value-types';

/**
 * Представляет определение колонок таблицы.
 */
export type DataGridColDef<R extends GridValidRowModel = any, V = any, F = V> = GridColDef<R, V, F> & {
    /**
     * Компонент ввода значения фильтра.
     */
    filterComponent?: ExtendColumn;
    /**
     * Тип значения фильтра.
     */
    filterValueType?: FilterValueTypes;
    /**
     * Делегат, возвращающий значение в строковом представлении.
     */
    filterGetLabelFunc?<T>(value: T): string;
};
