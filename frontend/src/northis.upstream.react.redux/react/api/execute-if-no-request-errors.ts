import {NetworkError} from './network-error';
import {SerializedError} from '@reduxjs/toolkit';

/**
 * Выполняет функцию onSuccess, если в результате выполнения запроса не возникла ошибка.
 * @param request Запрос, который необходимо выполнить.
 * @param onSuccess Функция, которую необходимо выполнить в случае отсутствия ошибки.
 */
export async function ExecuteIfNoRequestErrors<TData>(
    request: () => Promise<{data: unknown} | {error: NetworkError | SerializedError}>,
    onSuccess: (data: TData) => void,
) {
    const queryResult = await request();
    if (!('error' in queryResult)) {
        onSuccess(queryResult.data as TData);
    }
}
