import {DialogActions, DialogContentText, DialogTitle, useTheme} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

/**
 * Представляет диалог истекшей сессии.
 */
export function SessionExpiredDialog(props: {
    /**
     * Возвращает или устанавливает делегат перехода на страницу авторизации.
     */
    readonly onAuthorizeClick: () => void;
}) {
    const {onAuthorizeClick} = props;
    const theme = useTheme();

    return (
        <Dialog
            open={true}
            className={'sessionExpiredDialog-root'}>
            <DialogTitle>Ваша сессия устарела</DialogTitle>
            <DialogContent>
                <DialogContentText>Для продолжения работы необходима авторизация</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onAuthorizeClick}
                    variant={theme.northis.messageBox.confirmButton.variant as any}>
                    Авторизоваться
                </Button>
            </DialogActions>
        </Dialog>
    );
}
