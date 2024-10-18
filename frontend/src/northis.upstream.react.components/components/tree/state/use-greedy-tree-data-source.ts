import {hasValue} from 'northis.typescript.utils';
import {useCallback, useMemo} from 'react';
import {DefaultTreeNode} from '../models/default-tree-node';
import {createNodesMapFromList} from '../utils/create-nodes-map-from-list';
import {TreeDataSourceState} from './tree-data-source-state';

/**
 * Представляет источник данных для дерева с жадной загрузкой данных.
 * @typeParam R Тип модели привязанной к узлу.
 * @param nodes Массив всех узлов дерева.
 * @param isFetching Содержит истину, когда происходит загрузка дерева.
 * @param sortCompareFn Функция сравнения используемая при сортировке. Если не указана, то сортировки не происходит.
 * @param nodeHasChildren  Функция, определяющая, имеет ли указанный узел дочерние элементы. Если не предоставлена или возвращает null, используется внутренняя логика для определения наличия дочерних элементов.
 * */
export function useGreedyTreeDataSource<R extends DefaultTreeNode>(
    nodes: readonly R[],
    isFetching: boolean,
    sortCompareFn?: (a: R, b: R) => number,
    nodeHasChildren?: (node: R) => boolean | null,
) {
    const nodesMap = useMemo(() => {
        const clearNodes = clearParentlessNodes(nodes);
        return createNodesMapFromList(clearNodes, sortCompareFn);
    }, [nodes, sortCompareFn]);

    useCallback(
        (node: R | undefined) => {
            return nodes.filter((value) => value.parentId === node?.id);
        },
        [nodes],
    );
    const hasChildren = useCallback(
        (node: R) => {
            if (nodeHasChildren && hasValue(nodeHasChildren(node))) {
                return nodeHasChildren(node);
            } else {
                return hasValue(nodes.find((value) => value.parentId === node.id));
            }
        },
        [nodes],
    );
    const isFetchingCallback = useCallback(
        (node: R | null) => {
            if (node === null) {
                return isFetching;
            } else {
                return false;
            }
        },
        [isFetching],
    );
    return useMemo(() => {
        return new TreeDataSourceState<R>(nodesMap, hasChildren, emptyOnExpandedChange, isFetchingCallback);
    }, [nodesMap, hasChildren, isFetchingCallback]);
}

/**
 * Не выполняет кода, т.к. жадной реализации не нужно выполнять загрузку при раскрытии элемента.
 */
function emptyOnExpandedChange() {}

/**
 * Очищает parentId для тех узлов дерева, чьи родители не присутствуют в списке.
 */
function clearParentlessNodes<R extends DefaultTreeNode>(nodes: readonly R[]): readonly R[] {
    const newList: R[] = [];
    nodes.forEach((node) => {
        const parent = nodes.find((x) => x.id === node.parentId);
        if (hasValue(node.parentId) && !hasValue(parent)) {
            newList.push({...node, parentId: undefined});
        } else {
            newList.push(node);
        }
    });
    return newList;
}
