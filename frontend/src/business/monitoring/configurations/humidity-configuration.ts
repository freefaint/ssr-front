import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationTrendModel} from './models/configuration-trend-model';

/**
 * Представляет элемент "Влажность".
 */
export class HumidityConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 2;

    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param workTrend Тренд показателя влажности.
     */
    constructor(elementId: string, displayName: string, readonly workTrend?: ConfigurationTrendModel) {
        super(HumidityConfiguration.lastVersion, elementId, ElementTypes.Humidity, displayName);
    }
}
