import Decimal from 'decimal.js';
import {hasValue} from 'northis.typescript.utils';
import {ElementConfigurationBase} from '../../../business/monitoring/configurations/element-configuration-base';
import {FunnelConfiguration} from '../../../business/monitoring/configurations/funnel-configuration';
import {FunnelState} from './funnel-state';

export function getFunnelState(workTrendValue: Decimal | undefined, configuration: ElementConfigurationBase | undefined): FunnelState {
    if (!(hasValue(configuration) && configuration instanceof FunnelConfiguration)) {
        return FunnelState.NotConfigured;
    } else if (!hasValue(configuration.inWork) || !hasValue(configuration.stateTrend) || !hasValue(configuration.inTurnedOff)) {
        return FunnelState.NotConfigured;
    } else if (hasValue(workTrendValue) && workTrendValue.toNumber() === configuration.inWork) {
        return FunnelState.Working;
    } else if (hasValue(workTrendValue) && workTrendValue.toNumber() === configuration.inTurnedOff) {
        return FunnelState.TurnedOff;
    } else return FunnelState.SignalError;
}
