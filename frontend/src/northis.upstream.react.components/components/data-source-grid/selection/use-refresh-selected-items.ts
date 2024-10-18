import {GridRowId} from '@mui/x-data-grid';
import {useEffect} from 'react';

/**
 * Заменяет данные в списке выбранных элементов более новыми из списка {@link items}.
 * При изменении (по ссылке, а не по содержимому) списка {@link items} формирует новый список выбранных элементов, заменяя элементы,
 * которые есть и в {@link selectedItems}, и в {@link items}, более новыми. Вызывает {@link setSelectedItems} со сформированным списком.
 * При исчезновении элемента из списка {@link items}, идентичный элемент из списка выбранных не удаляется, т.к. подобная ситуация является
 * нормальной в многих случаях (например, элементы, выбранные не на текущей странице в таблице с пагинацией, не должны удаляться при
 * обновлении списка текущих элементов).
 * @param items Проверяемый список элементов.
 * @param selectedItems Список выбранных элементов.
 * @param setSelectedItems Делегат, вызываемый при необходимости обновить список выбранных элементов.
 * @param getRowId Делегат, возвращающий идентификатор указанного элемента.
 */
export function useRefreshSelectedItems<R>(
    items: readonly R[],
    selectedItems: readonly R[],
    setSelectedItems: (dispatch: (prevState: readonly R[]) => R[]) => void,
    getRowId: (row: R) => GridRowId,
) {
    useEffect(() => {
        setSelectedItems((prevState) => {
            const itemsIds = items.map((value) => getRowId(value));
            const outerSelectedIds = selectedItems.map((x) => getRowId(x));
            const selectedIds = prevState.map((value) => getRowId(value));
            const oldSelectedNotInItems = prevState.filter((value) => !itemsIds.includes(getRowId(value)));
            const freshSelectedFromItems = items.filter((value) => selectedIds.includes(getRowId(value)));
            const result = oldSelectedNotInItems.concat(freshSelectedFromItems);
            // Если коллекция outerSelectedIds не содержит какие-то элементы из коллекции result, значит они были удалены.
            return result.filter((x) => outerSelectedIds.includes(getRowId(x)));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);
}
