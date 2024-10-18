import {NodeIdType} from './node-id-type';

/**
 * Представляет тип делегата для получения идентификатора узла дерева.
 * @typeParam R Тип модели привязанной к узлу.
 */
export type RowIdDelegate<R> = (node: R) => NodeIdType;
