import {hasValue} from 'northis.typescript.utils';
// import {loggerInstance} from '../../../../infrastructure/logger-instance';
import {api} from '../../../../infrastructure/redux/app/api';
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
import {ElementIds} from '../elements/element-ids';
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
import {ConfigurationDto} from './configuration-dto';

/**
 * Представляет api для конфигурирования.
 */
export const configurationsApi = api.injectEndpoints({
    endpoints: (build) => ({
        /**
         * Получает все конфигурации.
         */
        getConfigurations: build.query<ElementConfigurationBase[], void>({
            query: () => ({
                url: 'configuration',
                method: 'GET',
            }),
            transformResponse(result: readonly ConfigurationDto[]) {
                return result.map((src) => mapConfigurationDtoToSpecificModel(src)).filter(hasValue);
            },
            providesTags: ['configurations'],
        }),
        /**
         * Получает конфигурацию по идентификатору.
         */
        getConfiguration: build.query<ElementConfigurationBase | null, string>({
            query: (elementId) => {
                return {
                    url: `configuration/${elementId}`,
                    method: 'GET',
                };
            },
            transformResponse(result: ConfigurationDto) {
                return mapConfigurationDtoToSpecificModel(result);
            },
        }),
        /**
         * Создает новую конфигурацию.
         */
        createConfiguration: build.mutation<void, ConfigurationDto>({
            query: ({id, configurationData}) => {
                return {
                    url: `configuration/${id}`,
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    body: configurationData,
                };
            },
            invalidatesTags: ['configurations'],
        }),
        /**
         * Обновляет существующую конфигурацию.
         */
        updateConfiguration: build.mutation<void, ConfigurationDto>({
            query: ({id, configurationData}) => {
                return {
                    url: `configuration/${id}`,
                    method: 'PUT',
                    headers: {'content-type': 'application/json'},
                    body: configurationData,
                };
            },
            invalidatesTags: ['configurations'],
        }),
    }),
});

