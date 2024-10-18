import {AuthProvider, AuthProviderProps} from 'react-oidc-context';
import {AuthErrorHandler} from './auth-error-handler';
import {ChildrenProps} from '../../react/props/children-props';
import {getEnvironmentSettings} from '../../environment';

/**
 * Представляет компонент аутентификации.
 */
export function Authentication(
    props: ChildrenProps & {
        /**
         * Возвращает элемент с ошибкой при обращении к сервису авторизации.
         */
        readonly signInErrorPage?: JSX.Element;
    },
) {
    /**
     * Чистит url после завершения процесса аутентификации.
     */
    const signinCallback = (): Promise<void> | void => {
        window.history.replaceState({}, document.title, window.location.pathname);
    };

    const environment = getEnvironmentSettings();

    /**
     * Конфигурации для сервиса аутентификации.
     */
    const authProviderConfig: AuthProviderProps = {
        authority: environment.identity.issuer,
        client_id: environment.identity.clientId,
        client_secret: environment.identity.secret,
        redirect_uri: `${window.location.origin}`,
        post_logout_redirect_uri: `${window.location.origin}`,
        onSigninCallback: signinCallback,
    };

    return (
        <AuthProvider {...authProviderConfig}>
            <AuthErrorHandler signInErrorPage={props.signInErrorPage}>{props.children}</AuthErrorHandler>
        </AuthProvider>
    );
}
