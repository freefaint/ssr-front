/**
 * Представляет модель выбора данных.
 */
export class SelectionState<R> {
    /**
     * @param selectedItems Выбранные элементы.
     * @param selectionMode Режим выбора данных.
     * @param updateSelectedItems Устанавливает новый список выбранных элементов, выбирая их из списка.
     */
    constructor(
        readonly selectedItems: readonly R[],
        readonly selectionMode: SelectionMode,
        readonly updateSelectedItems: (itemIds: readonly (string | number)[]) => void,
    ) {}
}

/**
 * Представляет тип режима выбора данных.
 */
export type SelectionModeType = 'Single' | 'Multiple';

/**
 * Представляет режим выбора данных.
 */
export class SelectionMode {
    /**
     * @param selectionModes Возвращает доступные режимы выбора данных.
     * @param defaultSelectionMode Возвращает режим выбора данных по умолчанию.
     */
    constructor(readonly selectionModes: SelectionModeType[], readonly defaultSelectionMode: SelectionModeType) {}
}
