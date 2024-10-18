import {setEnvironmentSettings} from 'northis.react.components';
import {LoggerLevelEnum} from 'northis.typescript.utils';

/**
 * Определяет настройки приложения.
 */
class AppSettings {
    /**
     * Адрес подключения к api.
     */
    public apiUrl: string = '';

    /**
     * Адрес IdentityServer.
     */
    public authority: string = '';

    /**
     * ClientId для IdentityServer.
     */
    public client_id: string = '';

    /**
     * ClientSecret для IdentityServer.
     */
    public client_secret: string = '';
    /**
     * Ссылка на Graylog.
     */
    public graylogUrl: string = '';

    /**
     * Пространство имён для Graylog.
     */
    public graylogNamespace: string = '';

    /**
     * Частота запросов (в миллисекундах).
     */
    public request_interval: number = 10000;

    /**
     * Величина таймаута для повторяющихся запросов (в миллисекундах).
     */
    public repeat_query_timeout: number = 10000;
}

const settings = getSettings();

function getSettings(): Readonly<AppSettings> {
    const env = new AppSettings();

    const browserWindow = window ?? {};

    // @ts-ignore
    const browserWindowEnv = browserWindow['__env'] ?? {};

    for (const key in browserWindowEnv) {
        if (env.hasOwnProperty(key)) {
            // @ts-ignore
            env[key] = browserWindowEnv[key];
        }
    }

    return env;
}

/**
 * Обертка для использования настроек окружения.
 * См. файл env.js в корне проекта.
 */
const environment = {
    /**
     * Строка подключения.
     */
    connectionString: settings.apiUrl,
    /**
     * Частота запросов (в миллисекундах).
     */
    requestInterval: settings.request_interval,
    /**
     * Величина таймаута для повторяющихся запросов (в миллисекундах).
     */
    repeatQueryTimeout: settings.repeat_query_timeout,
    /**
     * Параметры IdentityServer.
     */
    identity: {
        /**
         * Строка подключения к Identity.
         */
        issuer: settings.authority,
        /**
         * Идентификатор клиента.
         */
        clientId: settings.client_id,
        /**
         * Секрет.
         */
        secret: settings.client_secret,
    },
    /**
     * Параметры логирования.
     */
    logging: {
        /**
         * Уровень логирования.
         */
        loggingLevel: LoggerLevelEnum.ALL,
        /**
         * Строка подключения Graylog.
         */
        graylogConnection: settings.graylogUrl,

        /**
         * Пространство имен Graylog.
         */
        graylogNamespace: settings.graylogNamespace,
    },
} as const;

setEnvironmentSettings(environment);

export default environment;
