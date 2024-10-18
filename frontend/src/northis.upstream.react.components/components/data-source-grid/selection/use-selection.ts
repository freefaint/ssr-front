import {GridRowIdGetter, GridValidRowModel} from '@mui/x-data-grid';
import {hasValue} from 'northis.typescript.utils';
import {useEffect, useState} from 'react';
import {DataSourceState} from '../state/data-source-state';
import {SelectionModeType, SelectionState, SelectionMode} from './selection-state';
import {useRefreshSelectedItems} from './use-refresh-selected-items';

/**
 * Представляет свойства режима выбора данных.
 */
export type SelectionModeProps = {
    /**
     * Возвращает доступные режимы выбора данных.
     */
    readonly selectionModes: SelectionModeType[];
    /**
     * Возвращает режим выбора данных по умолчанию.
     */
    readonly defaultSelectionMode?: SelectionModeType;
};

/**
 * Представляет хук, формирующий модель выбора данных.
 */
export function useSelection<R extends GridValidRowModel>(config: {
    /**
     * Возвращает свойства режима выбора данных.
     */
    readonly selectionModeProps: SelectionModeProps;
    /**
     * Возвращает делегат получения идентификатора модели.
     */
    readonly getRowId: GridRowIdGetter<R>;
    /**
     * Возвращает источник данных, из которого происходит получение выбранных элементов по идентификатору.
     */
    readonly dataSource: DataSourceState<R>;
}) {
    const {dataSource, getRowId, selectionModeProps} = config;
    const {items} = dataSource;
    const [selectedItemsInternal, setSelectedItemsInternal] = useState<R[]>([]);
    const selectionModes = selectionModeProps.selectionModes;

    useEffect(() => {
        if (
            (!selectionModes.includes('Multiple') && selectionModeProps.defaultSelectionMode === 'Multiple') ||
            (!selectionModes.includes('Single') && selectionModeProps.defaultSelectionMode === 'Single')
        ) {
            throw new Error('Неверная конфигурация режима множественного выбора.');
        }
    }, [selectionModeProps]);

    const defaultMode = () => {
        if (hasValue(selectionModeProps.defaultSelectionMode)) {
            return selectionModeProps.defaultSelectionMode;
        } else {
            return selectionModes[0];
        }
    };

    const tableSelectionMode = new SelectionMode(selectionModes, defaultMode());

    function updateSelectedItems(itemIds: readonly (string | number)[]) {
        const oldSelected = [...selectedItemsInternal];
        const currentSelectedIds = oldSelected.map(getRowId);
        const removedIds = currentSelectedIds.filter((x) => !itemIds.includes(x));
        const oldRowsWithoutRemoved = oldSelected.filter((x) => !removedIds.includes(getRowId(x)));
        const addedIds = itemIds.filter((x) => {
            if (hasValue(x)) {
                return !currentSelectedIds.includes(x);
            }
        });
        const addedRows = items.filter((x) => addedIds.includes(getRowId(x)));
        const newSelectedItems = [...oldRowsWithoutRemoved, ...addedRows];
        setSelectedItemsInternal([...newSelectedItems]);
    }

    useRefreshSelectedItems(items, selectedItemsInternal, setSelectedItemsInternal, getRowId);

    return new SelectionState(selectedItemsInternal, tableSelectionMode, updateSelectedItems);
}
