import {hasValue, hasValueNotEmpty} from 'northis.typescript.utils';
import {BunkerConfiguration} from '../bunker-configuration';
import {BunkerLevelPercentConfiguration} from '../bunker-level-percent-configuration';
import {BunkerLevelWeightConfiguration} from '../bunker-level-weight-configuration';
import {ConveyorConfiguration} from '../conveyor-configuration';
import {ConveyorWithDowntimeConfiguration} from '../conveyor-with-downtime-configuration';
import {ConveyorWithDowntimeWithPreLaunchConfiguration} from '../conveyor-with-downtime-with-pre-launch-configuration';
import {ConveyorWithPreLaunchConfiguration} from '../conveyor-with-pre-launch-configuration';
import {ConveyorWithWorkBackwardConfiguration} from '../conveyor-with-work-backward-configuration';
import {ConveyorWithWorkBackwardWithSwitchingConfiguration} from '../conveyor-with-work-backward-with-switching-configuration';
import {CounterCellWithTrendConfiguration} from '../counter-cell-with-trend-configuration';
import {CounterCellsWithTrendsConfiguration} from '../counter-cells-with-trends-configuration';
import {DispenserConfiguration} from '../dispenser-configuration';
import {DoubleLoadingBunkerConfiguration} from '../double-loading-bunker-configuration';
import {DrumDryerConfiguration} from '../drum-dryer-configuration';
import {ElementConfigurationBase} from '../element-configuration-base';
import {ElementTypes} from '../elements/element-types/element-types';
import {FunnelConfiguration} from '../funnel-configuration';
import {GasPistonPowerPlantTabConfiguration} from '../gas-piston-power-plant-tab-configuration';
import {HumidityConfiguration} from '../humidity-configuration';
import {LoadingBunkerConfiguration} from '../loading-bunker-configuration';
import {MineBunkerConfiguration} from '../mine-bunker-configuration';
import {MineBunkerMixerConfiguration} from '../mine-bunker-mixer-configuration';
import {MobileConveyorsConfiguration} from '../mobile-conveyors-configuration';
import {OverloadBunkerConfiguration} from '../overload-bunker-configuration';
import {ParameterIndicatorConfiguration} from '../parameter-indicator-configuration';
import {PowerBalanceConfiguration} from '../power-balance-configuration';
import {PressureConfiguration} from '../pressure-configuration';
import {Pzk2ProcessingRateCellConfiguration} from '../pzk2-processing-rate-cell-configuration';
import {RailwayCarriageWeightConfiguration} from '../railway-carriage-weight-configuration';
import {VespConfiguration} from '../vesp-configuration';
import {VibraScreenConfiguration} from '../vibra-screen-configuration';

/**
 * Отражает статус модели.
 */
export enum VersionStatus {
    /**
     * Сохраненные данные устарели по отношению к текущей модели приложения, добавились новые поля.
     */
    ServiceDataIsObsoleteAndNotCompleted = 'ServiceDataIsObsoleteAndNotCompleted',
    /**
     * Сохраненные данные устарели по отношению к текущей модели приложения, все поля новой модели заполнены значениями из старой.
     */
    ServiceDataIsObsoleteAndCompatible = 'ServiceDataIsObsoleteAndCompatible',
    /**
     * Сохраненные данные имеют более новую версию по сравнению с текущей моделью приложения.
     */
    ClientIsOutdated = 'ClientIsOutdated',
    /**
     * Сохраненные данные имеют ту же версию, что и текущая модель приложения.
     */
    Valid = 'Valid',
}

/**
 * Возвращает статус версии конфигурации.
 */
export function getConfigurationVersionStatus(config: ElementConfigurationBase): VersionStatus {
    const currentVersion = getConfigurationLastVersionByType(config);
    if (!hasValue(config.version) || config.version < currentVersion) {
        return getFieldsStatus(config);
    } else if (config.version > currentVersion) {
        return VersionStatus.ClientIsOutdated;
    } else {
        return VersionStatus.Valid;
    }
}

