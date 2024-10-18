import {Backdrop, CircularProgress} from '@mui/material';
import React from 'react';

/**
 * Представляет свойства компонента оверлея с индикатором загрузки.
 */
interface BusyOverlayComponentProps {
    /**
     * Возвращает или устанавливает истину, если отображается индикатор занятости.
     */
    isBusy: boolean;
}

/**
 * Представляет функциональный компонент оверлея с индикатором загрузки.
 */
function BusyOverlayComponent(props: BusyOverlayComponentProps) {
    const {isBusy} = props;
    return (
        <Backdrop
            sx={{
                zIndex: (theme) => theme.zIndex.modal + 1,
            }}
            open={isBusy}>
            <CircularProgress size={100} />
        </Backdrop>
    );
}

export default BusyOverlayComponent;
