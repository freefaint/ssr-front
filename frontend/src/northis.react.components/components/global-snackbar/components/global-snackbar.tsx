import {Alert, AlertColor, Button, IconButton, Snackbar, SnackbarCloseReason} from '@mui/material';
import React, {ReactElement, SyntheticEvent} from 'react';
import {SnackbarMessage} from '../models/snackbar-message';
import {SnackbarMessageType} from '../models/snackbar-message-type';



//TODO Вернуть реализацию снэкбара.
/**
 * Представляет глобальный снекбар.
 */
export function GlobalSnackbar(props: {
    /**
     * Возвращает отображаемое сообщение.
     */
    readonly message?: SnackbarMessage;
    /**
     * Возвращает коллбэк при закрытии сообщения.
     */
    readonly onAlertClose: () => void;
    /**
     * Возвращает коллбэк действия при нажатии на кнопку.
     */
    readonly onActionClick: () => void;
    /**
     * Возвращает коллбэк закрытия снэкбара.
     * @param event Событие закрытия снэкбара.
     * @param reason Причина закрытия снэкбара
     */
    readonly onSnackbarClose: (event: Event | SyntheticEvent, reason: SnackbarCloseReason) => void;
    /**
     * Возвращает компонент иконки закрытия снэкбара.
     */
    readonly closeIcon: ReactElement;
}) {
    const {message, onSnackbarClose, onAlertClose, onActionClick, closeIcon} = props;

    return message ? (
        <Snackbar
            className={'northisSnackbar'}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            key={message.messageId}
            open={true}
            autoHideDuration={message.duration}
            onClose={onSnackbarClose}>
            <Alert
                elevation={5}
                icon={false}
                severity={getSeverityFromMessageType(message.messageType)}
                variant="filled"
                action={
                    <>
                        {message.action ? (
                            <Button
                                variant={'text'}
                                className={'northisActionButton'}
                                onClick={onActionClick}>
                                {message.action.text}
                            </Button>
                        ) : null}
                        <IconButton
                            onClick={onAlertClose}
                            size={'large'}
                            className={'northisCloseButton'}>
                            {closeIcon}
                        </IconButton>
                    </>
                }
                onClose={onAlertClose}>
                {message.message}
            </Alert>
        </Snackbar>
    ) : null;
}

export default GlobalSnackbar;

function getSeverityFromMessageType(messageType: SnackbarMessageType): AlertColor {
    switch (messageType) {
        case SnackbarMessageType.SUCCESS:
            return 'success';
        case SnackbarMessageType.WARNING:
            return 'warning';
        case SnackbarMessageType.ERROR:
            return 'error';
        default:
            throw new Error(`Неизвестное значение перечисления ${messageType}`);
    }
}
