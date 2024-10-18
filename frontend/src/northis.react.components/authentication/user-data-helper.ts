import {EMPTY_ARRAY} from 'northis.typescript.utils';
import {User} from 'oidc-client-ts';
import {getEnvironmentSettings} from '../environment';

/**
 * Возвращает данные пользователя либо null, если пользователь не авторизован.
 */
export function getUser(): User | null {
    const environment = getEnvironmentSettings();
    const oidcStorage = sessionStorage.getItem(`oidc.user:${environment.identity.issuer}:${environment.identity.clientId}`);
    if (!oidcStorage) {
        return null;
    }

    return User.fromStorageString(oidcStorage);
}

/**
 * Получает полное имя пользователя либо null, если пользователь не авторизован.
 */
export function getUserName(): string | null {
    return getUser()?.profile?.name ?? null;
}

/**
 * Получает имя пользователя либо null, если пользователь не авторизован.
 */
export function getUserGivenName(): string | null {
    return getUser()?.profile?.given_name ?? null;
}

/**
 * Получает фамилию пользователя либо null, если пользователь не авторизован.
 */
export function getUserFamilyName(): string | null {
    return getUser()?.profile?.family_name ?? null;
}

/**
 * Получает инициалы пользователя либо null, если пользователь не авторизован.
 */
export function getUserInitials(): string | null {
    return `${getUser()?.profile?.given_name?.charAt(0)}${getUser()?.profile?.family_name?.charAt(0)}`;
}

/**
 * Получает изображение профиля пользователя либо null, если пользователь не авторизован или у него нет изображения.
 */
export function getUserImage(): string | null {
    return getUser()?.profile?.picture ?? null;
}

/**
 * Получает идентификатор сессии либо null, если пользователь не авторизован.
 */
export function getSessionId(): string | null {
    return getUser()?.profile?.sid ?? null;
}

/**
 * Получает токен доступа либо null, если пользователь не авторизован.
 */
export function getAccessToken(): string | null {
    return getUser()?.access_token ?? null;
}

/**
 * Возвращает роли пользователя.
 */
export function getUserRoles(): readonly string[] {
    return (getUser()?.profile.role as readonly string[]) ?? EMPTY_ARRAY;
}

/**
 * Возвращает идентификатор пользователя.
 */
export function getUserId(): string | null {
    return getUser()?.profile.sub ?? null;
}
