import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationValueSetTrendModel} from './models/configuration-value-set-trend-model';

/**
 * Представляет конфигурацию для элемента "Бункер погрузочный двойной".
 */
export class DoubleLoadingBunkerConfiguration extends ElementConfigurationBase {
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
     * @param lowerLevelWorkTrendForFirst Тренд для показателя вкл/выкл нижнего уровня первого бункера.
     * @param lowerLevelWorkTrendForSecond Тренд для показателя вкл/выкл нижнего уровня второго бункера.
     * @param lowerLevelWorkingForFirst Значение "Работает" для нижнего уровня первого бункера.
     * @param lowerLevelWorkingForSecond Значение "Работает" для нижнего уровня второго бункера.
     * @param lowerLevelTurnedOffForFirst  Значение "Выключен" для нижнего уровня первого бункера.
     * @param lowerLevelTurnedOffForSecond  Значение "Выключен" для нижнего уровня второго бункера.
     */
    constructor(
        elementId: string,
        displayName: string,
        readonly upperLevelWorkTrend?: ConfigurationValueSetTrendModel,
        readonly upperLevelWorking?: number,
        readonly upperLevelTurnedOff?: number,
        readonly lowerLevelWorkTrendForFirst?: ConfigurationValueSetTrendModel,
        readonly lowerLevelWorkTrendForSecond?: ConfigurationValueSetTrendModel,
        readonly lowerLevelWorkingForFirst?: number,
        readonly lowerLevelWorkingForSecond?: number,
        /**
         * Возвращает
         */
        readonly lowerLevelTurnedOffForFirst?: number,
        /**
         * Возвращает
         */
        readonly lowerLevelTurnedOffForSecond?: number,
    ) {
        super(DoubleLoadingBunkerConfiguration.lastVersion, elementId, ElementTypes.DoubleLoadingBunker, displayName);
    }
}
