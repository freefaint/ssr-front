import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationTrendModel} from './models/configuration-trend-model';

/**
 * Представляет элемент "Ячейка" со счетчиком, получающим данные по тренду.
 */
export class CounterCellWithTrendConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 1;

    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param trend Тренд для счетчика.
     */
    constructor(readonly elementId: string, readonly displayName: string, readonly trend?: ConfigurationTrendModel) {
        super(CounterCellWithTrendConfiguration.lastVersion, elementId, ElementTypes.CounterCellWithTrend, displayName);
    }
}
