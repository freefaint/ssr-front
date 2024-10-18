import {ErrorPage} from './error-page/error-page';
import {ErrorPageAppProps} from './error-page/error-page-app-props';
// @ts-ignore

import {ErrorPageToAuthorizationButton} from './error-page/error-page-to-authorization-button';

/**
 * Представляет компонент страницы с ошибкой 403.
 * Когда пользователь не имеет доступа ко всем приложению.
 * Отображается кнопка "На страницу авторизации".
 */
export function ForbiddenRoot(props: ErrorPageAppProps) {
    return (
        <ErrorPage
            {...props}
            errorCode="403"
            button={<ErrorPageToAuthorizationButton />}
            header="Доступ запрещён">
            <div>
                <span>У вас нет разрешения на доступ к этому ресурсу</span>
            </div>
        </ErrorPage>
    );
}
