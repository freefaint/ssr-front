import {Button, Dialog, DialogActions, DialogContent, useTheme} from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import classNames from 'classnames';
import {ReactElement} from 'react';


/**
 * Отображает сообщение с возможностью подтвердить или отменить действие.
 */
export function MessageBox(props: {
    /**
     * Возвращает иконку в заголовке окна сообщения.
     */
    readonly icon?: ReactElement;
    /**
     * Возвращает истину, если окно сообщения открыто.
     */
    readonly opened: boolean;
    /**
     * Возвращает заголовок.
     */
    readonly title: string;
    /**
     * Возвращает сообщение.
     */
    readonly message: string;
    /**
     * Возвращает текст, вариант и действие кнопки подтверждения.
     */
    readonly confirmAction: MessageBoxButton;
    /**
     * Возвращает текст, вариант и действие кнопки отмены.
     */
    readonly declineAction: MessageBoxButton;
}) {
    const {confirmAction, declineAction, icon, message, opened, title} = props;

    const theme = useTheme();
    if (!confirmAction.variant) {
        confirmAction.variant = theme.northis.messageBox.confirmButton.variant;
    }
    if (!confirmAction.text) {
        confirmAction.text = theme.northis.messageBox.confirmButton.text;
    }
    if (!declineAction.variant) {
        declineAction.variant = theme.northis.messageBox.declineButton.variant;
    }
    if (!declineAction.text) {
        declineAction.text = theme.northis.messageBox.declineButton.text;
    }

    return (
        <Dialog
            open={opened}
            onClose={declineAction.action}
            maxWidth={false}
            className={'messageBoxDialog'}>
            <DialogTitle>
                {icon}
                <span>{title}</span>
            </DialogTitle>

            <DialogContent>
                <DialogContentText className={'messageBoxDialogContentText'}>{message}</DialogContentText>
            </DialogContent>

            <DialogActions
                disableSpacing={true}
                className={classNames({
                    ['messageBoxDialogActions']: declineAction.action,
                    ['messageBoxDialogSingleButtonActions']: !declineAction.action,
                })}>
                {declineAction.action ? (
                    <Button
                        variant={declineAction.variant as any}
                        onClick={declineAction.action}>
                        {declineAction.text}
                    </Button>
                ) : null}
                <Button
                    variant={confirmAction.variant as any}
                    onClick={confirmAction.action}>
                    {confirmAction.text}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

/**
 * Представляет описание кнопки окна сообщений.
 */
export interface MessageBoxButton {
    /**
     * Возвращает обработчик нажатия на кнопку.
     */
    action: () => void;
    /**
     * Возвращает текст для кнопки.
     */
    text?: string;
    /**
     * Возвращает вариант кнопки.
     */
    variant?: string;
}
