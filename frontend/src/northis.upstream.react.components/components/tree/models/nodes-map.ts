import {NodeIdType} from './node-id-type';

/**
 * Представляет отображение идентификатора родительского узла в массив дочерних элементов этого узла. Описывает дерево.
 * @typeParam R Тип узла.
 */
export type NodesMap<R> = ReadonlyMap<NodeIdType | null, readonly R[]>;
