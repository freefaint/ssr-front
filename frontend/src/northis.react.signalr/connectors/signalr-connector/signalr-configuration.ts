/**
 * Представляет конфигурацию для SignalR.
 */
export class SignalRConfiguration {
    /**
     * @param endpoint Точка доступа.
     */
    constructor(readonly endpoint: string) {
    }
}