function mapConfigurationDtoToSpecificModel(dto: ConfigurationDto): ElementConfigurationBase | null {
    const deciphered = JSON.parse(dto.configurationData) as Partial<ElementConfigurationBase>;
    if (!hasValue(deciphered.elementId)) {
        // loggerInstance.error('Не удалось найти поле "идентификатор" {0}', undefined, dto.configurationData);
        return null;
    }
    if (!Object.values(ElementIds as {[key: string]: string}).includes(deciphered.elementId)) {
        // values от константного объекта возвращает объединение всех констант в качестве типа, этот тип несовместим
        // с string, поэтому требуется преобразование к объекту с произвольным набором строковых полей {[key:string]:string}.
        return null;
    }
    if (!hasValue(deciphered.elementType)) {
        // loggerInstance.error('Не удалось найти поле "тип конфигурации" {0}', undefined, dto.configurationData);
        return null;
    }
    switch (deciphered.elementType) {
        case ElementTypes.Bunker: {
            const bunker: BunkerConfiguration = new BunkerConfiguration('', '');
            assignConfiguration(bunker, deciphered);
            return bunker;
        }
        case ElementTypes.BunkerWithLevelPercent: {
            const bunker: BunkerConfiguration = new BunkerLevelPercentConfiguration('', '');
            assignConfiguration(bunker, deciphered);
            return bunker;
        }
        case ElementTypes.BunkerWithLevelWeight: {
            const bunker: BunkerLevelWeightConfiguration = new BunkerLevelWeightConfiguration('', '');
            assignConfiguration(bunker, deciphered);
            return bunker;
        }
        case ElementTypes.Conveyor: {
            const conveyor: ConveyorConfiguration = new ConveyorConfiguration('', '');
            assignConfiguration(conveyor, deciphered);
            return conveyor;
        }
        case ElementTypes.ConveyorWithPreLaunch: {
            const conveyor: ConveyorWithPreLaunchConfiguration = new ConveyorWithPreLaunchConfiguration('', '');
            assignConfiguration(conveyor, deciphered);
            return conveyor;
        }
        case ElementTypes.VibraScreen: {
            const vibraScreen: VibraScreenConfiguration = new VibraScreenConfiguration('', '');
            assignConfiguration(vibraScreen, deciphered);
            return vibraScreen;
        }
        case ElementTypes.ConveyorWithDowntime: {
            const conveyor: ConveyorWithDowntimeConfiguration = new ConveyorWithDowntimeConfiguration('', '');
            assignConfiguration(conveyor, deciphered);
            return conveyor;
        }
        case ElementTypes.ConveyorWithDowntimeWithPreLaunch: {
            const conveyor: ConveyorWithDowntimeWithPreLaunchConfiguration = new ConveyorWithDowntimeWithPreLaunchConfiguration('', '');
            assignConfiguration(conveyor, deciphered);
            return conveyor;
        }
        case ElementTypes.ConveyorWithWorkBackward: {
            const conveyor: ConveyorWithWorkBackwardConfiguration = new ConveyorWithWorkBackwardConfiguration('', '');
            assignConfiguration(conveyor, deciphered);
            return conveyor;
        }
        case ElementTypes.ConveyorWithWorkBackwardWithSwitching: {
            const conveyor: ConveyorWithWorkBackwardWithSwitchingConfiguration = new ConveyorWithWorkBackwardWithSwitchingConfiguration(
                '',
                '',
            );
            assignConfiguration(conveyor, deciphered);
            return conveyor;
        }
        case ElementTypes.GasPistonPowerPlantTab: {
            const tab: GasPistonPowerPlantTabConfiguration = new GasPistonPowerPlantTabConfiguration('', '');
            assignConfiguration(tab, deciphered);
            return tab;
        }
        case ElementTypes.MineBunkerMixer: {
            const mineBunkerMixer: MineBunkerMixerConfiguration = new MineBunkerMixerConfiguration('', '');
            assignConfiguration(mineBunkerMixer, deciphered);
            return mineBunkerMixer;
        }
        case ElementTypes.MineBunker: {
            const mineBunker: MineBunkerConfiguration = new MineBunkerConfiguration('', '');
            assignConfiguration(mineBunker, deciphered);
            return mineBunker;
        }
        case ElementTypes.ParameterIndicator: {
            const parameterIndicator: ParameterIndicatorConfiguration = new ParameterIndicatorConfiguration('', '');
            assignConfiguration(parameterIndicator, deciphered);
            return parameterIndicator;
        }
        case ElementTypes.Funnel: {
            const funnel: FunnelConfiguration = new FunnelConfiguration('', '');
            assignConfiguration(funnel, deciphered);
            return funnel;
        }
        case ElementTypes.Dispenser:
            const dispenser: DispenserConfiguration = new DispenserConfiguration('', '');
            assignConfiguration(dispenser, deciphered);
            return dispenser;
        case ElementTypes.CounterCellsWithTrends:
            const counterWithTrends: CounterCellsWithTrendsConfiguration = new CounterCellsWithTrendsConfiguration('', '');
            assignConfiguration(counterWithTrends, deciphered);
            return counterWithTrends;
        case ElementTypes.LoadingBunker: {
            const loadingBunker = new LoadingBunkerConfiguration('', '');
            assignConfiguration(loadingBunker, deciphered);
            return loadingBunker;
        }
        case ElementTypes.DoubleLoadingBunker: {
            const doubleLoadingBunker = new DoubleLoadingBunkerConfiguration('', '');
            assignConfiguration(doubleLoadingBunker, deciphered);
            return doubleLoadingBunker;
        }
        case ElementTypes.RailwayCarriageWeight: {
            const railwayCarriageWeight = new RailwayCarriageWeightConfiguration('', '');
            assignConfiguration(railwayCarriageWeight, deciphered);
            return railwayCarriageWeight;
        }
        case ElementTypes.MobileConveyors:
            const mobileConveyors: MobileConveyorsConfiguration = new MobileConveyorsConfiguration('', '');
            assignConfiguration(mobileConveyors, deciphered);
            return mobileConveyors;
        case ElementTypes.Humidity:
            const humidity: HumidityConfiguration = new HumidityConfiguration('', '');
            assignConfiguration(humidity, deciphered);
            return humidity;
        case ElementTypes.DrumDryer:
            const drumDryer: DrumDryerConfiguration = new DrumDryerConfiguration('', '');
            assignConfiguration(drumDryer, deciphered);
            return drumDryer;
        case ElementTypes.Vesp:
            const vesp: VespConfiguration = new VespConfiguration('', '');
            assignConfiguration(vesp, deciphered);
            return vesp;
        case ElementTypes.OverloadBunker:
            const bunker: OverloadBunkerConfiguration = new OverloadBunkerConfiguration('', '');
            assignConfiguration(bunker, deciphered);
            return bunker;
        case ElementTypes.CounterCellWithTrend:
            const counterWithTrend: CounterCellWithTrendConfiguration = new CounterCellWithTrendConfiguration('', '');
            assignConfiguration(counterWithTrend, deciphered);
            return counterWithTrend;
        case ElementTypes.Pzk2ProcessingRateCell:
            const pzk2ProcessingRateCellConfiguration: Pzk2ProcessingRateCellConfiguration = new Pzk2ProcessingRateCellConfiguration(
                '',
                '',
            );
            assignConfiguration(pzk2ProcessingRateCellConfiguration, deciphered);
            return pzk2ProcessingRateCellConfiguration;
        case ElementTypes.Pressure:
            const pressure: PressureConfiguration = new PressureConfiguration('', '');
            assignConfiguration(pressure, deciphered);
            return pressure;
        case ElementTypes.PowerBalance:
            const powerBalance: PowerBalanceConfiguration = new PowerBalanceConfiguration('', '');
            assignConfiguration(powerBalance, deciphered);
            return powerBalance;
        default:
            // loggerInstance.error('Неизвестный тип конфигурации {0}', undefined, dto.configurationData);
            return null;
    }
}

function assignConfiguration(result: ElementConfigurationBase, input: Partial<ElementConfigurationBase>) {
    Object.assign(result, input);
}
