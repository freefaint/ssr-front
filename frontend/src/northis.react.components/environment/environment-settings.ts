import {assertHasValue, hasValue, LoggerLevelEnum} from 'northis.typescript.utils';

/**
 * Представляет настройки окружения, используемые в приложении.
 */
export interface EnvironmentSettings {
    /**
     * Возвращает строку подключения.
     */
    readonly connectionString: string;
    /**
     * Возвращает данные авторизованного пользователя.
     */
    readonly identity: {clientId: string; secret: string; issuer: string};
    /**
     * Возвращает настройки логирования.
     */
    readonly logging: {graylogNamespace: string; graylogConnection: string; loggingLevel: LoggerLevelEnum};
}

let environmentSettings: EnvironmentSettings | null = null;

/**
 * Возвращает настройки окружения.
 */
export function getEnvironmentSettings(): EnvironmentSettings {
    assertHasValue(environmentSettings, 'Настройки окружения не были установлены. Установите их с помощью setEnvironmentSettings');
    return environmentSettings;
}

/**
 * Устанавливает настройки окружения. Использовать только один раз при запуске приложения.
 */
export function setEnvironmentSettings(settings: EnvironmentSettings) {
    if (hasValue(environmentSettings)) {
        throw Error('Настройки должны быть установлены один раз при старте приложения.');
    }
    environmentSettings = settings;
}
