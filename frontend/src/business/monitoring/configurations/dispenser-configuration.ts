import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationTrendModel} from './models/configuration-trend-model';

/**
 * Представляет конфигурацию для элемента "Дозатор".
 */
export class DispenserConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 1;

    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param estimateTrend  Тренд для плана дозатора.
     * @param productivityTrend Тренд для производительности дозатора.
     */
    constructor(
        elementId: string,
        displayName: string,
        readonly estimateTrend?: ConfigurationTrendModel,
        readonly productivityTrend?: ConfigurationTrendModel,
    ) {
        super(DispenserConfiguration.lastVersion, elementId, ElementTypes.Dispenser, displayName);
    }
}
