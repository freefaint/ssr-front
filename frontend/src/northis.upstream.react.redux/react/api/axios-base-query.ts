import {BaseQueryFn} from '@reduxjs/toolkit/query';
import {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import {NetworkError} from './network-error';
import {createDataResult, createErrorResult, QueryResult} from './query-result';
import { requestViaBridge } from 'components/smartapp';

/**
 * Представляет адаптер для redux и axios.
 */
export const axiosBaseQuery =
    (
        axios: AxiosInstance,
    ): BaseQueryFn<
        {
            url: string;
            method: AxiosRequestConfig['method'];
            body?: AxiosRequestConfig['data'];
            headers?: AxiosRequestConfig['headers'];
            params?: AxiosRequestConfig['params'];
        },
        unknown,
        NetworkError,
        {
            timeout?: number;
        } | undefined
    > =>
    async ({url, method, body, headers, params}, api, extraOptions): Promise<QueryResult> => {
        try {
            // Для запросов с множественными параметрами формат без настройки paramsSerializer
            // имел вид ?a[]=b&a[]=c, нам необходимо без индексов.
            const res = await requestViaBridge(url);
            // const result = await axios.request({
            //     url: url,
            //     method,
            //     data: body,
            //     headers: headers,
            //     params,
            //     paramsSerializer: {indexes: null},
            //     timeout: extraOptions?.timeout,
            // });
            const result = createDataResult(res, {
                
            });
            
            return result;
        } catch (axiosError) {
            let err = axiosError as AxiosError;
            return createErrorResult(new NetworkError(err.response?.status, err.response?.data || err.message));
        }
    };
