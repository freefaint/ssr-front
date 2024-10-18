import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationTrendModel} from './models/configuration-trend-model';

/**
 * Представляет элемент "Производительность ПЗК-2".
 */
export class Pzk2ProcessingRateCellConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 1;

    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param cementDispenser Дозатор цемента. Производительность кг/ч.
     * @param dispenser1 Дозатор 1. Производительность кг/ч.
     * @param dispenser2 Дозатор 2. Производительность кг/ч.
     * @param dispenser3 Дозатор 3. Производительность кг/ч.
     * @param waterDispenser Дозатор воды в смеситель, мгновенная производительность (м3/ч).
     * @param chemistryDispenser1 Дозатор химии 1 в смеситель, мгновенная производительность (м3/ч).
     * @param chemistryDispenser2 Дозатор химии 2 в смеситель, мгновенная производительность (м3/ч).
     */
    constructor(
        readonly elementId: string,
        readonly displayName: string,
        readonly cementDispenser?: ConfigurationTrendModel,
        readonly dispenser1?: ConfigurationTrendModel,
        readonly dispenser2?: ConfigurationTrendModel,
        readonly dispenser3?: ConfigurationTrendModel,
        readonly waterDispenser?: ConfigurationTrendModel,
        readonly chemistryDispenser1?: ConfigurationTrendModel,
        readonly chemistryDispenser2?: ConfigurationTrendModel,
    ) {
        super(Pzk2ProcessingRateCellConfiguration.lastVersion, elementId, ElementTypes.Pzk2ProcessingRateCell, displayName);
    }
}
