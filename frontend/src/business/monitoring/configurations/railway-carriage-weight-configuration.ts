import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationTrendModel} from './models/configuration-trend-model';

/**
 * Представляет конфигурацию для элемента "Вагон с показателем веса".
 */
export class RailwayCarriageWeightConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 4;

    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param firstAxleWeightTrend Тренд для показателя веса первой оси.
     * @param secondAxleWeightTrend Тренд для показателя веса второй оси.
     * @param emptyCarriageMinWeight Минимальный вес пустого вагона в тоннах.
     * @param emptyCarriageMaxWeight Максимальный вес пустого вагона в тоннах.
     * @param fullCarriageMaxWeight Максимальная грузоподъемность вагона в тоннах.
     */
    constructor(
        elementId: string,
        displayName: string,
        readonly firstAxleWeightTrend?: ConfigurationTrendModel,
        readonly secondAxleWeightTrend?: ConfigurationTrendModel,
        readonly emptyCarriageMinWeight?: number,
        readonly emptyCarriageMaxWeight?: number,
        readonly fullCarriageMaxWeight?: number,
    ) {
        super(RailwayCarriageWeightConfiguration.lastVersion, elementId, ElementTypes.RailwayCarriageWeight, displayName);
    }
}
