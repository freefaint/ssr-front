import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationValueSetTrendModel} from './models/configuration-value-set-trend-model';

/**
 * Представляет конфигурацию для элемента "Воронка".
 */
export class FunnelConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 2;

    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param stateTrend Тренд состояния воронки.
     * @param inWork Значение тренда в работе.
     * @param inTurnedOff Значение тренда в выключенном состоянии.
     */
    constructor(
        elementId: string,
        displayName: string,
        readonly stateTrend?: ConfigurationValueSetTrendModel,
        readonly inWork?: number,
        readonly inTurnedOff?: number,
    ) {
        super(FunnelConfiguration.lastVersion, elementId, ElementTypes.Funnel, displayName);
    }
}
