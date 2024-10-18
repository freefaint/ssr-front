import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationTrendModel} from './models/configuration-trend-model';

/**
 * Представляет конфигурацию для элемента "Баланс Импорт/Генерация".
 */
export class PowerBalanceConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 2;
    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param importTrends Тренды импорта мощности.
     * @param gpaOneGenerationTrend Тренд генерации из ГПА-1.
     * @param gpaTwoGenerationTrend Тренд генерации из ГПА-2.
     */
    constructor(
        elementId: string,
        displayName: string,
        readonly importTrends?: readonly ConfigurationTrendModel[],
        readonly gpaOneGenerationTrend?: ConfigurationTrendModel,
        readonly gpaTwoGenerationTrend?: ConfigurationTrendModel,
    ) {
        super(PowerBalanceConfiguration.lastVersion, elementId, ElementTypes.PowerBalance, displayName);
    }
}
