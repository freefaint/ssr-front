import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationTrendModel} from './models/configuration-trend-model';

/**
 * Представляет конфигурацию для элемента "Бункер".
 */
export class BunkerConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 2;

    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param minLevel Минимальное значение индикатора уровня.
     * @param maxLevel Максимальное значение индикатора уровня.
     * @param weightTrend Тренд массы в бункере.
     * @param levelTrend Тренд индикатора уровня.
     */
    constructor(
        elementId: string,
        displayName: string,
        readonly minLevel?: number,
        readonly maxLevel?: number,
        readonly levelTrend?: ConfigurationTrendModel,
        readonly weightTrend?: ConfigurationTrendModel,
    ) {
        super(BunkerConfiguration.lastVersion, elementId, ElementTypes.Bunker, displayName);
    }
}
