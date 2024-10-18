import {PagingResult} from './paging-result';

/**
 * Конвертирует результат пагинации из dto в модель.
 * @param data Данные dto.
 * @param mapItem Функция отображения из dto в модель.
 */
export function mapPagingResult<TModel, TDto>(data: PagingResult<TDto>, mapItem: (dto: TDto) => TModel): PagingResult<TModel> {
    return new PagingResult<TModel>(data.items.map(mapItem), data.totalCount);
}
