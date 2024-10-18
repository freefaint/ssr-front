import {GridScrollParams} from '@mui/x-data-grid';
import {MutableRefObject, useEffect} from 'react';
import {GridApiCommunity} from '@mui/x-data-grid/internals';

/**
 * Сохраняет позицию прокрутке при каждом ее изменении из апи таблицы {@link apiRef} в {@link setScrollPosition}.
 * При монтировании компонента один раз восстанавливает позицию из {@link scrollPosition} обратно в апи таблицы {@link apiRef}.
 * @param apiRef Ссылка на api для mui таблицы.
 * @param scrollPosition Позиция scroll.
 * @param setScrollPosition Делегат, вызываемый при изменении позиции scroll.
 */
export function useSyncScrollEffect(
    apiRef: MutableRefObject<GridApiCommunity>,
    scrollPosition: GridScrollParams | null,
    setScrollPosition: (value: GridScrollParams) => void,
) {
    useEffect(() => {
        const current = apiRef.current;
        // Без вызова requestAnimationFrame происходит внутренняя ошибка библиотеки.
        requestAnimationFrame(() => {
            if (scrollPosition) {
                current.scroll(scrollPosition);
            }
        });
        apiRef.current.subscribeEvent('scrollPositionChange', (params) => {
            setScrollPosition(params);
        });
    }, []);
}
