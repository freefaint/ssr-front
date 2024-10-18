import {NodesMap} from '../models/nodes-map';
import {TreeNodeState} from './tree-node-state';

/**
 * Представляет состояние источника данных дерева.
 */
export class TreeDataSourceState<R> {
    /**
     * @param items Отображение идентификатора родителя в дочерние элементы.
     * @param hasChildren Делегат, возвращающий истину, если у элемента есть дочерние.
     * @param onExpandedChange Делегат, вызываемый при раскрытии/закрытии списка дочерних элементов.
     * @param isFetching Делегат, возвращающий истину, если происходит загрузка дочерних узлов указанного элемента. При значении null
     * проверяет загрузку корневых элементов.
     */
    constructor(
        readonly items: NodesMap<R>,
        readonly hasChildren: (node: R) => boolean | null,
        readonly onExpandedChange: (node: TreeNodeState<R>) => void,
        readonly isFetching: (node: R | null) => boolean,
    ) {}
}
