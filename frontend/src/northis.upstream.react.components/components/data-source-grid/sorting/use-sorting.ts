import {useCallback, useMemo, useState} from 'react';
import {SortingMode} from './sorting-mode';
import {SortingModel} from './sorting-model';
import {SortingState} from './sorting-state';
import {SortingItem} from './sorting-item';
import {useRef} from 'react';

/**
 * Представляет модель сортировки запроса.
 * @param sortingMode Режим сортировки.
 * @param initialSorting Параметр сортировки по умолчанию.
 */
export function useSorting(sortingMode: SortingMode, initialSorting: SortingItem | null = null) {
    const sortedFieldRef = useRef(initialSorting !== null ? initialSorting.field : null);
    const initialSortingModel = initialSorting !== null ? [initialSorting] : [];
    const [sortingModel, setSortingModel] = useState<SortingModel>(initialSortingModel);
    const onSortingChange = useCallback((newModel: SortingModel) => setSortingModel(newModel), []);

    return useMemo(() => {
        let model: SortingModel;
        if (sortingModel.length > 0) {
            model = sortingModel;
            sortedFieldRef.current = sortingModel[0]?.field ?? null;
        } else {
            // Задает сортировку по умолчанию при отключении сортировки.
            model = initialSortingModel;

            // Устанавливает на поле по умолчанию сортировку по возрастанию в момент перехода на отсутствие сортировки.
            // Это необходимо, поскольку переход с сортировки в обратном порядке на отсутствие сортировки поставит
            // сортировку по умолчанию, что заблокирует переключение на другой порядок сортировки для поля по умолчанию.
            if (initialSorting?.sort === 'desc' && sortedFieldRef !== null && sortedFieldRef.current === initialSorting?.field) {
                model = [{field: initialSorting?.field, sort: 'asc'}];
            }

            if (model[0]) {
                sortedFieldRef.current = model[0].field;
            }
        }

        return new SortingState(model, onSortingChange, sortingMode);
    }, [sortingModel, onSortingChange, sortingMode]);
}
