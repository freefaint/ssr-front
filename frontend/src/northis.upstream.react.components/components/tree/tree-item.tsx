import {Checkbox, Skeleton} from '@mui/material';
import classNames from 'classnames';
import {EMPTY_ARRAY, hasValue} from 'northis.typescript.utils';
import {ReactNode, useCallback} from 'react';
import {TreeExpansionState} from './expansion/use-tree-expansion';
import {RowIdDelegate} from './models/row-id-delegate';
import {TreeSelectionState} from './selection/tree-selection-state';
import {TreeDataSourceState} from './state/tree-data-source-state';
import {TreeNodeState} from './state/tree-node-state';
import {getSubtree} from './utils/get-subtree';

/**
 * Представляет компонент элемента древовидного списка.
 * @typeParam R Тип модели привязанной к узлу.
 */
export function TreeItem<R>(props: {
    /**
     * Возвращает модель узла дерева.
     */
    readonly node: R;
    /**
     * Возвращает модель выбора.
     */
    readonly selection: TreeSelectionState<R>;
    /**
     * Возвращает модель сворачивания/разворачивания узлов дерева.
     */
    readonly expansion: TreeExpansionState<R>;
    /**
     * Возвращает уровень дерева, на котором находится узел.
     */
    readonly level: number;
    /**
     * Возвращает делегат, вызываемый при раскрытии или свертывании узла.
     */
    readonly onExpandedChange: (node: TreeNodeState<R>) => void;
    /**
     * Возвращает делегат для отображения иконки узла дерева.
     */
    readonly iconSelector: (node: TreeNodeState<R>) => ReactNode;
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
     * Возвращает делегат для получения идентификатора узла дерева.
     */
    readonly getRowId: RowIdDelegate<R>;
    /**
     * Возвращает источник данных дерева.
     */
    readonly dataSource: TreeDataSourceState<R>;
    /**
     * Возвращает делегат, вызываемый при раскрытии или свертывании узла.
     * @param id Идентификатор узла, для которого производится операция раскрытия или сворачивания.
     */
    readonly handleExpandedClick?: (id: string) => void;
}) {
    const {
        node,
        onExpandedChange,
        selection,
        iconSelector,
        styleSelector,
        labelRender,
        level,
        getRowId,
        dataSource,
        expansion,
        handleExpandedClick,
    } = props;
    const isExpanded = hasValue(expansion.expanded.find((x) => getRowId(x) === getRowId(node)));
    const isSelected = selection.isSelected(node);
    const hasChildren = dataSource.hasChildren(node);
    const isFetching = dataSource.isFetching(node);
    const items = dataSource.items;
    const children = dataSource.items.get(getRowId(node)) ?? [];
    const nodeState = {
        node: node,
        isExpanded: isExpanded,
        hasChildren,
    };
    const isSelectable = selection.canSelectItem(node);
    const subtreeFlatList = getSubtree(items, node, getRowId);

    function toggleExpanded(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.stopPropagation();
        onExpandedChange(nodeState);
        if (handleExpandedClick && !isExpanded) {
            handleExpandedClick(getRowId(node));
        }
    }

    function toggleSelfSelectedState() {
        const isSelected = selection.isSelected(node);
        const nodeId = getRowId(node);
        if (selection.isMultiSelect) {
            if (!isSelected) {
                selection.updateSelectedItems(selection.selectedItems.map(getRowId).concat([nodeId]));
            } else {
                selection.updateSelectedItems([...selection.selectedItems.map(getRowId).filter((x) => x !== nodeId)]);
            }
        } else {
            if (!isSelected) {
                selection.updateSelectedItems([nodeId]);
            } else {
                selection.updateSelectedItems(EMPTY_ARRAY);
            }
        }
    }

    function toggleSubtreeSelectedState() {
        const isSelected = selection.isSelected(node);
        const nodeId = getRowId(node);
        if (selection.isMultiSelect) {
            if (!isSelected) {
                selection.updateSelectedItems(selection.selectedItems.map(getRowId).concat(subtreeFlatList.map(getRowId)));
                expansion.setExpanded(expansion.expanded.concat(subtreeFlatList));
            } else {
                const subtreeIds = subtreeFlatList.map(getRowId);
                selection.updateSelectedItems([
                    ...selection.selectedItems.map(getRowId).filter((selectedId) => !subtreeIds.includes(selectedId)),
                ]);
            }
        } else {
            if (!isSelected) {
                selection.updateSelectedItems([nodeId]);
            } else {
                selection.updateSelectedItems(EMPTY_ARRAY);
            }
        }
    }

    function onLabelClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        event.stopPropagation();
        if (isSelectable) {
            toggleSelfSelectedState();
        }
    }
    function onCheckboxClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        event.stopPropagation();
        if (isSelectable) {
            toggleSubtreeSelectedState();
        }
    }

    function getCheckBoxAttributes() {
        if (!selection.isMultiSelect) {
            return {
                checked: isSelected,
                indeterminate: false,
            };
        } else {
            const hasSelectedChild = subtreeFlatList.some((value) => selection.isSelected(value));
            const hasUnselectedChild = subtreeFlatList.some((value) => !selection.isSelected(value));
            return {
                checked: hasSelectedChild && !hasUnselectedChild,
                indeterminate: hasSelectedChild && hasUnselectedChild,
            };
        }
    }

    return (
        <div
            onMouseDown={(event) => {
                // Предотвращает выделение при двойном нажатии мышью.
                if (event.detail > 1) {
                    event.preventDefault();
                }
            }}
            className={classNames(
                'treeItemRoot',
                isExpanded ? 'treeItemRootExpanded' : undefined,
                isSelected ? 'treeItemRootSelected' : undefined,
                !isSelectable ? 'treeItemRootNotSelectable' : undefined,
                styleSelector ? styleSelector(nodeState) : undefined,
            )}>
            <div className={'treeItemContent'}>
                {generateIndents(level)}
                <div
                    className={'treeItemIcon'}
                    onClick={toggleExpanded}>
                    {iconSelector(nodeState)}
                </div>
                {selection.isMultiSelect ? (
                    <Checkbox
                        className={'treeItemCheckbox'}
                        {...getCheckBoxAttributes()}
                        onClick={onCheckboxClick}
                    />
                ) : null}
                <div
                    onClick={onLabelClick}
                    className={'treeItemLabel'}>
                    {labelRender(nodeState)}
                </div>
            </div>
            {hasChildren && isExpanded ? (
                isFetching ? (
                    <div className={'treeItemLoading'}>
                        {generateIndents(level + 1)}
                        <div className={'treeItemSkeletonStack'}>
                            <Skeleton
                                className={'treeItemsSkeleton'}
                                variant={'text'}
                                animation={'wave'}
                            />
                            <Skeleton
                                className={'treeItemsSkeleton'}
                                variant={'text'}
                                animation={'wave'}
                            />
                            <Skeleton
                                className={'treeItemsSkeleton'}
                                variant={'text'}
                                animation={'wave'}
                            />
                        </div>
                    </div>
                ) : (
                    <div className={'treeItemSubtree'}>
                        {children.map((node) => {
                            return (
                                <TreeItem
                                    level={level + 1}
                                    node={node}
                                    key={getRowId(node)}
                                    dataSource={dataSource}
                                    getRowId={getRowId}
                                    labelRender={labelRender}
                                    iconSelector={iconSelector}
                                    styleSelector={styleSelector}
                                    expansion={expansion}
                                    onExpandedChange={onExpandedChange}
                                    selection={selection}
                                    handleExpandedClick={handleExpandedClick}
                                />
                            );
                        })}
                    </div>
                )
            ) : (
                <></>
            )}
        </div>
    );
}

function generateIndents(level: number) {
    const indents = [];
    for (let i = 0; i < level; i++) {
        indents.push(
            <div
                key={i}
                className={'treeItemIndent'}
            />,
        );
    }
    return indents;
}
