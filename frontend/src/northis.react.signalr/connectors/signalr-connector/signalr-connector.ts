import * as signalR from "@microsoft/signalr";
import {SignalRConfiguration} from ".";

/**
 * Представляет Signalr коннектор.
 */
export abstract class SignalrConnector {
    private readonly connection: signalR.HubConnection;

    /**
     * @param config Конфигурация Signalr.
     * @param errorHandler Обработчик ошибок.
     * @protected
     */
    protected constructor(private readonly config: SignalRConfiguration, protected readonly errorHandler: SignalrConnectorErrorHandler) {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(config.endpoint)
            .withAutomaticReconnect()
            .build();
    }

    /**
     * Возвращает состояние конектора.
     */
    public getState() {
        return this.connection.state;
    }

    /**
     * Устанавливает соединение.
     */
    public async startAsync(): Promise<void> {
        return this.connection.start().catch(error => this.onErrorCatch(error));
    };

    /**
     * Останавливает соединение.
     */
    public async stopAsync(): Promise<void> {
        return this.connection.stop().catch(error => this.onErrorCatch(error));
    }

    /**
     * Обрабатывает ошибку.
     * @param err Ошибка.
     * @protected
     */
    protected onErrorCatch(err: any) {
        this.errorHandler(err);
    }

    /**
     * Вызывает метод концентратора на сервере, используя указанное имя метода и сообщение.
     * @param methodName Имя метода.
     * @param message Сообщение для вызова метода на сервере.
     * @protected
     */
    protected async sendAsync(methodName: string, ...args: any[]) {
        return this.connection.send(methodName, args)
    }

    /**
     * Регистрирует обработчик, который будет вызываться при вызове метода концентратора.
     * @param methodName Имя метода.
     * @param onReceive Обработчик получения сообщения.
     * @protected
     */
    protected receive<TMessage, TResult>(methodName: string, onReceive: (message: TMessage) => TResult) {
        this.connection.on(methodName, onReceive)
    }

    /**
     * Удаляет обработчик для указанного метода концентратора.
     * @param methodName Имя метода.
     * @param onReceive Обработчик получения сообщения.
     */
    public removeHandler<TMessage, TResult>(methodName: string, onReceive: (message: TMessage) => TResult) {
        this.connection.off(methodName, onReceive);
    }

    /**
     * Удаляет все обработчики для указанного метода концентратора.
     * @param methodName Имя метода.
     */
    public removeAllHandlers(methodName: string) {
        this.connection.off(methodName);
    }

    /**
     * Добавляет коллбэк, вызываемый при закрытии соединения.
     * @param callback Коллбэк.
     */
    public onClose(callback: (error?: Error) => void) {
        this.connection.onclose(callback)
    }

    /**
     * Добавляет коллбэк, вызываемый при попытке переподключения.
     * @param callback Коллбэк.
     */
    public onReconnecting(callback: (error?: Error) => void) {
        this.connection.onreconnecting(callback)
    }

    /**
     * Добавляет коллбэк, вызываемый при переподключении.
     * @param callback Коллбэк.
     */
    public onReconnected(callback: (connectionId?: string) => void) {
        this.connection.onreconnected(callback)
    }
}

/**
 * Представляет тип обработчика ошибок для signalr-connector;
 */
export type SignalrConnectorErrorHandler = (err: any) => void;
