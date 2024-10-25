import classNames from 'classnames';
import {ReactComponent as FunnelComp} from '../../../assets/svg/funnel_ic.svg';
import {FunnelState} from './funnel-state';
import styles from './funnel.module.scss';

/**
 * Представляет компонент Воронка.
 */
export function Funnel(props: {
    /**
     * Возвращает состояние компонента.
     */
    readonly state: FunnelState;
}) {
    const {state} = props;

    return (
        <FunnelComp
            className={classNames({
                [styles.funnelNotConf]: state === FunnelState.NotConfigured,
                [styles.funnelOff]: state === FunnelState.TurnedOff,
                [styles.funnelError]: state === FunnelState.SignalError,
                [styles.funnelWorking]: state === FunnelState.Working,
            })}
        />
    );
}
