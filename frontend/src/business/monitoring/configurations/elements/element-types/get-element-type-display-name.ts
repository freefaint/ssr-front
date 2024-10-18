import {ElementTypes} from './element-types';

/**
 * Возвращает отображаемое наименование типа элемента.
 */
export function GetElementTypeDisplayName(type: ElementTypes): string {
    switch (type) {
        case ElementTypes.Conveyor:
            return 'Конвейер';
        case ElementTypes.ConveyorWithPreLaunch:
            return 'Конвейер';
        case ElementTypes.Bunker:
            return 'Бункер';
        case ElementTypes.BunkerWithLevelPercent:
            return 'Бункер с показателем уровня в процентах';
        case ElementTypes.BunkerWithLevelWeight:
            return 'Бункер с показателем уровня массы';
        case ElementTypes.VibraScreen:
            return 'Грохот';
        case ElementTypes.ConveyorWithDowntime:
            return 'Конвейер';
        case ElementTypes.ConveyorWithDowntimeWithPreLaunch:
            return 'Конвейер';
        case ElementTypes.ConveyorWithWorkBackward:
            return 'Конвейер';
        case ElementTypes.ConveyorWithWorkBackwardWithSwitching:
            return 'Конвейер';
        case ElementTypes.GasPistonPowerPlantTab:
            return 'Газопоршневая';
        case ElementTypes.MineBunkerMixer:
            return 'Бункер р/с';
        case ElementTypes.MineBunker:
            return 'Бункер рудника';
        case ElementTypes.MobileConveyors:
            return 'Мобильные конвейеры';
        case ElementTypes.ParameterIndicator:
            return 'Параметр-значение';
        case ElementTypes.Funnel:
            return 'Воронка';
        case ElementTypes.Dispenser:
            return 'Дозатор';
        case ElementTypes.CounterCellsWithTrends:
            return 'Счетчик (агрегация из нескольких)';
        case ElementTypes.Vesp:
            return 'Группа оборудования';
        case ElementTypes.Humidity:
            return 'Влажность';
        case ElementTypes.DrumDryer:
            return 'Сушилка';
        case ElementTypes.LoadingBunker:
            return 'Бункер (погрузка)';
        case ElementTypes.DoubleLoadingBunker:
            return 'Бункер (погрузка)';
        case ElementTypes.RailwayCarriageWeight:
            return 'Вагон';
        case ElementTypes.OverloadBunker:
            return 'Бункер';
        case ElementTypes.CounterCellWithTrend:
            return 'Счетчик';
        case ElementTypes.Pzk2ProcessingRateCell:
            return 'Счетчик';
        case ElementTypes.Pressure:
            return 'Давление';
        case ElementTypes.PowerBalance:
            return 'Баланс';
    }
}
