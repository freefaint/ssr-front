import {Button} from '@mui/material';
import {useAuthentication} from 'northis.react.components';

/**
 * Представляет компонент кнопки "Вернуться на экран авторизации"
 */
export function ErrorPageToAuthorizationButton() {
    const authProps = useAuthentication();

    function onLogoutClick() {
        authProps.logout();
    }

    return (
        <Button
            variant={'contained'}
            onClick={onLogoutClick}>
            Вернуться на экран авторизации
        </Button>
    );
}
