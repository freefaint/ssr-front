import {CircularProgress} from '@mui/material';
import React from 'react';
import {ChildrenProps} from '../../react/props/children-props';


/**
 * Представляет свойства компонента индикатора занятости.
 */
interface BusyComponentProps extends Partial<ChildrenProps> {
    /**
     * Возвращает или устанавливает истину, если отображается индикатор занятости,
     * в противном случае отображается свойство {@link ChildrenProps.children}.
     */
    isBusy: boolean;
}

/**
 * Представляет функциональный компонент индикатора занятости.
 */
function BusyComponent(props: BusyComponentProps) {
    const {children, isBusy} = props;
    if (isBusy) {
        return (
            <div className="northisBusyContainer">
                <CircularProgress size={100} />
            </div>
        );
    } else {
        return <>{children}</>;
    }
}

export default BusyComponent;
