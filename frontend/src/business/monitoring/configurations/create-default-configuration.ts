import {EMPTY_ARRAY} from 'northis.typescript.utils';
import {BunkerConfiguration} from './bunker-configuration';
import {BunkerLevelPercentConfiguration} from './bunker-level-percent-configuration';
import {BunkerLevelWeightConfiguration} from './bunker-level-weight-configuration';
import {ConveyorConfiguration} from './conveyor-configuration';
import {ConveyorWithDowntimeConfiguration} from './conveyor-with-downtime-configuration';
import {ConveyorWithDowntimeWithPreLaunchConfiguration} from './conveyor-with-downtime-with-pre-launch-configuration';
import {ConveyorWithPreLaunchConfiguration} from './conveyor-with-pre-launch-configuration';
import {ConveyorWithWorkBackwardConfiguration} from './conveyor-with-work-backward-configuration';
import {ConveyorWithWorkBackwardWithSwitchingConfiguration} from './conveyor-with-work-backward-with-switching-configuration';
import {CounterCellWithTrendConfiguration} from './counter-cell-with-trend-configuration';
import {CounterCellsWithTrendsConfiguration} from './counter-cells-with-trends-configuration';
import {DispenserConfiguration} from './dispenser-configuration';
import {DoubleLoadingBunkerConfiguration} from './double-loading-bunker-configuration';
import {DrumDryerConfiguration} from './drum-dryer-configuration';
import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {FunnelConfiguration} from './funnel-configuration';
import {GasPistonPowerPlantTabConfiguration} from './gas-piston-power-plant-tab-configuration';
import {HumidityConfiguration} from './humidity-configuration';
import {LoadingBunkerConfiguration} from './loading-bunker-configuration';
import {MineBunkerConfiguration} from './mine-bunker-configuration';
import {MineBunkerMixerConfiguration} from './mine-bunker-mixer-configuration';
import {MobileConveyorsConfiguration} from './mobile-conveyors-configuration';
import {OverloadBunkerConfiguration} from './overload-bunker-configuration';
import {ParameterIndicatorConfiguration} from './parameter-indicator-configuration';
import {PowerBalanceConfiguration} from './power-balance-configuration';
import {PressureConfiguration} from './pressure-configuration';
import {Pzk2ProcessingRateCellConfiguration} from './pzk2-processing-rate-cell-configuration';
import {RailwayCarriageWeightConfiguration} from './railway-carriage-weight-configuration';
import {VespConfiguration} from './vesp-configuration';
import {VibraScreenConfiguration} from './vibra-screen-configuration';

/**
 * Создает конфигурацию по умолчанию для элемента.
 */
export function createDefaultConfiguration(
    /**
     * Тип элемента.
     */
    elementType: ElementTypes,
    /**
     * Идентификатор элемента.
     */
    elementId: string,
    /**
     * Имя элемента.
     */
    elementName: string,
): ElementConfigurationBase {
    switch (elementType) {
        case ElementTypes.Bunker:
            return new BunkerConfiguration(elementId, elementName);
        case ElementTypes.BunkerWithLevelPercent:
            return new BunkerLevelPercentConfiguration(elementId, elementName);
        case ElementTypes.BunkerWithLevelWeight:
            return new BunkerLevelWeightConfiguration(elementId, elementName);
        case ElementTypes.Conveyor:
            return new ConveyorConfiguration(elementId, elementName);
        case ElementTypes.ConveyorWithPreLaunch:
            return new ConveyorWithPreLaunchConfiguration(elementId, elementName);
        case ElementTypes.ConveyorWithDowntime:
            return new ConveyorWithDowntimeConfiguration(elementId, elementName);
        case ElementTypes.ConveyorWithDowntimeWithPreLaunch:
            return new ConveyorWithDowntimeWithPreLaunchConfiguration(elementId, elementName);
        case ElementTypes.ConveyorWithWorkBackward:
            return new ConveyorWithWorkBackwardConfiguration(elementId, elementName);
        case ElementTypes.ConveyorWithWorkBackwardWithSwitching:
            return new ConveyorWithWorkBackwardWithSwitchingConfiguration(elementId, elementName);
        case ElementTypes.VibraScreen:
            return new VibraScreenConfiguration(elementId, elementName);
        case ElementTypes.GasPistonPowerPlantTab:
            return new GasPistonPowerPlantTabConfiguration(elementId, elementName);
        case ElementTypes.MineBunkerMixer:
            return new MineBunkerMixerConfiguration(elementId, elementName);
        case ElementTypes.MineBunker:
            return new MineBunkerConfiguration(elementId, elementName);
        case ElementTypes.MobileConveyors:
            return new MobileConveyorsConfiguration(elementId, elementName);
        case ElementTypes.ParameterIndicator:
            return new ParameterIndicatorConfiguration(elementId, elementName);
        case ElementTypes.Funnel:
            return new FunnelConfiguration(elementId, elementName);
        case ElementTypes.Dispenser:
            return new DispenserConfiguration(elementId, elementName);
        case ElementTypes.CounterCellsWithTrends:
            return new CounterCellsWithTrendsConfiguration(elementId, elementName, EMPTY_ARRAY);
        case ElementTypes.Vesp:
            return new VespConfiguration(elementId, elementName);
        case ElementTypes.LoadingBunker:
            return new LoadingBunkerConfiguration(elementId, elementName);
        case ElementTypes.DoubleLoadingBunker:
            return new DoubleLoadingBunkerConfiguration(elementId, elementName);
        case ElementTypes.RailwayCarriageWeight:
            return new RailwayCarriageWeightConfiguration(elementId, elementName);
        case ElementTypes.Humidity:
            return new HumidityConfiguration(elementId, elementName);
        case ElementTypes.DrumDryer:
            return new DrumDryerConfiguration(elementId, elementName);
        case ElementTypes.OverloadBunker:
            return new OverloadBunkerConfiguration(elementId, elementName);
        case ElementTypes.CounterCellWithTrend:
            return new CounterCellWithTrendConfiguration(elementId, elementName);
        case ElementTypes.Pzk2ProcessingRateCell:
            return new Pzk2ProcessingRateCellConfiguration(elementId, elementName);
        case ElementTypes.Pressure:
            return new PressureConfiguration(elementId, elementName);
        case ElementTypes.PowerBalance:
            return new PowerBalanceConfiguration(elementId, elementName);
    }
}
