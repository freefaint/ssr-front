import classNames from 'classnames';
import {ClassNameProps} from 'northis.react.components';
import {EMPTY_ARRAY} from 'northis.typescript.utils';
import {ReactNode} from 'react';
import {SkeletonItems} from '../busy';
import {defaultIconSelector} from './default-icon-selector';
import {TreeExpansionState} from './expansion/use-tree-expansion';
import {RowIdDelegate} from './models/row-id-delegate';
import {TreeSelectionState} from './selection/tree-selection-state';
import {TreeDataSourceState} from './state/tree-data-source-state';
import {TreeNodeState} from './state/tree-node-state';
import {TreeItem} from './tree-item';


/**
 * Представляет компонент дерева.
 */
export function Tree<R>(
    props: ClassNameProps & {
        /**
         * Возвращает источник данных дерева.
         */
        readonly dataSource: TreeDataSourceState<R>;
        /**
         * Возвращает модель выбора.
         */
        readonly selection: TreeSelectionState<R>;
        /**
         * Возвращает модель сворачивания/разворачивания узлов дерева.
         */
        readonly expansion: TreeExpansionState<R>;
        /**
         * Возвращает делегат для получения идентификатора узла дерева.
         */
        readonly getRowId: RowIdDelegate<R>;
        /**
         * Возвращает делегат для отображения иконки узла дерева.
         */
        readonly iconRender?: (nodeState: TreeNodeState<R>) => ReactNode;
        /**
         * Возвращает делегат выбора дополнительного стиля для узла. Стиль привязывается к корневому элементу узла, куда привязывается
         * treeItemRoot.
         */
        readonly styleSelector?: (nodeState: TreeNodeState<R>) => string | null;
        /**
         * Возвращает делегат для отображения содержимого узла.
         */
        readonly labelRender: (nodeState: TreeNodeState<R>) => ReactNode;
        /**
         * Возвращает делегат, возвращающий {@link ReactNode}, отображаемый, когда в дереве нет узлов.
         */
        readonly noItemsRender?: () => ReactNode;
        /**
         * Возвращает высоту скелетона для отдельной строки.
         */
        readonly skeletonItemHeight: number;
        /**
         * Возвращает делегат, вызываемый при раскрытии или свертывании узла.
         * @param id Идентификатор узла, для которого производится операция раскрытия или сворачивания.
         */
        readonly handleExpandedClick?: (id: string) => void;
    },
) {
    const {
        dataSource,
        selection,
        iconRender,
        styleSelector,
        labelRender,
        getRowId,
        noItemsRender = defaultNoItems,
        skeletonItemHeight,
        className,
        expansion,
        handleExpandedClick,
    } = props;
    const nodesMap = dataSource.items;
    const isRootFetching = dataSource.isFetching(null);
    const nodes = nodesMap.get(null) ?? EMPTY_ARRAY;

    const onItemExpandedChange = (nodeState: TreeNodeState<R>) => {
        const node = nodeState.node;
        if (nodeState.isExpanded) {
            expansion.setExpanded([...expansion.expanded.filter((x) => getRowId(x) !== getRowId(node))]);
        } else {
            expansion.setExpanded([...expansion.expanded, node]);
        }
        dataSource.onExpandedChange(nodeState);
    };

    return (
        <div className={classNames('treeRoot', className)}>
            <SkeletonItems
                isBusy={isRootFetching}
                className={'treeRootSkeleton'}
                itemClassName={'treeRootSkeletonItem'}
                variant={'text'}
                count={5}
                itemHeight={skeletonItemHeight}>
                {nodes.length > 0
                    ? nodes.map((node) => (
                          <TreeItem
                              getRowId={getRowId}
                              dataSource={dataSource}
                              key={getRowId(node)}
                              level={0}
                              node={node}
                              expansion={expansion}
                              labelRender={labelRender}
                              styleSelector={styleSelector}
                              iconSelector={iconRender ?? defaultIconSelector}
                              onExpandedChange={onItemExpandedChange}
                              selection={selection}
                              handleExpandedClick={handleExpandedClick}
                          />
                      ))
                    : noItemsRender()}
            </SkeletonItems>
        </div>
    );
}

function defaultNoItems() {
    return <div className={'noDataContent'}>Нет данных</div>;
}
