import {ReactElement} from 'react';
import {FilterValue} from './filtering/filter-value';
import {RangeValuesValidationMessages} from './filtering/models/range-values-validation-messages';

/**
 * Представляет расширенный столбец.
 */
export interface ExtendColumn {
    /**
     * Возвращает сообщения с ошибкой валидации.
     */
    filterValueValidation?: (config: {
        /**
         * Возвращает значение фильтра.
         */
        readonly value: FilterValue;
    }) => RangeValuesValidationMessages;
    /**
     * Возвращает компонент фильтрации с указанной конфигурацией.
     */
    renderFilterComponent: (config: {
        /**
         * Делегат, вызываемый при изменении значения.
         */
        readonly onChange: (newValue: FilterValue) => void;
        /**
         * Возвращает значение.
         */
        readonly value: FilterValue;
    }) => ReactElement;
}
