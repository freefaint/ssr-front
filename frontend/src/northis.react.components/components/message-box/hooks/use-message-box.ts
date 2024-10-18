import {useDialog} from './use-dialog';
import {DialogStateControl} from '../models/dialog-state-control';

/**
 * Обрабатывает состояние открыт/закрыт для message box.
 * @return Объект с полями для управления состоянием message box.
 * @param onConfirm Делегат, вызываемый при подтверждении пользователем действия.
 * @param onDecline Делегат, вызываемый при отказе пользователя от действия.
 */
export function useMessageBox(onConfirm: () => void, onDecline?: () => void): DialogStateControl<void> {
    return useDialog<void>(onConfirm, onDecline);
}
