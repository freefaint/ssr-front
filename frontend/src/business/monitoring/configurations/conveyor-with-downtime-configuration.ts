import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationDowntimeModel} from './models/configuration-downtime-model';
import {ConfigurationValueSetTrendModel} from './models/configuration-value-set-trend-model';

/**
 * Представляет элемент "Конвейер с простоем".
 */
export class ConveyorWithDowntimeConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 2;

    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param workTrend Тренд показателя работы.
     * @param inWork Значение "В работе".
     * @param inDowntime Значение "В простое".
     * @param downtime Простой.
     */
    constructor(
        elementId: string,
        displayName: string,
        readonly workTrend?: ConfigurationValueSetTrendModel,
        readonly inWork?: number,
        readonly inDowntime?: number,
        readonly downtime?: ConfigurationDowntimeModel,
    ) {
        super(ConveyorWithDowntimeConfiguration.lastVersion, elementId, ElementTypes.ConveyorWithDowntime, displayName);
    }
}
