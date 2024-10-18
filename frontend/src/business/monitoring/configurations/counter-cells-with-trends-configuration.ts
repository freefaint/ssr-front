import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationTrendModel} from './models/configuration-trend-model';

/**
 * Представляет элемент "Ячейки" со счетчиком, получающий данные по нескольким трендам.
 */
export class CounterCellsWithTrendsConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 3;

    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param trends Тренды счетчика.
     */
    constructor(elementId: string, displayName: string, readonly trends?: readonly ConfigurationTrendModel[]) {
        super(CounterCellsWithTrendsConfiguration.lastVersion, elementId, ElementTypes.CounterCellsWithTrends, displayName);
    }
}
