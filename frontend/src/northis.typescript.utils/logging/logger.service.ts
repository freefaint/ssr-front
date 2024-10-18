import {LoggerBuilderService} from './logger-builder.service';
import {LoggerLevelEnum} from './logger-level.resource';
import {LoggerPublisher} from './logger-publisher';

/**
 * Представляет сервис логирования.
 */
export class LoggerService {
    /**
     * @param logBuilder Сервис конструирования структурированного лога.
     * @param loggerPublisher Сервис отправки структурированного лога.
     */
    constructor(private readonly logBuilder: LoggerBuilderService, private readonly loggerPublisher: LoggerPublisher) {}

    /**
     * Отправляет лог с уровнем 'отслеживания'.
     * @param message Сообщение.
     * @param exception Исключение.
     * @param param Дополнительные параметры.
     */
    trace(message: string, exception?: any, ...param: string[]): void {
        const structureLog = this.logBuilder.build(message, LoggerLevelEnum.TRACE, exception, param);
        this.loggerPublisher.publish(structureLog);
    }

    /**
     * Отправляет лог с уровнем 'отладки'.
     * @param message Сообщение.
     * @param exception Исключение.
     * @param param Дополнительные параметры.
     */
    debug(message: string, exception?: any, ...param: string[]): void {
        const structureLog = this.logBuilder.build(message, LoggerLevelEnum.DEBUG, exception, param);
        this.loggerPublisher.publish(structureLog);
    }

    /**
     * Отправляет лог с уровнем 'информация'.
     * @param message Сообщение.
     * @param param Дополнительные параметры.
     * @param exception Исключение.
     */
    info(message: string, exception?: any, ...param: string[]): void {
        const structureLog = this.logBuilder.build(message, LoggerLevelEnum.INFO, exception, param);
        this.loggerPublisher.publish(structureLog);
    }

    /**
     * Отправляет лог с уровнем 'предупреждение'.
     * @param message Сообщение.
     * @param param Дополнительные параметры.
     * @param exception Исключение.
     */
    warn(message: string, exception?: any, ...param: string[]): void {
        const structureLog = this.logBuilder.build(message, LoggerLevelEnum.WARN, exception, param);
        this.loggerPublisher.publish(structureLog);
    }

    /**
     * Отправляет лог с уровнем 'ошибка'.
     * @param message Сообщение.
     * @param exception Исключение.
     * @param param Дополнительные параметры.
     */
    error(message: string, exception?: any, ...param: string[]): void {
        const structureLog = this.logBuilder.build(message, LoggerLevelEnum.ERROR, exception, param);
        this.loggerPublisher.publish(structureLog);
    }

    /**
     * Отправляет лог с уровнем 'критическая ошибка'.
     * @param message Сообщение.
     * @param exception Исключение.
     * @param param Дополнительные параметры.
     */
    fatal(message: string, exception?: any, ...param: string[]): void {
        const structureLog = this.logBuilder.build(message, LoggerLevelEnum.FATAL, exception, param);
        this.loggerPublisher.publish(structureLog);
    }
}
