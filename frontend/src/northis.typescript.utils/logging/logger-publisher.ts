import {AxiosInstance} from 'axios';
import {LoggerLevelEnum, LoggerLevelResource} from './logger-level.resource';
import {StructureLog} from './structure-log';

/**
 * Представляет сервис отправки структурированного лога.
 */
export class LoggerPublisher {
    /**
     * @param axiosClient Экземпляр axios-клиента.
     * @param loggingLevel Уровень логирования
     * @param loggingGraylogConnection Строка подключения Graylog.
     */
    constructor(
        private readonly axiosClient: AxiosInstance,
        private readonly loggingLevel: LoggerLevelEnum,
        private readonly loggingGraylogConnection: string,
    ) {}

    /**
     * Отправляет структурированный лог публикаторам.
     * @param log Структурированный лог.
     */
    public publish(log: StructureLog): void {
        if (shouldLog(log.Level as number, this.loggingLevel)) {
            publishToConsole(log);
            publishToServer(this.axiosClient, log, this.loggingGraylogConnection);
        }
    }
}

function shouldLog(Level: LoggerLevelEnum, logLevel: LoggerLevelEnum): boolean {
    const loggingLevel = logLevel;
    return (Level >= loggingLevel && Level !== LoggerLevelEnum.OFF) || loggingLevel === LoggerLevelEnum.ALL;
}

function publishToServer(axiosClient: AxiosInstance, log: StructureLog, graylogConnection: string): void {
    axiosClient.post(graylogConnection, JSON.stringify(log)).catch(function (error) {
        console.log(error);
    });
}

function publishToConsole(log: StructureLog): void {
    switch (log.Level) {
        case LoggerLevelEnum.TRACE: {
            log.Level = LoggerLevelResource.trace;
            console.log(log);
            break;
        }
        case LoggerLevelEnum.DEBUG: {
            log.Level = LoggerLevelResource.debug;
            console.log(log);
            break;
        }
        case LoggerLevelEnum.INFO: {
            log.Level = LoggerLevelResource.info;
            console.log(log);
            break;
        }
        case LoggerLevelEnum.WARN: {
            log.Level = LoggerLevelResource.warn;
            console.warn(log);
            break;
        }
        case LoggerLevelEnum.ERROR: {
            log.Level = LoggerLevelResource.error;
            console.error(log);
            break;
        }
        case LoggerLevelEnum.FATAL: {
            log.Level = LoggerLevelResource.fatal;
            console.error(log);
            break;
        }
        default: {
            throw new Error('Неизвестный уровень логирования: ' + log.Level);
        }
    }
}
