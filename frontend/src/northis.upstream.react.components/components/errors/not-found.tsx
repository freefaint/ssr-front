import classNames from 'classnames';
import {ErrorPage} from './error-page/error-page';
import {ErrorPageAppProps} from './error-page/error-page-app-props';
// @ts-ignore

import {ErrorPageReturnButton} from './error-page/error-page-return-button';

/**
 * Представляет компонент страницы с ошибкой 404.
 */
export function NotFound(props: ErrorPageAppProps) {
    return (
        <ErrorPage
            {...props}
            errorCode="404"
            button={<ErrorPageReturnButton {...props} />}
            header="СТРАНИЦА НЕ НАЙДЕНА">
            <div>
                <span>Ресурс недоступен по указанному адресу</span>
            </div>
        </ErrorPage>
    );
}
