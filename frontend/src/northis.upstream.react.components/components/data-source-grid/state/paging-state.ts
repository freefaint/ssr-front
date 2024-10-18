import {TablePagingParameters} from './table-paging-parameters';

/**
 * Представляет состояние пагинации.
 */
export class PagingState {
    /**
     * @param parameters Параметры пагинации.
     * @param onParametersChange Делегат, с помощью которого можно изменить параметры пагинации.
     */
    constructor(readonly parameters: TablePagingParameters, readonly onParametersChange: (newValue: TablePagingParameters) => void) {}
}
