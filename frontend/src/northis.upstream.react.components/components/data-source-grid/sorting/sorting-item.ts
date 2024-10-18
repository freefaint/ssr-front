/**
 * Представляет элемент сортировки.
 */
export interface SortingItem {
    /**
     * Поле, по которому осуществляется сортировка.
     */
    readonly field: string;
    /**
     * Направление сортировки.
     */
    readonly sort: 'asc' | 'desc' | null | undefined;
}
