import {TablePagingParameters} from '../state/table-paging-parameters';

/**
 * Представляет сервис для хранения параметров пагинации пользователя.
 */
export interface PagingProvider {
    /**
     * Возвращает сохраненные параметры пагинации.
     */
    LoadPaging(): TablePagingParameters;
    /**
     * Сохраняет параметры пагинации.
     */
    SavePaging(parameters: TablePagingParameters): void;
}

/**
 * Представляет сервис для хранения количества страниц из параметров пагинации в localStorage.
 */
export class LocalStoragePagingProvider implements PagingProvider {
    /**
     * Ключ пользователя.
     */
    readonly key: string;

    constructor(key: string) {
        this.key = key;
    }

    LoadPaging(): TablePagingParameters {
        const gettingParameters = localStorage.getItem(this.key);
        if (gettingParameters) {
            return new TablePagingParameters(TablePagingParameters.defaultValue.pageNumber, parseInt(gettingParameters!));
        }
        return TablePagingParameters.defaultValue;
    }

    SavePaging(parameters: TablePagingParameters): void {
        localStorage.setItem(this.key, JSON.stringify(parameters.pageSize));
    }
}
