import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationTrendModel} from './models/configuration-trend-model';

/**
 * Представляет конфигурацию для элемента "Бункер р/с".
 */
export class MineBunkerMixerConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 4;
    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param minLevel Минимальное значение индикатора уровня.
     * @param maxLevel Максимальное значение индикатора уровня.
     * @param weightTrend Тренд массы в бункере.
     * @param ladlesTrend Тренд количества загруженных ковшей.
     * @param wagonsTrend Тренд количества выгруженных вагонов.
     * @param ladlesWeightTrend Тренд массы загруженной из ковшей.
     * @param wagonsWeightTrend Тренд массы выгруженной в вагоны.
     * @param isInService Возвращает true, если бункер находится в эксплуатации, и false - если выведен из эксплуатации.
     */
    constructor(
        elementId: string,
        displayName: string,
        readonly minLevel?: number,
        readonly maxLevel?: number,
        readonly weightTrend?: ConfigurationTrendModel,
        readonly ladlesTrend?: ConfigurationTrendModel,
        readonly wagonsTrend?: ConfigurationTrendModel,
        readonly ladlesWeightTrend?: ConfigurationTrendModel,
        readonly wagonsWeightTrend?: ConfigurationTrendModel,
        readonly isInService?: boolean,
    ) {
        super(MineBunkerMixerConfiguration.lastVersion, elementId, ElementTypes.MineBunkerMixer, displayName);
    }
}
