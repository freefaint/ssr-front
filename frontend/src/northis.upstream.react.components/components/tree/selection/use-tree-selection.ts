import {EMPTY_ARRAY, hasValue} from 'northis.typescript.utils';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useRefreshSelectedItems} from '../../data-source-grid';
import {RowIdDelegate} from '../models/row-id-delegate';
import {TreeDataSourceState} from '../state/tree-data-source-state';
import {createFlatListFromNodesMap} from '../utils/create-flat-list-from-nodes-map';
import {TreeSelectionState} from './tree-selection-state';

/**
 * Представляет хук, формирующий модель выбора данных дерева.
 */
export function useTreeSelection<R>(config: {
    /**
     * Возвращает истину, если требуется множественный выбор.
     */
    readonly isMultiSelect: boolean;
    /**
     * Возвращает делегат получения идентификатора модели.
     */
    readonly getRowId: RowIdDelegate<R>;
    /**
     * Возвращает источник данных, из которого происходит получение выбранных элементов по идентификатору.
     */
    readonly dataSource: TreeDataSourceState<R>;
    /**
     * Возвращает предикат, определяющий возможность выбора узла.
     */
    readonly canSelectItem?: (item: R) => boolean;
    /**
     * Возвращает коллбэк, вызываемый при изменении набора выбранных элементов.
     */
    readonly onSelectedItemsChanged?: (items: readonly R[]) => void;
}) {
    const {dataSource, getRowId, isMultiSelect, canSelectItem, onSelectedItemsChanged} = config;
    const {items} = dataSource;
    const [selectedItemsInternal, setSelectedItemsInternal] = useState<readonly R[]>(EMPTY_ARRAY);
    const itemsFlatList = useMemo(() => {
        return createFlatListFromNodesMap(items);
    }, [items]);

    useRefreshSelectedItems(itemsFlatList, selectedItemsInternal, setSelectedItemsInternal, getRowId);

    const updateSelectedItems = useCallback(
        (itemIds: readonly (string | number)[]) => {
            let newSelectedItems: R[] = [];
            if (!isMultiSelect) {
                const singleItemId = itemIds[0];
                if (hasValue(singleItemId)) {
                    const newSelectedItem = itemsFlatList.find((x) => getRowId(x) === singleItemId);
                    if (hasValue(newSelectedItem)) {
                        newSelectedItems = [newSelectedItem];
                    }
                }
            } else {
                const oldSelected = [...selectedItemsInternal];
                const currentSelectedIds = oldSelected.map(getRowId);
                const removedIds = currentSelectedIds.filter((x) => !itemIds.includes(x));
                const oldRowsWithoutRemoved = oldSelected.filter((x) => !removedIds.includes(getRowId(x)));
                const addedIds = itemIds.filter((x) => !currentSelectedIds.includes(x.toString()));
                const addedRows = itemsFlatList.filter((x) => addedIds.includes(getRowId(x)));
                newSelectedItems = [...oldRowsWithoutRemoved, ...addedRows];
            }
            setSelectedItemsInternal([...newSelectedItems]);
        },
        [getRowId, isMultiSelect, itemsFlatList, selectedItemsInternal],
    );

    useEffect(() => {
        if (onSelectedItemsChanged) {
            onSelectedItemsChanged([...selectedItemsInternal]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItemsInternal]);

    const isSelected = useCallback(
        (node: R) => {
            return hasValue(selectedItemsInternal.find((x) => getRowId(x) === getRowId(node)));
        },
        [selectedItemsInternal, getRowId],
    );

    const isAllSelected = useMemo(() => {
        return itemsFlatList.every((item) => selectedItemsInternal.find((selectedItem) => getRowId(selectedItem) === getRowId(item)));
    }, [itemsFlatList, selectedItemsInternal, getRowId]);

    const selectAll = useCallback(() => {
        return updateSelectedItems(itemsFlatList.map(getRowId));
    }, [itemsFlatList, getRowId, updateSelectedItems]);

    return new TreeSelectionState(
        selectedItemsInternal,
        isMultiSelect,
        updateSelectedItems,
        isSelected,
        canSelectItem ?? defaultCanSelectItem,
        isAllSelected,
        selectAll,
    );
}

function defaultCanSelectItem() {
    return true;
}
