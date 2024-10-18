import Decimal from 'decimal.js';
import {hasValue} from 'northis.typescript.utils';
import {ElementConfigurationBase} from '../../business/monitoring/configurations/element-configuration-base';
import {MineBunkerConfiguration} from '../../business/monitoring/configurations/mine-bunker-configuration';
import {LevelIndicatorState} from './level-indicator/models/level-indicator-state';

/**
 * Возвращает состояние значения индикатора уровня бункера рудника.
 */
export function getMineBunkerLevelIndicatorState(
    weight: Decimal | undefined,
    configuration: ElementConfigurationBase | undefined,
): LevelIndicatorState {
    if (
        !(
            hasValue(configuration) &&
            configuration instanceof MineBunkerConfiguration &&
            hasValue(configuration.maxLevel) &&
            hasValue(configuration.minLevel) &&
            hasValue(configuration.weightTrend)
        )
    ) {
        return LevelIndicatorState.NotConfigured;
    }
    if (hasValue(weight)) {
        return LevelIndicatorState.Working;
    }
    return LevelIndicatorState.SignalError;
}
