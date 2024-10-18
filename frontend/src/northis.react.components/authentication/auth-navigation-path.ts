/**
 * Представляет пути навигации для аутентификации.
 */
export const AUTH_NAVIGATION_PATH = {
    /**
     * Путь страницы завершения процедуры входа в систему.
     */
    signInOidc: 'signin-oidc',
    /**
     * Путь завершения процедуры выхода из системы.
     */
    signOutCallbackOidc: 'signout-callback-oidc',
} as const;
