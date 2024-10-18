import {Button, Checkbox, IconButton} from '@mui/material';
import {EMPTY_ARRAY} from 'northis.typescript.utils';
import {ReactElement} from 'react';
// @ts-ignore
import {ReactComponent as CollapseAllIcon} from '../../../assets/svg/collapse-all_ic.svg';
// @ts-ignore
import {ReactComponent as ExpandAllIcon} from '../../../assets/svg/expand-all_ic.svg';
import {TreeExpansionState} from '../expansion/use-tree-expansion';
import {TreeSelectionState} from '../selection/tree-selection-state';


/**
 * Представляет компонент с управляющими элементами таблицы (чекбокс выделения элементов, раскрывать/свернуть все, фильтры).
 */
export function TreeHeader<R>(props: {
    /**
     * Возвращает кнопку добавления фильтра.
     */
    readonly filterButton: ReactElement;
    /**
     * Возвращает модель выбора.
     */
    readonly selection: TreeSelectionState<R>;
    /**
     * Возвращает модель сворачивания/разворачивания узлов дерева.
     */
    readonly expansion: TreeExpansionState<R>;
}) {
    const {filterButton, selection, expansion} = props;
    const isAnySelected = selection.selectedItems.length > 0;
    const isAllSelected = selection.isAllSelected;

    function onCheckboxClick() {
        if (isAnySelected) {
            selection.updateSelectedItems(EMPTY_ARRAY);
        } else {
            selection.selectAll();
        }
    }

    function onCollapseClick() {
        expansion.setExpanded(EMPTY_ARRAY);
    }

    function onExpandClick() {
        expansion.expandAll();
    }

    return (
        <div className={selection.isMultiSelect ? 'treeHeaderRootMulti' : 'treeHeaderRootSingle'}>
            {selection.isMultiSelect ? (
                <IconButton
                    className={'iconButtonOutlined'}
                    onClick={onCheckboxClick}>
                    <Checkbox
                        className={'treeHeaderCheckbox'}
                        indeterminate={isAnySelected && !isAllSelected}
                        checked={isAllSelected}
                    />
                </IconButton>
            ) : null}
            <Button
                variant={'outlined'}
                onClick={onExpandClick}
                startIcon={<ExpandAllIcon className={'treeHeaderExpandAllIcon'} />}>
                Открыть все
            </Button>
            <Button
                variant={'outlined'}
                onClick={onCollapseClick}
                startIcon={<CollapseAllIcon className={'treeHeaderCollapseAllIcon'} />}>
                Закрыть все
            </Button>
            {filterButton}
        </div>
    );
}
