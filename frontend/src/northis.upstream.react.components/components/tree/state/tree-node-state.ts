/**
 * Представляет состояние узла дерева.
 * @typeParam R Тип модели привязанной к узлу.
 */
export interface TreeNodeState<R> {
    /**
     * Возвращает истину, если у узла есть потомки.
     */
    readonly hasChildren: boolean | null;
    /**
     * Возвращает истину, если узел развернут.
     */
    readonly isExpanded: boolean;
    /**
     * Возвращает модель узла.
     */
    readonly node: R;
}
