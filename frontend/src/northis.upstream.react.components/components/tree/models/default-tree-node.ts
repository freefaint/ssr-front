import {NodeIdType} from './node-id-type';

/**
 * Представляет интерфейс узла по-умолчанию.
 */
export interface DefaultTreeNode {
    /**
     * Возвращает идентификатор узла.
     */
    readonly id: NodeIdType;
    /**
     * Возвращает идентификатор родительского узла.
     */
    readonly parentId?: NodeIdType;
}
