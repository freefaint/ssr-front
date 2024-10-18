import {useEffect, useRef, useState} from 'react';

/**
 * Следит за размерами указанного элемента {@link container}. При изменении размеров вызывает перерисовку и возвращает новые размеры
 * указанного элемента.
 * Для получения размеров используются {@link HTMLElement.prototype.offsetHeight} и {@link HTMLElement.prototype.offsetWidth} с учетом
 * borders, padding, и scrollbar.
 * @param container Элемент, размеры которого отслеживаются.
 */
export function useUpdatableSize(container: HTMLElement | null) {
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });
    const observer = useRef(
        new ResizeObserver((entries) => {
            const entry = entries[0];
            const element = entry.target as HTMLElement;
            const result: {width: number; height: number} = {width: element.offsetWidth, height: element.offsetHeight};
            setSize(result);
        }),
    );
    useEffect(() => {
        if (container) {
            const currentObserver = observer.current;
            currentObserver.observe(container);
            return () => currentObserver.unobserve(container);
        }
    }, [container]);
    return size;
}
