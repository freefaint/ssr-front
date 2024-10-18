import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationTrendModel} from './models/configuration-trend-model';

/**
 * Представляет конфигурацию для элемента "Контент блока "Газопоршневая "".
 */
export class GasPistonPowerPlantTabConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 4;

    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param gasInstantCapacity Расход мгновенный для газа.
     * @param gasYesterdayCapacity Расход за вчера для газа.
     * @param gasLastHourCapacity Расход за предыдущий час для газа.
     * @param warmthInstantCapacity Мощность мгновенная для тепла.
     * @param warmthYesterdayCapacity Мощность за вчера для тепла.
     * @param warmthLastHourCapacity Мощность за предыдущий час для тепла.
     * @param electricityInstantCapacity Мощность мгновенная для электричества.
     * @param electricityYesterdayCapacity Мощность за вчера для электричества.
     * @param powerTotal Суммарная мощность.
     */
    constructor(
        elementId: string,
        displayName: string,
        readonly gasInstantCapacity?: ConfigurationTrendModel,
        readonly gasYesterdayCapacity?: ConfigurationTrendModel,
        readonly gasLastHourCapacity?: ConfigurationTrendModel,
        readonly warmthInstantCapacity?: ConfigurationTrendModel,
        readonly warmthYesterdayCapacity?: ConfigurationTrendModel,
        readonly warmthLastHourCapacity?: ConfigurationTrendModel,
        readonly electricityInstantCapacity?: ConfigurationTrendModel,
        readonly electricityYesterdayCapacity?: ConfigurationTrendModel,
        readonly powerTotal?: ConfigurationTrendModel,
    ) {
        super(GasPistonPowerPlantTabConfiguration.lastVersion, elementId, ElementTypes.GasPistonPowerPlantTab, displayName);
    }
}
