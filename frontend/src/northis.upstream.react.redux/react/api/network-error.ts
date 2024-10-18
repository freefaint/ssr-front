/**
 * Представляет сетевую ошибку.
 */
export class NetworkError {
    /**
     * @param status Статус ошибки.
     * @param data Данные ошибки.
     */
    constructor(readonly status?: number, readonly data?: unknown) {}
}
