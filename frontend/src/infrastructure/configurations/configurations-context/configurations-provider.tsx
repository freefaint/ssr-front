import {ChildrenProps, MessageBox, useMessageBox} from 'northis.react.components';
import {assertHasValue, EMPTY_ARRAY} from 'northis.typescript.utils';
import {useState} from 'react';
import {ElementConfigurationBase} from '../../../business/monitoring/configurations/element-configuration-base';
import {configurationsApi} from '../../../business/monitoring/configurations/services/configurations-api';
import {ConfigurationsContext} from './configurations-context';

/**
 * Представляет компонент глобального провайдера конфигураций.
 */
export function ConfigurationsProvider(props: ChildrenProps) {
    const [isConfigurationModeOn, setIsConfigurationModeOn] = useState(false);
    const [selectedConfiguration, setSelectedConfiguration] = useState<ElementConfigurationBase>();
    const [isConfigurationChanged, setIsConfigurationChanged] = useState(false);
    // Для выбора нового элемента по клику с подтверждением, так как декоратор сам выставляет себя выбранным.
    const [newlySelected, setNewlySelected] = useState<ElementConfigurationBase>();
    const {data, isFetching} = configurationsApi.useGetConfigurationsQuery();

    const confirmConfigurationModeChangeMessageBox = useMessageBox(() => {
        setSelectedConfiguration(undefined);
        setIsConfigurationChanged(false);
        setIsConfigurationModeOn(false);
    });

    const confirmChangeSelectedElementMessageBox = useMessageBox(
        () => {
            assertHasValue(newlySelected);
            setSelectedConfiguration(newlySelected);
            setIsConfigurationChanged(false);
            setNewlySelected(undefined);
        },
        () => setNewlySelected(undefined),
    );

    function setSelected(newSelected: ElementConfigurationBase) {
        if (isConfigurationChanged) {
            setNewlySelected(newSelected);
            confirmChangeSelectedElementMessageBox.open();
        } else {
            setSelectedConfiguration(newSelected);
            setNewlySelected(undefined);
        }
    }

    function trySetConfigurationMode(newValue: boolean) {
        if (!newValue) {
            if (isConfigurationChanged) {
                confirmConfigurationModeChangeMessageBox.open();
                return;
            }
        }
        setIsConfigurationModeOn(newValue);
        setSelectedConfiguration(undefined);
    }
    return (
        <ConfigurationsContext.Provider
            value={{
                configurations: data ?? EMPTY_ARRAY,
                isFetching: isFetching,
                setSelectedConfiguration: setSelectedConfiguration,
                currentSelectedId: selectedConfiguration?.elementId ?? null,
                isConfigurationModeOn: isConfigurationModeOn,
                isCurrentConfigurationChanged: isConfigurationChanged,
                setConfigurationState: setIsConfigurationChanged,
                setNewSelectedConfirm: setSelected,
                trySetNewConfigurationMode: trySetConfigurationMode,
                selectedConfiguration: selectedConfiguration,
            }}>
            {props.children}
            {confirmConfigurationModeChangeMessageBox.opened ? (
                <MessageBox
                    opened={confirmConfigurationModeChangeMessageBox.opened}
                    title="Подтверждение операции"
                    message={'Выключить режим конфигурирования? Не сохраненные изменения будут потеряны.'}
                    confirmAction={{action: confirmConfigurationModeChangeMessageBox.onConfirm, text: 'Выключить'}}
                    declineAction={{action: confirmConfigurationModeChangeMessageBox.onDecline, text: 'Отмена'}}
                />
            ) : null}
            {confirmChangeSelectedElementMessageBox.opened ? (
                <MessageBox
                    opened={confirmChangeSelectedElementMessageBox.opened}
                    title="Подтверждение операции"
                    message={'Изменить выбранный элемент? Не сохраненные изменения будут потеряны.'}
                    confirmAction={{action: confirmChangeSelectedElementMessageBox.onConfirm, text: 'Изменить'}}
                    declineAction={{action: confirmChangeSelectedElementMessageBox.onDecline, text: 'Отмена'}}
                />
            ) : null}
        </ConfigurationsContext.Provider>
    );
}
