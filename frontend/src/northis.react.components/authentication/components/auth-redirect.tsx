import {useEffect} from 'react';
import {useAuthentication} from '../use-authentication';

/**
 * Представляет компонент, перенаправляющий пользователя на страницу аутентификации.
 */
export function AuthRedirect() {
    const auth = useAuthentication();

    useEffect(() => {
        auth.login()?.then();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <></>;
}
