import {Button} from '@mui/material';
import {useAuthentication} from '../../use-authentication';

/**
 * Представляет компонент страницы ошибки входа в систему.
 */
export function SignInError() {
    const auth = useAuthentication();

    const logout = async (): Promise<void> => {
        await auth.logout();
    };

    return (
        <div>
            <h1>Ошибка входа в систему.</h1>
            <h2>Произошла ошибка при входе в систему. Обратитесь к администратору.</h2>
            <Button
                variant="contained"
                onClick={logout}>
                На страницу авторизации
            </Button>
        </div>
    );
}
