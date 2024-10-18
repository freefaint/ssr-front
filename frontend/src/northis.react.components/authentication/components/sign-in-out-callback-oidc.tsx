import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuthentication} from '../use-authentication';
import {BusyOverlayComponent} from '../../components';

/**
 * Представляет компонент завершения процедуры входа/выхода в систему.
 */
export function SignInOutCallbackOidc(props: {
    /**
     * Возвращает путь главной страницы.
     */
    readonly rootPath: string;
}) {
    const {rootPath} = props;
    const navigate = useNavigate();
    const auth = useAuthentication();

    useEffect(() => {
        navigate(`${auth.actionInitState ?? rootPath}`);
        auth.clearActionInitState();
    }, [auth, navigate]);

    return <BusyOverlayComponent isBusy={true} />;
}
