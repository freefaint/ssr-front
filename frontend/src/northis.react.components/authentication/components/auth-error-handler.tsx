import {useEffect, useState} from 'react';
import {useAuthentication} from '../use-authentication';
import {SessionExpiredDialog} from './session-expired-dialog/session-expired-dialog';
import {BusyOverlayComponent, useMessageBox} from '../../components';
import {ChildrenProps} from '../../react/props/children-props';
import {SignInError} from './signin-error/sign-in-error';

/**
 * Представляет компонент обработки ошибки аутентификации.
 */
export function AuthErrorHandler(
    props: ChildrenProps & {
        /**
         * Возвращает элемент с ошибкой при обращении к сервису авторизации.
         */
        readonly signInErrorPage?: JSX.Element;
    },
) {
    const auth = useAuthentication();

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const hasUnpredictedError = auth.authContext.error && !isSilentRefreshError(auth.authContext.error);

    const sessionExpiredDialog = useMessageBox(async () => {
        await auth.logout();
    });

    useEffect(() => {
        return auth.authContext.events.addAccessTokenExpiring(() => {
            auth.authContext.signinSilent().then();
        });
    }, [auth.authContext, auth.authContext.events]);

    useEffect(() => {
        return auth.authContext.events.addAccessTokenExpired(() => {
            auth.endSessionAsync().then();
        });
    }, [auth.authContext, auth.authContext.events]);

    if (!auth.authContext.isLoading && !isLoaded) {
        setIsLoaded(true);
    }

    function isSilentRefreshError(error: Error): boolean {
        // Единственный способ отличить ошибку токена это проверка по описанию.
        return (error as any).error_description === 'Token is not active';
    }

    useEffect(() => {
        if (auth.showSessionExpired) {
            sessionExpiredDialog.open();
        }
    }, []);

    const errorPage = props.signInErrorPage ?? <SignInError />;

    return (
        <>
            {sessionExpiredDialog.opened ? <SessionExpiredDialog onAuthorizeClick={sessionExpiredDialog.onConfirm} /> : null}
            {isLoaded ? hasUnpredictedError ? errorPage : props.children : <BusyOverlayComponent isBusy={true} />}
        </>
    );
}
