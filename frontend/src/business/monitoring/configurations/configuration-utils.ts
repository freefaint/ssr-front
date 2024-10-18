import { hasValue } from 'northis.typescript.utils';
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
import {DispenserConfiguration} from './dispenser-configuration';
import {DoubleLoadingBunkerConfiguration} from './double-loading-bunker-configuration';
import {DrumDryerConfiguration} from './drum-dryer-configuration';
import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {FunnelConfiguration} from './funnel-configuration';
import {GasPistonPowerPlantTabConfiguration} from './gas-piston-power-plant-tab-configuration';
import {LoadingBunkerConfiguration} from './loading-bunker-configuration';
import {MineBunkerConfiguration} from './mine-bunker-configuration';
import {MineBunkerMixerConfiguration} from './mine-bunker-mixer-configuration';
import {OverloadBunkerConfiguration} from './overload-bunker-configuration';
import {ParameterIndicatorConfiguration} from './parameter-indicator-configuration';
import {PowerBalanceConfiguration} from './power-balance-configuration';
import {PressureConfiguration} from './pressure-configuration';
import {Pzk2ProcessingRateCellConfiguration} from './pzk2-processing-rate-cell-configuration';
import {RailwayCarriageWeightConfiguration} from './railway-carriage-weight-configuration';
import {VespConfiguration} from './vesp-configuration';
import {VibraScreenConfiguration} from './vibra-screen-configuration';

/**
 * Возвращает идентификаторы трендов для набора конфигураций.
 */
