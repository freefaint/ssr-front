import {NodesMap} from '../models/nodes-map';
import {RowIdDelegate} from '../models/row-id-delegate';

/**
 * Возвращает поддерево узла {@link item}, в том числе сам {@link item}}.
 * @param items Представление дерева.
 * @param item Узел дерева.
 * @param getRowId Делегат для получения идентификатора узла дерева.
 */
export function getSubtree<R>(items: NodesMap<R>, item: R, getRowId: RowIdDelegate<R>) {
    const queue = [];
    const result = [];
    queue.push(item);
    while (queue.length > 0) {
        const next = queue.shift();
        if (next) {
            result.push(next);
            const children = items.get(getRowId(next));
            if (children) {
                queue.push(...children);
            }
        }
    }
    return result;
}
