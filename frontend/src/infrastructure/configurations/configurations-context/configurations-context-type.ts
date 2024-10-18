import {ElementConfigurationBase} from '../../../business/monitoring/configurations/element-configuration-base';

/**
 * Представляет текущее значение контекста конфигурации.
 */
export interface ConfigurationsContextType {
    /**
     * Возвращает текущий набор конфигураций.
     */
    readonly configurations: readonly ElementConfigurationBase[];
    /**
     * Возвращает true если конфигурации в данный момент загружаются.
     */
    readonly isFetching: boolean;
    /**
     * Делегат выбора текущей конфигурации.
     */
    readonly setSelectedConfiguration: (configuration: ElementConfigurationBase | undefined) => void;
    /**
     * Возвращает идентификатор выбранного элемента.
     */
    readonly currentSelectedId: string | null;
    /**
     * Возвращает идентификатор выбранного элемента.
     */
    readonly selectedConfiguration?: ElementConfigurationBase;
    /**
     * Возвращает true если включен режим конфигурирования.
     */
    readonly isConfigurationModeOn: boolean;
    /**
     * Возвращает true, если текущая конфигурация была изменена.
     */
    readonly isCurrentConfigurationChanged: boolean;
    /**
     * Возвращает делегат установки состояния изменения текущей конфигурации.
     */
    readonly setConfigurationState: (newState: boolean) => void;
    /**
     * Возвращает делегат выбора новой конфигурации с подтверждением.
     */
    readonly setNewSelectedConfirm: (configuration: ElementConfigurationBase) => void;
    /**
     * Возвращает делегат попытки изменения состояния конфигурирования.
     * Если не было изменений конфигурации - то простое переключение, иначе с подтверждением.
     */
    readonly trySetNewConfigurationMode: (newValue: boolean) => void;
}
