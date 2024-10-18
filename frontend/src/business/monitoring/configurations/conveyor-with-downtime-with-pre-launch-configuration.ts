import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationDowntimeModel} from './models/configuration-downtime-model';
import {ConfigurationValueSetTrendModel} from './models/configuration-value-set-trend-model';

/**
 * Представляет элемент "Конвейер с простоем" с состоянием "Предпусковая сигнализация".
 */
export class ConveyorWithDowntimeWithPreLaunchConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 1;

    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param workTrend Тренд показателя работы.
     * @param inWork Значение "В работе".
     * @param inDowntime Значение "В простое".
     * @param inPreLaunch Значение "Предпусковая сигнализация".
     * @param downtime Простой.
     */
    constructor(
        elementId: string,
        displayName: string,
        readonly workTrend?: ConfigurationValueSetTrendModel,
        readonly inWork?: number,
        readonly inDowntime?: number,
        readonly inPreLaunch?: number,
        readonly downtime?: ConfigurationDowntimeModel,
    ) {
        super(
            ConveyorWithDowntimeWithPreLaunchConfiguration.lastVersion,
            elementId,
            ElementTypes.ConveyorWithDowntimeWithPreLaunch,
            displayName,
        );
    }
}
