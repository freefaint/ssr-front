import {EMPTY_ARRAY} from 'northis.typescript.utils';
import {createContext} from 'react';
import {ConfigurationsContextType} from './configurations-context-type';

/**
 * Представляет контекст для конфигурирования элементов.
 */
export const ConfigurationsContext = createContext<ConfigurationsContextType>({
    configurations: EMPTY_ARRAY,
    isFetching: false,
    setSelectedConfiguration: () => {},
    currentSelectedId: null,
    isConfigurationModeOn: false,
    isCurrentConfigurationChanged: false,
    setConfigurationState: () => {},
    setNewSelectedConfirm: () => {},
    selectedConfiguration: undefined,
    trySetNewConfigurationMode: () => {},
});
