import {EMPTY_ARRAY} from 'northis.typescript.utils';
import {useCallback, useMemo, useState} from 'react';
import {TreeDataSourceState} from '../state/tree-data-source-state';
import {createFlatListFromNodesMap} from '../utils/create-flat-list-from-nodes-map';

/**
 * Представляет хук, формирующий модель сворачивания/разворачивания узлов дерева.
 * @param dataSource Источник данных дерева.
 */
export function useTreeExpansion<R>(dataSource: TreeDataSourceState<R>) {
    const [expandedNodes, setExpandedNodes] = useState<readonly R[]>(EMPTY_ARRAY);
    const {items} = dataSource;
    const itemsFlatList = useMemo(() => {
        return createFlatListFromNodesMap(items);
    }, [items]);

    const expandAll = useCallback(() => {
        setExpandedNodes(itemsFlatList);
    }, [itemsFlatList]);

    const setExpanded = useCallback((nodes: readonly R[]) => {
        setExpandedNodes(nodes);
    }, []);

    const collapseAll = useCallback(() => {
        setExpandedNodes(EMPTY_ARRAY);
    }, []);

    const setNodeExpanded = useCallback((node: R) => {
        setExpandedNodes((prev) => [...prev, node]);
    }, []);

    return useMemo(
        () => new TreeExpansionState(expandedNodes, setExpanded, expandAll, setNodeExpanded, collapseAll),
        [expandedNodes, setExpanded, expandAll],
    );
}

/**
 * Представляет модель сворачивания/разворачивания узлов дерева.
 */
export class TreeExpansionState<R> {
    /**
     * @param expanded Список раскрытых узлов.
     * @param setExpanded Устанавливает список раскрытых узлов.
     * @param expandAll Раскрывает все узлы дерева.
     * @param setNodeExpanded Раскрывает указанный узел дерева.
     * @param collapseAll Сворачивает все узлы дерева.
     */
    constructor(
        readonly expanded: readonly R[],
        readonly setExpanded: (nodes: readonly R[]) => void,
        readonly expandAll: () => void,
        readonly setNodeExpanded: (node: R) => void,
        readonly collapseAll: () => void,
    ) {}
}
