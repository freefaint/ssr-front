import {Button} from '@mui/material';
import React from 'react';
import {AuthProps} from '../../hooks/auth.props';


/**
 * Представляет компонент страницы аутентификации по умолчанию.
 */
function DefaultUnauthorized(props: {
    /**
     * Возвращает данные аутентификации.
     */
    authProps: AuthProps;
}) {
    const auth = props.authProps;

    const login = (): void => {
        auth.login();
    };

    return (
        <div className="unauthorized-container">
            <h1>Ошибка 401 (Unauthorized)</h1>
            <h2>Необходимо выполнить вход для просмотра данной страницы</h2>
            <Button
                variant="contained"
                onClick={login}>
                Войти
            </Button>
        </div>
    );
}

export default DefaultUnauthorized;
