import React from 'react';
import {AuthProps, DefaultUnauthorized} from '../../authentication';

/**
 * Представляет защитника навигации, проверяющий наличие аутентифицированного пользователя.
 */
export function AuthGuard(props: {children: JSX.Element; authProps: AuthProps; unauthorizedPage?: JSX.Element}) {
    const {unauthorizedPage} = props;
    const auth = props.authProps;
    if (auth.authContext.user || auth.showSessionExpired) {
        return props.children;
    } else {
        return unauthorizedPage ? unauthorizedPage : <DefaultUnauthorized authProps={auth} />;
    }
}
