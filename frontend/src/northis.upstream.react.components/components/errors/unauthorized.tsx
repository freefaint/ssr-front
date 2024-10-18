import classNames from 'classnames';
import {ErrorPage} from './error-page/error-page';
import {ErrorPageAppProps} from './error-page/error-page-app-props';
// @ts-ignore

import {ErrorPageReturnButton} from './error-page/error-page-return-button';

/**
 * Представляет компонент страницы с ошибкой 401.
 */
export function Unauthorized(props: ErrorPageAppProps) {
    return (
        <ErrorPage
            {...props}
            errorCode="401"
            button={<ErrorPageReturnButton {...props} />}
            header="У ВАС НЕТ РАЗРЕШЕНИЯ НА ДОСТУП">
            <div>
                <span>Вы пытаетесь получить доступ к защищенной информации</span>
            </div>
        </ErrorPage>
    );
}
