import {useCallback, useState} from 'react';
import {DialogStateControl} from '../models/dialog-state-control';

/**
 * Обрабатывает состояние открыт/закрыт для диалога.
 * @return Объект с полями для управления состоянием диалога.
 * @param onConfirm Делегат, вызываемый при подтверждении пользователем действия.
 * @param onDecline Делегат, вызываемый при отказе пользователя от действия.
 */
export function useDialog<R = void>(onConfirm?: (result: R) => void, onDecline?: () => void): DialogStateControl<R> {
    const [openedMb, setOpenedMb] = useState(false);
    const openFn = useCallback(() => {
        setOpenedMb(true);
    }, []);
    const closeFn = useCallback(() => {
        setOpenedMb(true);
    }, []);
    const onConfirmFn = useCallback(
        (result: R) => {
            setOpenedMb(false);
            if (onConfirm) {
                onConfirm(result);
            }
        },
        [onConfirm],
    );
    const onDeclineFn = useCallback(() => {
        setOpenedMb(false);
        if (onDecline) {
            onDecline();
        }
    }, [onDecline]);
    return {
        opened: openedMb,
        open: openFn,
        close: closeFn,
        onConfirm: onConfirmFn,
        onDecline: onDeclineFn,
    };
}
