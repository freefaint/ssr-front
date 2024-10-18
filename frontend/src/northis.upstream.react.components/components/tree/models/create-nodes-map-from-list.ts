import {DefaultTreeNode} from './default-tree-node';
import {NodesMap} from './nodes-map';

/**
 * Создает отображение {@link NodesMap} из плоского списка узлов дерева.
 * @typeParam R Тип узла.
 * @param nodes Плоский список узлов.
 * @param sortCompareFn Функция сравнения используемая при сортировке. Если не указана, то сортировки не происходит.
 */
export function createNodesMapFromList<R extends DefaultTreeNode>(
    nodes: readonly R[],
    sortCompareFn?: (a: R, b: R) => number,
): NodesMap<R> {
    const nodesMap = new Map<string | null, R[]>();
    for (const node of nodes) {
        const pid = node.parentId ?? null;
        let children = nodesMap.get(pid);
        if (!children) {
            children = [];
            nodesMap.set(pid, children);
        }
        children.push(node);
        if (sortCompareFn) {
            children.sort(sortCompareFn);
        }
    }
    return nodesMap;
}
