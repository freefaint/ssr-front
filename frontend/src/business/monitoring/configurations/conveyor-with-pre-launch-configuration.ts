import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationValueSetTrendModel} from './models/configuration-value-set-trend-model';

/**
 * Представляет конфигурацию для элемента "Конвейер" с состоянием "Предпусковая сигнализация".
 */
export class ConveyorWithPreLaunchConfiguration extends ElementConfigurationBase {
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
     */
    constructor(
        elementId: string,
        displayName: string,
        readonly workTrend?: ConfigurationValueSetTrendModel,
        readonly inWork?: number,
        readonly inDowntime?: number,
        readonly inPreLaunch?: number,
    ) {
        super(ConveyorWithPreLaunchConfiguration.lastVersion, elementId, ElementTypes.ConveyorWithPreLaunch, displayName);
    }
}
