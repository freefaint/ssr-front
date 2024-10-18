import {createApi, retry} from '@reduxjs/toolkit/dist/query/react';
import {Delay} from 'northis.typescript.utils';
import {axiosBaseQuery} from 'northis.upstream.react.redux';
import {axiosInstance} from '../../services/axios-instance';

// Используется axios, потому что он умеет обрабатывать экземпляры классов dto при передаче его в body запроса POST и др.
// Стандартный fetchBaseQuery работает только с анонимными объектами.
const baseQuery = axiosBaseQuery(axiosInstance);

/**
 * Представляет параметры запроса. Соответствует части параметров передаваемым в baseQuery в queryFn. Если изменить передаваемые
 * параметры, то интерфейс тоже придется менять.
 */
interface QueryArgs {
    /**
     * Метод http.
     */
    method: string;
}

const retryBaseQuery = retry(baseQuery, {
    backoff: () => Delay(1000),
    retryCondition: (error, args: QueryArgs, extraArgs) => {
        // Повторно вызываются только запросы на получение данных. Только 3 раза.
        // Если получили ошибку 404 или 400, то перезапрашивать нет смысла.
        // @ts-ignore
        if ((error.status !== 404 || error.status !== 400) && args.method === 'GET') {
            return extraArgs.attempt <= 3;
        } else {
            return false;
        }
    },
});
/**
 * Представляет api сервиса.
 */
export const api = createApi({
    baseQuery: retryBaseQuery,
    refetchOnMountOrArgChange: true,
    tagTypes: ['configurations'],
    endpoints: () => ({}),
});
