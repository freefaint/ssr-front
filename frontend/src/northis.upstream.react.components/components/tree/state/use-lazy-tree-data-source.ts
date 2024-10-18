import {EMPTY_ARRAY} from 'northis.typescript.utils';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {DefaultTreeNode} from '../models/default-tree-node';
import {createNodesMapFromList} from '../utils/create-nodes-map-from-list';
import {TreeDataSourceState} from './tree-data-source-state';
import {TreeNodeState} from './tree-node-state';

/**
 * Представляет общий вариант источника данных с ленивой загрузкой на основе которого нужно реализовать конкретные источники данных.
 * @typeParam R Тип модели привязанной к узлу.
 * @param fetchChildren Делегат загрузки дочерних узлов по идентификатору родительского.
 * @param hasChildren Делегат проверки наличия дочерних узлов.
 * @param sortCompareFn Функция сравнения используемая при сортировке. Если не указана, то сортировки не происходит.
 */
export function useLazyTreeDataSource<R extends DefaultTreeNode>(
    fetchChildren: (id: string | null) => Promise<readonly R[]>,
    hasChildren: (node: R) => boolean,
    sortCompareFn?: (a: R, b: R) => number,
) {
    const [subtreeNodes, setSubtreeNodes] = useState<readonly R[]>(EMPTY_ARRAY);
    const [rootNodes, setRootNodes] = useState<readonly R[]>(EMPTY_ARRAY);
    // Значение undefined представляет отсутствие загрузки, null - загрузку корневых узлов, string это идентификатор узла, потомки
    // которого загружаются.
    const [fetchingId, setFetchingId] = useState<string | null | undefined>();

    const allNodesMap = useMemo(() => {
        return createNodesMapFromList(rootNodes.concat(subtreeNodes), sortCompareFn);
    }, [rootNodes, subtreeNodes]);

    const onExpandedChange = useCallback(
        async (nodeState: TreeNodeState<R>) => {
            if (nodeState.isExpanded) {
                setSubtreeNodes(subtreeNodes.filter((value) => value.parentId !== nodeState.node.id));
            } else {
                try {
                    setFetchingId(nodeState.node.id);
                    const result = await fetchChildren(nodeState.node.id);
                    setSubtreeNodes(subtreeNodes.concat(result));
                } finally {
                    setFetchingId(undefined);
                }
            }
        },
        [subtreeNodes, fetchChildren],
    );

    const isFetching = useCallback(
        (node: R | null) => {
            if (node) {
                return node.id === fetchingId;
            } else {
                return fetchingId === null;
            }
        },
        [fetchingId],
    );

    const fetchRootItems = useCallback(async () => {
        try {
            setFetchingId(null);
            const result = await fetchChildren(null);
            setRootNodes(result);
        } finally {
            setFetchingId(undefined);
        }
    }, [fetchChildren]);

    useEffect(() => {
        fetchRootItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return new TreeDataSourceState(allNodesMap, hasChildren, onExpandedChange, isFetching);
}
