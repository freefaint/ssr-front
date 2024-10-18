import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationValueSetTrendModel} from './models/configuration-value-set-trend-model';

/**
 * Представляет конфигурацию для элемента "Грохот".
 */
export class VibraScreenConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 2;

    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param workTrend Тренд для работы.
     * @param inWork Значение "В работе".
     * @param inDowntime Значение "В простое".
     */
    constructor(
        elementId: string,
        displayName: string,
        readonly workTrend?: ConfigurationValueSetTrendModel,
        readonly inWork?: number,
        readonly inDowntime?: number,
    ) {
        super(VibraScreenConfiguration.lastVersion, elementId, ElementTypes.VibraScreen, displayName);
    }
}
