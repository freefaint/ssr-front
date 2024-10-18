import classNames from 'classnames';
import {ErrorPage} from './error-page/error-page';
import {ErrorPageAppProps} from './error-page/error-page-app-props';
// @ts-ignore

import {ErrorPageReturnButton} from './error-page/error-page-return-button';

/**
 * Представляет компонент страницы с ошибкой 403.
 * Когда пользователь не имеет доступа к одному из разделов сайта, но имеет доступ к другим.
 * Отображается кнопка "Вернуться на главную".
 */
export function Forbidden(props: ErrorPageAppProps) {
    return (
        <ErrorPage
            {...props}
            errorCode="403"
            button={<ErrorPageReturnButton {...props} />}
            header="Доступ запрещен">
            <div>
                <span>
                    Вы пытаетесь войти в раздел, к которому не имеете доступа. Обратитесь к администратору.
                </span>
            </div>
        </ErrorPage>
    );
}
