import {SortingModel} from './sorting-model';

/**
 * Представляет состояние сортировки.
 */
export class SortingState {
    /**
     * @param sortingModel Модель сортировки.
     * @param onSortModelChange Делегат, с помощью которого можно изменить модель сортировки.
     * @param sortingMode Режим сортировки.
     */
    constructor(
        readonly sortingModel: SortingModel,
        readonly onSortModelChange: (newValue: SortingModel) => void,
        readonly sortingMode: 'client' | 'server',
    ) {}
}
