import {Button} from '@mui/material';
import {ChildrenProps} from 'northis.react.components';
import {useNavigate} from 'react-router-dom';
// @ts-ignore

import classNames from 'classnames';

import {ErrorPageAppProps} from './error-page-app-props';
import {ReactElement, ReactNode} from 'react';

/**
 * Представляет компонент отображения ошибки запроса по умолчанию.
 */
export function ErrorPage(
    props: ChildrenProps &
        ErrorPageAppProps & {
            /**
             * Возвращает код ошибки.
             */
            readonly errorCode?: string;
            /**
             * Возвращает заголовок ошибки.
             */
            readonly header?: string;
            /**
             * Возвращает кнопку.
             */
            readonly button: ReactElement;
        },
) {
    return (
        <div>
            <div></div>
            <div></div>
            <div>
                <div>
                    <div>
                        <span></span>
                        <span>ОШИБКА</span>
                    </div>
                    <div>
                        <span></span>
                        <div>{props.children}</div>
                    </div>
                    <div></div>
                    <div>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
