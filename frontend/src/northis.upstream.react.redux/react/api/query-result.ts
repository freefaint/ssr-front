import {NetworkError} from './network-error';

/**
 * Представляет результат запроса.
 */
export type QueryResult =
    | {
          readonly data: unknown;
          readonly meta: QueryResultMetadata;
      }
    | {
          readonly error: NetworkError;
      };

/**
 * Создает результат запроса с полученными данными и метаданными.
 * @param data Данные результата запроса.
 * @param meta Метаданные результата запроса.
 */
export function createDataResult(data: unknown, meta: QueryResultMetadata): QueryResult {
    return {
        data: data,
        meta: meta,
    };
}

/**
 * Создает ошибку, полученную в результате запроса.
 * @param error Ошибка.
 */
export function createErrorResult(error: NetworkError): QueryResult {
    return {
        error: error,
    };
}

/**
 * Представляет метаданные результата запроса.
 */
export interface QueryResultMetadata {
    contentDisposition?: string;
}
