import axios from 'axios';
import {getAccessToken} from 'northis.react.components';
import {hasValue} from 'northis.typescript.utils';
import environment from '../../enviroment/environment';

/**
 * Экземпляр axios, используемый в приложении.
 */
export const axiosInstance = axios.create({
    baseURL: `${environment.connectionString}api/v1/scada/`,
});

axiosInstance.interceptors.request.use(function (config) {
    const accessToken = getAccessToken();
    if (hasValue(accessToken)) {
        config.headers.Authorization = `Bearer ${getAccessToken()}`;
    }
    return config;
});
