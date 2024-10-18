import {hasValue} from 'northis.typescript.utils';
import {useAuth} from 'react-oidc-context';
import {AuthProps} from './hooks/auth.props';

export const showExpiredDialogKey = 'expired';

/**
 * Представляет hook аутентификации.
 */
export function useAuthentication(): AuthProps {
    const auth = useAuth();
    /**
     * Ключ сохраненного состояния в session storage.
     */
    const initLocationKey = 'initLocation';

    /**
     * Сохраненное состояние в session storage.
     */
    const actionInitState: string | undefined = window.sessionStorage.getItem(initLocationKey) ?? undefined;

    /**
     * Сохраняет текущий путь в session storage.
     */
    function saveInitLocation(): void {
        window.sessionStorage.setItem(initLocationKey, `${window.location.pathname}${window.location.search}`);
    }

    /**
     * Запускает процесс входа в систему.
     */
    const login = (): Promise<void> => {
        saveInitLocation();
        return auth.signinRedirect();
    };

    /**
     * Запускает процесс выхода из системы.
     */
    const logout = async (): Promise<void> => {
        saveInitLocation();
        await auth.removeUser();
        localStorage.removeItem(showExpiredDialogKey);
        return auth.signoutRedirect();
    };

    /**
     * Очищает сохраненный в session storage путь.
     */
    const clearActionInitState = (): void => {
        sessionStorage.removeItem(initLocationKey);
    };

    /**
     * Завершает сессию пользователя.
     */
    async function endSessionAsync(): Promise<void> {
        localStorage.setItem(showExpiredDialogKey, 'true');
        await auth.signoutRedirect();
    }

    const expired = hasValue(localStorage.getItem(showExpiredDialogKey));

    return {
        login,
        logout,
        actionInitState,
        clearActionInitState,
        authContext: auth,
        endSessionAsync,
        showSessionExpired: expired,
    };
}
