import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationValueSetTrendModel} from './models/configuration-value-set-trend-model';

/**
 * Представляет конфигурацию для элемента "Бункер погрузочный".
 */
export class LoadingBunkerConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 2;

    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param upperLevelWorkTrend Тренд для показателя вкл/выкл верхнего уровня.
     * @param upperLevelWorking Значение "Работает" для верхнего уровня.
     * @param upperLevelTurnedOff Значение "Выключен" для верхнего уровня.
     * @param lowerLevelWorkTrend Тренд для показателя вкл/выкл нижнего уровня.
     * @param lowerLevelWorking Значение "Работает" для нижнего уровня.
     * @param lowerLevelTurnedOff Значение "Выключен" для нижнего уровня.
     */
    constructor(
        elementId: string,
        displayName: string,
        readonly upperLevelWorkTrend?: ConfigurationValueSetTrendModel,
        readonly upperLevelWorking?: number,
        readonly upperLevelTurnedOff?: number,
        readonly lowerLevelWorkTrend?: ConfigurationValueSetTrendModel,
        readonly lowerLevelWorking?: number,
        readonly lowerLevelTurnedOff?: number,
    ) {
        super(LoadingBunkerConfiguration.lastVersion, elementId, ElementTypes.LoadingBunker, displayName);
    }
}
