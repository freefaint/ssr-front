import {useEffect, useState} from 'react';

/**
 * Откладывает изменение значения на время {@link delay}.
 * @param value Значение.
 * @param delay Задержка изменения.
 */
export function useDebounce<V>(value: V, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
