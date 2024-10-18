import React from 'react';
import DefaultErrorPage from './default-error-page/default-error-page';

/**
 * Представляет компонент страницы "Доступ запрещен".
 */
function Forbidden(props: {
    /**
     * Возвращает коллбэк навигации.
     * @param path Путь навигации.
     */
    readonly navigation?: (path: string) => void;
    /**
     * Возвращает пользовательский компонент отображения ошибки запроса.
     */
    readonly errorPage?: JSX.Element;
}) {
    const {errorPage, navigation} = props;
    return errorPage ? (
        errorPage
    ) : navigation ? (
        <DefaultErrorPage
            errorCode="403"
            text={{
                main: 'Доступ запрещен',
                second: 'Вы пытаетесь войти в раздел, к которому не имеете доступа. Обратитесь к администратору.',
            }}
            rootPath=""
            navigateFunction={navigation}
        />
    ) : (
        <></>
    );
}

export default Forbidden;
