import {ErrorPage} from './error-page/error-page';
import {ErrorPageAppProps} from './error-page/error-page-app-props';
// @ts-ignore

import {ErrorPageToAuthorizationButton} from './error-page/error-page-to-authorization-button';

/**
 * Представляет компонент страницы с ошибкой при обращении к сервису авторизации.
 * Отображается, когда ошибка возникает в процессе аутентификации так, что его невозможно завершить.
 * Отображается кнопка "На страницу авторизации".
 */
export function SignInError(props: ErrorPageAppProps) {
    return (
        <ErrorPage
            {...props}
            button={<ErrorPageToAuthorizationButton />}
            header="Ошибка входа в систему">
            <div>
                <span>Произошла ошибка при входе в систему. Обратитесь к администратору.</span>
            </div>
        </ErrorPage>
    );
}
