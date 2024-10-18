import {GridLogicOperator} from '@mui/x-data-grid';
import {FilterItem} from './filter-item';

/**
 * Представляет модель фильтрации.
 */
export class FilterModel {
    /**
     * @param items Элементы фильтра.
     * @param logicOperator Логический оператор, применяемый между элементами фильтра.
     */
    constructor(readonly items: FilterItem[], readonly logicOperator: GridLogicOperator) {}

    /**
     * Представляет значение по умолчанию.
     */
    static defaultValue = new FilterModel([], GridLogicOperator.And);
}
