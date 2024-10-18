import {Button, DialogActions, DialogContent, DialogTitle, Popover} from '@mui/material';
import {ChildrenProps} from 'northis.react.components';

import {FilterPanelPosition} from '../models/filter-panel-position';
import {hasValue} from 'northis.typescript.utils';
import classNames from "classnames";

/**
 * Представляет панель фильтрации для таблицы.
 */
export function DataGridFilterPanel(
    props: ChildrenProps & {
        /**
         * Делегат, вызываемый при подтверждении.
         */
        readonly onConfirm: () => void;
        /**
         * Делегат, вызываемый при закрытии панели.
         */
        readonly onClose: () => void;
        /**
         * Делегат, вызываемый при сбросе значения фильтра.
         */
        readonly onReset: () => void;
        /**
         * Возвращает true, если значение фильтра валидно.
         */
        readonly isFilterValueValid: boolean;
        /**
         * Возвращает позицию панели фильтрации.
         */
        readonly panelPosition: FilterPanelPosition;
        /**
         * Имя поля.
         */
        readonly fieldName: string | undefined;
    },
) {
    const {onConfirm, onClose, children, onReset, isFilterValueValid, panelPosition, fieldName} = props;

    function onEnterClicked(event: React.KeyboardEvent) {
        if (event.key === 'Enter' && isFilterValueValid) {
            onConfirm();
        }
    }
    return (
        <>
            {hasValue(panelPosition.x) && hasValue(panelPosition.y) ? (
                <Popover
                    open={true}
                    onKeyDown={onEnterClicked}
                    onClose={onClose}
                    anchorReference={'anchorPosition'}
                    anchorPosition={{left: panelPosition.x, top: panelPosition.y}}>
                    <div className={classNames('filterPanelContainer', 'filterPanelTitle', 'filterPanelDialogContent')}>
                        <DialogTitle>{fieldName ? fieldName : 'Введите значение фильтра'}</DialogTitle>
                        <DialogContent>{children}</DialogContent>
                        <DialogActions>
                            <Button
                                onClick={onReset}
                                className={'separatedLeftButton'}>
                                Очистить
                            </Button>
                            <Button onClick={onClose}>Отмена</Button>
                            <Button
                                disabled={!isFilterValueValid}
                                onClick={onConfirm}>
                                Применить
                            </Button>
                        </DialogActions>
                    </div>
                </Popover>
            ) : null}
        </>
    );
}
