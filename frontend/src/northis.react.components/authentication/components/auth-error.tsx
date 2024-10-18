import React from 'react';
import DefaultErrorPage from './default-error-page/default-error-page';

/**
 * Представляет компонент ошибки аутентификации.
 */
function AuthError(props: {
    /**
     * Возвращает коллбэк навигации страницы ошибки аутентификации.
     * @param path Путь навигации.
     */
    navigationError: (path: string) => void;
    /**
     * Возвращает польовательский компонент страницы ошибки актентификации.
     */
    errorPage?: JSX.Element;
}) {
    const {errorPage} = props;

    return errorPage ? (
        errorPage
    ) : (
        <DefaultErrorPage
            text={{
                main: 'Ошибка входа',
                second: 'Произошла ошибка при попытке входа в систему. Обратитесь к администратору.',
            }}
            rootPath=""
            navigateFunction={props.navigationError}
        />
    );
}

export default AuthError;
