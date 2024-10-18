import {useRef} from 'react';

/**
 * Возвращает истину, если в данный момент выполняется первый рендер компонента
 */
export function useFirstRenderCheck() {
    const ref = useRef(true);
    const firstRender = ref.current;
    ref.current = false;
    return firstRender;
}
