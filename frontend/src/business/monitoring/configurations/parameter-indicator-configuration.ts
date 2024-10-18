import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationTrendModel} from './models/configuration-trend-model';

/**
 * Представляет конфигурацию для элемента "Параметр-значение".
 */
export class ParameterIndicatorConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 5;
    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param shiftBucketsTrend Тренд количества ковшей за смену.
     * @param wagonsTrend Тренд количества вагонов.
     * @param avgWeightTrend Тренд среднего веса.
     * @param weightTrend Тренд веса.
     * @param firstHoursTrend Тренд количества тонн за 08:00-10:00.
     * @param secondHoursTrend Тренд количества тонн за 10:00-12:00.
     * @param thirdHoursTrend Тренд количества тонн за 12:00-14:00.
     * @param fourthHoursTrend Тренд количества тонн за 14:00-16:00.
     * @param fifthHoursTrend Тренд количества тонн за 16:00-18:00.
     * @param sixthHoursTrend Тренд количества тонн за 18:00-20:00.
     * @param firstNightHoursTrend Тренд количества тонн за 20:00-22:00.
     * @param secondNightHoursTrend Тренд количества тонн за 22:00-0:00.
     * @param thirdNightHoursTrend Тренд количества тонн за 0:00-02:00.
     * @param fourthNightHoursTrend Тренд количества тонн за 02:00-04:00.
     * @param fifthNightHoursTrend Тренд количества тонн за 04:00-06:00.
     * @param sixthNightHoursTrend Тренд количества тонн за 06:00-08:00.
     */
    constructor(
        elementId: string,
        displayName: string,
        readonly shiftBucketsTrend?: ConfigurationTrendModel,
        readonly wagonsTrend?: ConfigurationTrendModel,
        readonly avgWeightTrend?: ConfigurationTrendModel,
        readonly weightTrend?: ConfigurationTrendModel,
        readonly firstHoursTrend?: ConfigurationTrendModel,
        readonly secondHoursTrend?: ConfigurationTrendModel,
        readonly thirdHoursTrend?: ConfigurationTrendModel,
        readonly fourthHoursTrend?: ConfigurationTrendModel,
        readonly fifthHoursTrend?: ConfigurationTrendModel,
        readonly sixthHoursTrend?: ConfigurationTrendModel,
        readonly firstNightHoursTrend?: ConfigurationTrendModel,
        readonly secondNightHoursTrend?: ConfigurationTrendModel,
        readonly thirdNightHoursTrend?: ConfigurationTrendModel,
        readonly fourthNightHoursTrend?: ConfigurationTrendModel,
        readonly fifthNightHoursTrend?: ConfigurationTrendModel,
        readonly sixthNightHoursTrend?: ConfigurationTrendModel,
    ) {
        super(ParameterIndicatorConfiguration.lastVersion, elementId, ElementTypes.ParameterIndicator, displayName);
    }
}
