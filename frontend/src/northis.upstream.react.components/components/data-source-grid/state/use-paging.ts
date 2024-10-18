import {useCallback, useEffect, useMemo, useState} from 'react';
import {PagingState} from './paging-state';
import {TablePagingParameters} from './table-paging-parameters';
import {PagingProvider} from '../service/paging-provider';

/**
 * Возвращает параметры пагинации запроса.
 */
export function usePaging(): PagingState {
    const [parameters, setParameters] = useState<TablePagingParameters>(pagingProvider.LoadPaging());

    useEffect(() => {
        // в сервисе "Reports" возникла проблема в окне добавления сигнала.
        // т.к. там есть и группы и список, то, изменяя параметры пагинации в одном месте, они не менялись в другом.
        // данный useEffect решает эту проблему тем, что он сравнивает текущий размер страницы
        // с тем, который лежит в хранилище и если они не совпадают, то он устанавливает параметры из хранилища.
        if (parameters.pageSize !== pagingProvider.LoadPaging().pageSize) {
            setParameters(pagingProvider.LoadPaging());
        }
    });

    const onParametersChange = useCallback((newValue: TablePagingParameters) => {
        setParameters(newValue);
        pagingProvider.SavePaging(newValue);
    }, []);

    return useMemo(() => new PagingState(parameters, onParametersChange), [parameters, onParametersChange]);
}

/**
 * Возвращает провайдер для сохранения/получения параметров пагинации пользователя.
 */
let pagingProvider: PagingProvider;

/**
 * Изменяет провайдер параметров пагинации.
 */
export function changePagingProvider(provider: PagingProvider) {
    pagingProvider = provider;
}
