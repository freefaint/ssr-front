import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {ErrorPageAppProps} from './error-page-app-props';

/**
 * Представляет компонент кнопки "Вернуться на главную"
 */
export function ErrorPageReturnButton(props: ErrorPageAppProps) {
    const navigate = useNavigate();

    function OnReturnClick(): void {
        navigate(`/${props.rootPath}`, {
            replace: true,
        });
    }
    return (
        <Button
            variant="contained"
            onClick={OnReturnClick}>
            Вернуться на главный экран
        </Button>
    );
}
