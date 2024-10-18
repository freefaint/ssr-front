/**
 * Представляет модель выбора данных дерева.
 */
export class TreeSelectionState<R> {
    /**
     * @param selectedItems Выбранные элементы.
     * @param isMultiSelect Истина, если это модель для множественного выбора.
     * @param updateSelectedItems Устанавливает новый список выбранных элементов, выбирая их из списка.
     * @param isSelected Проверяет, выбран ли указанный элемент.
     * @param canSelectItem Предикат, определяющий возможность выбора узла.
     * @param isAllSelected Истина, если выбраны все элементы дерева.
     * @param selectAll Выбирает все элементы дерева.
     */
    constructor(
        readonly selectedItems: readonly R[],
        readonly isMultiSelect: boolean,
        readonly updateSelectedItems: (itemIds: readonly (string | number)[]) => void,
        readonly isSelected: (item: R) => boolean,
        readonly canSelectItem: (item: R) => boolean,
        readonly isAllSelected: boolean,
        readonly selectAll: () => void,
    ) {}
}
