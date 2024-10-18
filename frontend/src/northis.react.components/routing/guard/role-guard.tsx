import React from 'react';
import {AuthProps, Forbidden} from '../../authentication';

/**
 * Представляет модель отображения контента для ролей пользователя.
 */
interface RoleGuardChild {
    /**
     * Список ролей.
     */
    readonly rolesPredicate: (roles: readonly string[]) => boolean;
    /**
     * Контент.
     */
    readonly content: JSX.Element;
}

/**
 * Представляет защитника навигации, проверяющий наличие у пользователя доступных ролей. Поочерёдно проверяет соответствующего потомка, и либо возвращает первый подходящий, либо компонент Forbidden.
 */
function RoleGuard(props: {
    /**
     * Дочерние компоненты с ролями.
     */
    children: RoleGuardChild | readonly RoleGuardChild[];
    /**
     * Возвращает данные аутентификации.
     */
    readonly authProps: AuthProps;
    /**
     * Возвращает или устанавливает коллбэк для навигации.
     * @param path Путь навигации.
     */
    navigation: (path: string) => void;
    /**
     * Возвращает компонент запрещенной страницы.
     */
    readonly forbiddenPage?: JSX.Element;
}) {
    const {forbiddenPage, authProps, navigation} = props;
    const auth = authProps;
    let children = props.children;
    if (!Array.isArray(children)) {
        children = [children as RoleGuardChild];
    }

    for (const child of children) {
        if (hasRole(auth, child.rolesPredicate)) {
            return child.content;
        }
    }

    return forbiddenPage ? forbiddenPage : <Forbidden navigation={navigation} />;
}

/**
 * Возвращает true, если пользователь имеет данную роль.
 * @param auth Данные аутентификации.
 * @param role Роль пользователя.
 */
export function hasRole(auth: AuthProps, role: (roles: readonly string[]) => boolean): boolean {
    // Библиотечный класс UserManager в Profile не содержит свойства role. Но роли находятся именно там...
    const userRoles = auth.authContext.user?.profile.role as readonly string[] | undefined;
    if (userRoles === undefined) {
        return false;
    } else {
        return role(userRoles);
    }
}

export default RoleGuard;
