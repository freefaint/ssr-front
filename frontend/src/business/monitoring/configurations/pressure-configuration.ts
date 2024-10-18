import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationTrendModel} from './models/configuration-trend-model';

/**
 * Представляет элемент "Давление".
 */
export class PressureConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 1;

    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param pressureTrend Тренд для давления.
     */
    constructor(readonly elementId: string, readonly displayName: string, readonly pressureTrend?: ConfigurationTrendModel) {
        super(PressureConfiguration.lastVersion, elementId, ElementTypes.Pressure, displayName);
    }
}
