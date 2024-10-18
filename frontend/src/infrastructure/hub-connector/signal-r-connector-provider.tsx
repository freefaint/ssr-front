import {HubConnectionState} from '@microsoft/signalr';
import {ChildrenProps, technicalErrorSnackbarMessage} from 'northis.react.components';
import {hasValue} from 'northis.typescript.utils';
import {SubscriptionMessage, UpstreamConnector} from 'northis.upstream.signalr';
import {useContext, useEffect, useState} from 'react';
import {getConfigurationTelegramIds, getConfigurationTrendIds} from '../../business/monitoring/configurations/configuration-utils';
import environment from '../../enviroment/environment';
import {ConfigurationsContext} from '../configurations/configurations-context/configurations-context';
// import {loggerInstance} from '../logger-instance';
// import {SnackbarUtils} from '../snackbar/snackbar-utils';

export const CONNECTOR = UpstreamConnector(`${environment.connectionString}GatewayHub`, (err: any) => {
    const errorMessage = 'Ошибка при попытке соединения с SignalR';
    // loggerInstance.error(errorMessage, err);
    // SnackbarUtils.show(technicalErrorSnackbarMessage(errorMessage));
    console.log(123);
});

/**
 * Представляет компонент провайдера соединения с SignalR для получения данных в реальном времени.
 * Важно: должен располагаться внутри провайдера конфигураций, для того чтобы получить из него тренды и телеграммы.
 */
export function SignalRConnectorProvider(props: ChildrenProps) {
    const {configurations} = useContext(ConfigurationsContext);
    const [currentState, setCurrentState] = useState(CONNECTOR.getState());

    CONNECTOR.onClose(() => {
        setCurrentState(CONNECTOR.getState());
    });
    CONNECTOR.onReconnecting(() => {
        setCurrentState(CONNECTOR.getState());
    });
    CONNECTOR.onReconnected(() => {
        setCurrentState(CONNECTOR.getState());
    });

    useEffect(() => {
        if (hasValue(configurations) && CONNECTOR.getState() === HubConnectionState.Connected) {
            const trendIds = getConfigurationTrendIds(configurations);
            const telegramIds = getConfigurationTelegramIds(configurations);
            // Когда меняются конфигурации - переподписываемся на события.
            CONNECTOR.unsubscribeFromAllAsync().then(() => CONNECTOR.subscribeAsync(new SubscriptionMessage(trendIds, telegramIds)).then());
        }
    }, [configurations, currentState]);

    useEffect(() => {
        connect();
    }, [currentState]);

    function connect() {
        if (CONNECTOR.getState() === HubConnectionState.Disconnected) {
            CONNECTOR.startAsync().then(() => {
                setCurrentState(CONNECTOR.getState());
            });
        }
    }

    return <>{props.children}</>;
}
