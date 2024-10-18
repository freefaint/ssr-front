import {Button, DialogActions, Popover} from '@mui/material';
import {ChildrenProps, useDialog} from 'northis.react.components';
import {useRef} from 'react';
// @ts-ignore
import {ReactComponent as FilterIcon} from '../../assets/svg/filter_ic.svg';

import {useUpdatableSize} from '../../react/hooks/use-updatable-size';

/**
 * Представляет компонент фильтрации, размещаемый отдельно от фильтруемых данных.
 */
function SeparatedFilter(
    props: ChildrenProps & {
        /**
         * Возвращает делегат обработки применения введенных значений.
         */
        readonly onConfirm: () => void;
        /**
         * Возвращает делегат обработки очистки введенных значений.
         */
        readonly onClear?: () => void;
        /**
         * Возвращает истину, если требуется отключить кнопки очистки.
         */
        readonly disableClear?: boolean;
        /**
         * Возвращает истину, если требуется отключить кнопку применения.
         */
        readonly disableConfirm?: boolean;
        /**
         * Возвращает элемент, по которому определяется положение и ширина всплывающего диалога фильтрации.
         */
        readonly anchorRefOverride?: HTMLElement | null;
    },
) {
    const {children, onConfirm, onClear, disableConfirm, disableClear, anchorRefOverride} = props;
    const defaultAnchorRef = useRef<HTMLButtonElement>(null);
    const anchorElement = anchorRefOverride ?? defaultAnchorRef.current;
    const size = useUpdatableSize(anchorElement);

    const dialog = useDialog(() => {
        onConfirm();
    });
    function onEnterClicked(event: React.KeyboardEvent) {
        if (event.key === 'Enter' && !disableConfirm) {
            dialog.onConfirm();
        }
    }
    return (
        <>
            <Button
                ref={defaultAnchorRef}
                onClick={dialog.open}
                variant={'outlined'}
                autoCapitalize={'characters'}
                startIcon={<FilterIcon />}>
                Добавить фильтр
            </Button>
            <Popover
                PaperProps={{
                    // Размер не высчитывается ровно, поэтому добавляется дополнительная ширина.
                    style: {width: `${size.width}px`},
                }}
                className={'dialogPopover'}
                open={dialog.opened}
                anchorEl={anchorElement}
                onClose={dialog.onDecline}
                onKeyUp={onEnterClicked}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}>
                {children}
                <DialogActions>
                    {onClear ? (
                        <Button
                            disabled={disableClear}
                            className={'separatedLeftButton'}
                            variant="text"
                            onClick={onClear}>
                            Очистить
                        </Button>
                    ) : null}
                    <Button
                        variant="text"
                        onClick={dialog.onDecline}>
                        Отмена
                    </Button>
                    <Button
                        disabled={disableConfirm}
                        variant="text"
                        onClick={() => {
                            dialog.onConfirm(undefined);
                        }}>
                        Применить
                    </Button>
                </DialogActions>
            </Popover>
        </>
    );
}

export default SeparatedFilter;