function getConfigurationLastVersionByType(config: ElementConfigurationBase): number {
    switch (config.elementType) {
        case ElementTypes.Bunker:
            return BunkerConfiguration.lastVersion;
        case ElementTypes.BunkerWithLevelPercent:
            return BunkerLevelPercentConfiguration.lastVersion;
        case ElementTypes.BunkerWithLevelWeight:
            return BunkerLevelWeightConfiguration.lastVersion;
        case ElementTypes.Conveyor:
            return ConveyorConfiguration.lastVersion;
        case ElementTypes.ConveyorWithPreLaunch:
            return ConveyorWithPreLaunchConfiguration.lastVersion;
        case ElementTypes.ConveyorWithDowntime:
            return ConveyorWithDowntimeConfiguration.lastVersion;
        case ElementTypes.ConveyorWithDowntimeWithPreLaunch:
            return ConveyorWithDowntimeWithPreLaunchConfiguration.lastVersion;
        case ElementTypes.ConveyorWithWorkBackward:
            return ConveyorWithWorkBackwardConfiguration.lastVersion;
        case ElementTypes.ConveyorWithWorkBackwardWithSwitching:
            return ConveyorWithWorkBackwardWithSwitchingConfiguration.lastVersion;
        case ElementTypes.VibraScreen:
            return VibraScreenConfiguration.lastVersion;
        case ElementTypes.GasPistonPowerPlantTab:
            return GasPistonPowerPlantTabConfiguration.lastVersion;
        case ElementTypes.MineBunkerMixer:
            return MineBunkerMixerConfiguration.lastVersion;
        case ElementTypes.MineBunker:
            return MineBunkerConfiguration.lastVersion;
        case ElementTypes.MobileConveyors:
            return MobileConveyorsConfiguration.lastVersion;
        case ElementTypes.ParameterIndicator:
            return ParameterIndicatorConfiguration.lastVersion;
        case ElementTypes.Funnel:
            return FunnelConfiguration.lastVersion;
        case ElementTypes.Dispenser:
            return DispenserConfiguration.lastVersion;
        case ElementTypes.CounterCellsWithTrends:
            return CounterCellsWithTrendsConfiguration.lastVersion;
        case ElementTypes.Vesp:
            return VespConfiguration.lastVersion;
        case ElementTypes.Humidity:
            return HumidityConfiguration.lastVersion;
        case ElementTypes.DrumDryer:
            return DrumDryerConfiguration.lastVersion;
        case ElementTypes.LoadingBunker:
            return LoadingBunkerConfiguration.lastVersion;
        case ElementTypes.DoubleLoadingBunker:
            return DoubleLoadingBunkerConfiguration.lastVersion;
        case ElementTypes.RailwayCarriageWeight:
            return RailwayCarriageWeightConfiguration.lastVersion;
        case ElementTypes.OverloadBunker:
            return OverloadBunkerConfiguration.lastVersion;
        case ElementTypes.CounterCellWithTrend:
            return CounterCellWithTrendConfiguration.lastVersion;
        case ElementTypes.Pzk2ProcessingRateCell:
            return Pzk2ProcessingRateCellConfiguration.lastVersion;
        case ElementTypes.Pressure:
            return PressureConfiguration.lastVersion;
        case ElementTypes.PowerBalance:
            return PowerBalanceConfiguration.lastVersion;
    }
}

function getFieldsStatus(
    config: ElementConfigurationBase,
): VersionStatus.ServiceDataIsObsoleteAndNotCompleted | VersionStatus.ServiceDataIsObsoleteAndCompatible {
    const hasAllFields = Object.values(config).every((value) => hasValueNotEmpty(value));
    if (hasAllFields) {
        return VersionStatus.ServiceDataIsObsoleteAndCompatible;
    }
    return VersionStatus.ServiceDataIsObsoleteAndNotCompleted;
}
