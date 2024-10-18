import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationTrendModel} from './models/configuration-trend-model';

/**
 * Представляет конфигурацию для элемента "Бункер с показателем уровня массы".
 */
export class BunkerLevelWeightConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 1;

    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param minLevel Минимальное значение индикатора уровня массы.
     * @param maxLevel Максимальное значение индикатора уровня массы.
     * @param weightTrend Тренд массы.
     */
    constructor(
        elementId: string,
        displayName: string,
        readonly minLevel?: number,
        readonly maxLevel?: number,
        readonly weightTrend?: ConfigurationTrendModel,
    ) {
        super(BunkerLevelWeightConfiguration.lastVersion, elementId, ElementTypes.BunkerWithLevelWeight, displayName);
    }
}
