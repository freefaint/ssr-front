import classNames from 'classnames';
import {ErrorPage} from './error-page/error-page';
import {ErrorPageAppProps} from './error-page/error-page-app-props';
// @ts-ignore

import {ErrorPageReturnButton} from './error-page/error-page-return-button';

/**
 * Представляет компонент страницы с ошибкой 503.
 */
export function Unavailable(props: ErrorPageAppProps) {
    return (
        <ErrorPage
            {...props}
            errorCode="503"
            button={<ErrorPageReturnButton {...props} />}
            header="Сервис временно недоступен">
            <div>
                <span>
                    В данный момент сервер не может обработать ваш запрос. Проводятся технические работы.
                </span>
            </div>
        </ErrorPage>
    );
}
