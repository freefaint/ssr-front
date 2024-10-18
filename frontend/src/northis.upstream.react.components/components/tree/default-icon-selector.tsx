// @ts-ignore
import {ReactComponent as ArrowDownIcon} from '../../assets/svg/arrow-down_ic.svg';
// @ts-ignore
import {ReactComponent as ArrowRightIcon} from '../../assets/svg/arrow-right_ic.svg';
import {TreeNodeState} from './state/tree-node-state';

/**
 * Выбор иконки по умолчанию. Отображает иконки для раскрывающихся элементов.
 * @param state Состояние узла дерева.
 */
export function defaultIconSelector<R>(state: TreeNodeState<R>) {
    if (state.hasChildren) {
        return state.isExpanded ? <ArrowDownIcon /> : <ArrowRightIcon />;
    }
    return null;
}
