import {NodesMap} from '../models/nodes-map';

/**
 * Возвращает плоское представление дерева на основе представления в виде словаря {@link NodesMap}.
 * @param items Представление в виде {@link NodesMap}.
 */
export function createFlatListFromNodesMap<R>(items: NodesMap<R>) {
    return Array.from(items.values()).flatMap((value) => value);
}
