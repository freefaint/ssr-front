import Tooltip from '@mui/material/Tooltip';
import {ClassNameProps} from 'northis.react.components';
import React, {ReactNode, useCallback} from 'react';

/**
 * Представляет компонент текста, который отображается с tooltip, если текст не помещается в контейнере, и без него, если помещается.
 * Работает только в случае с однострочным текстом (nowrap).
 */
export function TooltipOverflowText(
    props: ClassNameProps & {
        /**
         * Возвращает текст.
         */
        readonly children: ReactNode;
    },
) {
    const {children, ...divProps} = props;
    const divRef = React.useRef<HTMLDivElement>(null);
    const [isOverflowing, setIsOverflowing] = React.useState(false);

    const handleMouseOver = useCallback(() => {
        if (divRef.current) {
            setIsOverflowing(divRef.current.scrollWidth > divRef.current.clientWidth);
        }
    }, [children]);

    return (
        <Tooltip
            title={isOverflowing ? children : undefined}
            disableInteractive>
            <div
                {...divProps}
                onMouseOver={handleMouseOver}
                ref={divRef}>
                {children}
            </div>
        </Tooltip>
    );
}
