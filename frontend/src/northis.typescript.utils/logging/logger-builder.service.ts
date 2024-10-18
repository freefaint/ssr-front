import {StructureLog} from './structure-log';

/**
 * Представляет сервис конструирования структурированного лога.
 */
export class LoggerBuilderService {
    constructor(
        /**
         * Возвращает пространство имен Graylog.
         */
        private readonly graylogNamespace: string,
        /**
         * Возвращает делегат получения идентификатора сессии.
         */
        private readonly sessionId: () => string | null,
        /**
         * Возвращает делегат получения имени пользователя.
         */
        private readonly userName: () => string | null,
    ) {}
    /**
     * Собирает структурированный лог.
     * @param message Сообщение.
     * @param level Уровень логирования.
     * @param exception Исключение.
     * @param param Дополнительные параметры.
     */
    build(message: string, level: number, exception?: any, param?: string[]): StructureLog {
        const structureLog = new StructureLog();
        structureLog.namespace_name = this.graylogNamespace;
        structureLog.Level = level;
        structureLog.dateTime = new Date();
        structureLog.browserVersion = navigator.userAgent;
        structureLog.sessionId = this.sessionId();
        structureLog.userName = this.userName();
        if (exception) {
            structureLog.exception = {
                stack: exception.stack,
                message: exception.message,
            };
        }
        if (param) {
            structureLog.message = buildTemplateMessage(message, param);
        } else {
            structureLog.message = message;
        }
        return structureLog;
    }
}

/**
 * Строит сообщение по шаблону.
 * @param message Сообщение.
 * @param param Параметры для заполнения.
 */
function buildTemplateMessage(message: string, param: string[]): string {
    let paramNumber = 0;
    while (paramNumber < param.length) {
        message = message.replace(`{${paramNumber}}`, `${param[paramNumber]}`);
        paramNumber++;
    }
    return message;
}
