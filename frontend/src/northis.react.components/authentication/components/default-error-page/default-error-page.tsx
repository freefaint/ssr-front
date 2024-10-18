import {Button} from '@mui/material';
import React from 'react';
import {DefaultErrorPageProps} from './default-error-page.props';


/**
 * Представляет компонент отображения ошибки запроса по умолчанию.
 */
function DefaultErrorPage(
    props: DefaultErrorPageProps & {
        /**
         * Возвращает коллбэк навигации.
         * @param path
         */
        navigateFunction: (path: string) => void;
        /**
         * Возвращает путь к главной странице.
         */
        readonly rootPath: string;
    },
) {
    const navigate = props.navigateFunction;

    const navigateBack = (): void => {
        navigate('-1');
    };

    const navigateHome = (): void => {
        navigate(`/${props.rootPath}`);
    };

    return (
        <div className="default-error-page-container">
            <span className="error-code">{props.errorCode}</span>
            <span className="main-text">{props.text.main}</span>
            <span className="second-text">{props.text.second}</span>
            <div className="actions">
                <Button
                    variant="outlined"
                    onClick={navigateBack}>
                    Вернуться назад
                </Button>
                <Button
                    variant="outlined"
                    onClick={navigateHome}>
                    На главную
                </Button>
            </div>
        </div>
    );
}

export default DefaultErrorPage;