export function getConfigurationTrendIds(configurations: readonly ElementConfigurationBase[]): string[] {
    const result: string[] = [];
    configurations.forEach((config) => {
        switch (config.elementType) {
            case ElementTypes.Bunker:
                const bunker = config as BunkerConfiguration;
                if (bunker.levelTrend) {
                    result.push(bunker.levelTrend.trendId);
                }
                if (bunker.weightTrend) {
                    result.push(bunker.weightTrend.trendId);
                }
                break;
            case ElementTypes.ConveyorWithDowntime:
                const conveyorWithDowntime = config as ConveyorWithDowntimeConfiguration;
                if (conveyorWithDowntime.workTrend) {
                    result.push(conveyorWithDowntime.workTrend.trendId);
                }
                break;
            case ElementTypes.ConveyorWithDowntimeWithPreLaunch:
                const conveyorWithDowntimeWithPreLaunch = config as ConveyorWithDowntimeWithPreLaunchConfiguration;
                if (conveyorWithDowntimeWithPreLaunch.workTrend) {
                    result.push(conveyorWithDowntimeWithPreLaunch.workTrend.trendId);
                }
                break;
            case ElementTypes.Conveyor:
                const conveyor = config as ConveyorConfiguration;
                if (conveyor.workTrend) {
                    result.push(conveyor.workTrend.trendId);
                }
                break;
            case ElementTypes.ConveyorWithPreLaunch:
                const conveyorWithPreLaunch = config as ConveyorWithPreLaunchConfiguration;
                if (conveyorWithPreLaunch.workTrend) {
                    result.push(conveyorWithPreLaunch.workTrend.trendId);
                }
                break;
            case ElementTypes.ConveyorWithWorkBackward:
                const conveyorWithWorkBackward = config as ConveyorWithWorkBackwardConfiguration;
                if (conveyorWithWorkBackward.workTrend) {
                    result.push(conveyorWithWorkBackward.workTrend.trendId);
                }
                break;
            case ElementTypes.ConveyorWithWorkBackwardWithSwitching:
                const conveyorWithWorkBackwardWithSwitching = config as ConveyorWithWorkBackwardWithSwitchingConfiguration;
                if (conveyorWithWorkBackwardWithSwitching.workTrend) {
                    result.push(conveyorWithWorkBackwardWithSwitching.workTrend.trendId);
                }
                break;
            case ElementTypes.VibraScreen:
                const vibra = config as VibraScreenConfiguration;
                if (vibra.workTrend) {
                    result.push(vibra.workTrend.trendId);
                }

                break;
            case ElementTypes.GasPistonPowerPlantTab:
                const tab = config as GasPistonPowerPlantTabConfiguration;
                if (hasValue(tab.gasInstantCapacity)) {
                    result.push(tab.gasInstantCapacity.trendId);
                }

                if (hasValue(tab.gasYesterdayCapacity)) {
                    result.push(tab.gasYesterdayCapacity.trendId);
                }

                if (hasValue(tab.gasLastHourCapacity)) {
                    result.push(tab.gasLastHourCapacity.trendId);
                }

                if (hasValue(tab.warmthInstantCapacity)) {
                    result.push(tab.warmthInstantCapacity.trendId);
                }

                if (hasValue(tab.warmthYesterdayCapacity)) {
                    result.push(tab.warmthYesterdayCapacity.trendId);
                }

                if (hasValue(tab.warmthLastHourCapacity)) {
                    result.push(tab.warmthLastHourCapacity.trendId);
                }

                if (hasValue(tab.electricityInstantCapacity)) {
                    result.push(tab.electricityInstantCapacity.trendId);
                }

                if (hasValue(tab.electricityYesterdayCapacity)) {
                    result.push(tab.electricityYesterdayCapacity.trendId);
                }

                if (hasValue(tab.powerTotal)) {
                    result.push(tab.powerTotal.trendId);
                }
                break;
            case ElementTypes.Funnel:
                const funnel = config as FunnelConfiguration;
                if (funnel.stateTrend) {
                    result.push(funnel.stateTrend.trendId);
                }
                break;
            case ElementTypes.ParameterIndicator:
                const parameter = config as ParameterIndicatorConfiguration;
                if (parameter.shiftBucketsTrend) {
                    result.push(parameter.shiftBucketsTrend.trendId);
                }
                if (parameter.wagonsTrend) {
                    result.push(parameter.wagonsTrend.trendId);
                }
                if (parameter.avgWeightTrend) {
                    result.push(parameter.avgWeightTrend.trendId);
                }
                if (parameter.weightTrend) {
                    result.push(parameter.weightTrend.trendId);
                }
                if (parameter.firstHoursTrend) {
                    result.push(parameter.firstHoursTrend.trendId);
                }
                if (parameter.secondHoursTrend) {
                    result.push(parameter.secondHoursTrend.trendId);
                }
                if (parameter.thirdHoursTrend) {
                    result.push(parameter.thirdHoursTrend.trendId);
                }
                if (parameter.fourthHoursTrend) {
                    result.push(parameter.fourthHoursTrend.trendId);
                }
                if (parameter.fifthHoursTrend) {
                    result.push(parameter.fifthHoursTrend.trendId);
                }
                if (parameter.sixthHoursTrend) {
                    result.push(parameter.sixthHoursTrend.trendId);
                }
                if (parameter.firstNightHoursTrend) {
                    result.push(parameter.firstNightHoursTrend.trendId);
                }
                if (parameter.secondNightHoursTrend) {
                    result.push(parameter.secondNightHoursTrend.trendId);
                }
                if (parameter.thirdNightHoursTrend) {
                    result.push(parameter.thirdNightHoursTrend.trendId);
                }
                if (parameter.fourthNightHoursTrend) {
                    result.push(parameter.fourthNightHoursTrend.trendId);
                }
                if (parameter.fifthNightHoursTrend) {
                    result.push(parameter.fifthNightHoursTrend.trendId);
                }
                if (parameter.sixthNightHoursTrend) {
                    result.push(parameter.sixthNightHoursTrend.trendId);
                }
                break;
            case ElementTypes.MineBunkerMixer:
                const mineBunkerMixer = config as MineBunkerMixerConfiguration;
                if (mineBunkerMixer.weightTrend) {
                    result.push(mineBunkerMixer.weightTrend.trendId);
                }
                if (mineBunkerMixer.ladlesTrend) {
                    result.push(mineBunkerMixer.ladlesTrend.trendId);
                }
                if (mineBunkerMixer.wagonsTrend) {
                    result.push(mineBunkerMixer.wagonsTrend.trendId);
                }
                if (mineBunkerMixer.ladlesWeightTrend) {
                    result.push(mineBunkerMixer.ladlesWeightTrend.trendId);
                }
                if (mineBunkerMixer.wagonsWeightTrend) {
                    result.push(mineBunkerMixer.wagonsWeightTrend.trendId);
                }
                break;
            case ElementTypes.MineBunker:
                const mineBunker = config as MineBunkerConfiguration;
                if (mineBunker.weightTrend) {
                    result.push(mineBunker.weightTrend.trendId);
                }
                break;
            case ElementTypes.Dispenser:
                const dispenser = config as DispenserConfiguration;
                if (dispenser.productivityTrend) {
                    result.push(dispenser.productivityTrend.trendId);
                }
                if (dispenser.estimateTrend) {
                    result.push(dispenser.estimateTrend.trendId);
                }
                break;
            case ElementTypes.RailwayCarriageWeight:
                const railwayCarriageWeightConfiguration = config as RailwayCarriageWeightConfiguration;
                if (railwayCarriageWeightConfiguration.firstAxleWeightTrend) {
                    result.push(railwayCarriageWeightConfiguration.firstAxleWeightTrend.trendId);
                }
                if (railwayCarriageWeightConfiguration.secondAxleWeightTrend) {
                    result.push(railwayCarriageWeightConfiguration.secondAxleWeightTrend.trendId);
                }
                break;
            case ElementTypes.LoadingBunker:
                const loadingBunkerConfiguration = config as LoadingBunkerConfiguration;
                if (loadingBunkerConfiguration.upperLevelWorkTrend) {
                    result.push(loadingBunkerConfiguration.upperLevelWorkTrend.trendId);
                }
                if (loadingBunkerConfiguration.lowerLevelWorkTrend) {
                    result.push(loadingBunkerConfiguration.lowerLevelWorkTrend.trendId);
                }
                break;
            case ElementTypes.DoubleLoadingBunker:
                const doubleLoadingBunkerConfiguration = config as DoubleLoadingBunkerConfiguration;
                if (doubleLoadingBunkerConfiguration.upperLevelWorkTrend) {
                    result.push(doubleLoadingBunkerConfiguration.upperLevelWorkTrend.trendId);
                }
                if (doubleLoadingBunkerConfiguration.lowerLevelWorkTrendForFirst) {
                    result.push(doubleLoadingBunkerConfiguration.lowerLevelWorkTrendForFirst.trendId);
                }
                if (doubleLoadingBunkerConfiguration.lowerLevelWorkTrendForSecond) {
                    result.push(doubleLoadingBunkerConfiguration.lowerLevelWorkTrendForSecond.trendId);
                }
                break;
            case ElementTypes.BunkerWithLevelPercent:
                const bunkerPercent = config as BunkerLevelPercentConfiguration;
                if (bunkerPercent.levelTrend) {
                    result.push(bunkerPercent.levelTrend.trendId);
                }
                break;
            case ElementTypes.BunkerWithLevelWeight:
                const bunkerWeight = config as BunkerLevelWeightConfiguration;
                if (bunkerWeight.weightTrend) {
                    result.push(bunkerWeight.weightTrend.trendId);
                }
                break;
            case ElementTypes.CounterCellWithTrend:
                const cellWithTrend = config as CounterCellWithTrendConfiguration;
                if (cellWithTrend.trend) {
                    result.push(cellWithTrend.trend.trendId);
                }
                break;
            case ElementTypes.Pzk2ProcessingRateCell:
                const pzk2ProcessingRateCell = config as Pzk2ProcessingRateCellConfiguration;
                if (pzk2ProcessingRateCell.cementDispenser) {
                    result.push(pzk2ProcessingRateCell.cementDispenser.trendId);
                }
                if (pzk2ProcessingRateCell.dispenser1) {
                    result.push(pzk2ProcessingRateCell.dispenser1.trendId);
                }
                if (pzk2ProcessingRateCell.dispenser2) {
                    result.push(pzk2ProcessingRateCell.dispenser2.trendId);
                }
                if (pzk2ProcessingRateCell.dispenser3) {
                    result.push(pzk2ProcessingRateCell.dispenser3.trendId);
                }
                if (pzk2ProcessingRateCell.waterDispenser) {
                    result.push(pzk2ProcessingRateCell.waterDispenser.trendId);
                }
                if (pzk2ProcessingRateCell.chemistryDispenser1) {
                    result.push(pzk2ProcessingRateCell.chemistryDispenser1.trendId);
                }
                if (pzk2ProcessingRateCell.chemistryDispenser2) {
                    result.push(pzk2ProcessingRateCell.chemistryDispenser2.trendId);
                }
                break;
            case ElementTypes.Pressure:
                const pressure = config as PressureConfiguration;
                if (pressure.pressureTrend) {
                    result.push(pressure.pressureTrend.trendId);
                }
                break;
            case ElementTypes.PowerBalance:
                const powerBalance = config as PowerBalanceConfiguration;
                if (hasValue(powerBalance.importTrends)) {
                    for (const trend of powerBalance.importTrends) {
                        result.push(trend.trendId);
                    }
                }
                if (powerBalance.gpaOneGenerationTrend) {
                    result.push(powerBalance.gpaOneGenerationTrend.trendId);
                }
                if (powerBalance.gpaTwoGenerationTrend) {
                    result.push(powerBalance.gpaTwoGenerationTrend.trendId);
                }
                break;
            case ElementTypes.DrumDryer: {
                const drumDryer = config as DrumDryerConfiguration;
                if (drumDryer.workTrend) {
                    result.push(drumDryer.workTrend.trendId);
                }
                break;
            }
        }
    });
    return result;
}

/**
 * Возвращает идентификаторы телеграмм для набора конфигураций.
 */
export function getConfigurationTelegramIds(configurations: readonly ElementConfigurationBase[]): string[] {
    const result: string[] = [];
    configurations.forEach((config) => {
        switch (config.elementType) {
            case ElementTypes.Vesp:
                const vesp = config as VespConfiguration;
                if (hasValue(vesp.cageTelegram)) {
                    result.push(vesp.cageTelegram.telegramId);
                }
                if (hasValue(vesp.skipTelegram)) {
                    result.push(vesp.skipTelegram.telegramId);
                }
                break;
            case ElementTypes.OverloadBunker:
                const bunker = config as OverloadBunkerConfiguration;
                if (hasValue(bunker.stateTelegram)) {
                    result.push(bunker.stateTelegram.telegramId);
                }
                break;
        }
    });
    return result;
}
