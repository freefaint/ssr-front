/**
 * Представляет модель простоя для конфигурации.
 */
export class ConfigurationDowntimeModel {
    constructor(
        /**
         * Возвращает идентификатор простоя.
         */
        readonly downtimeId: string,
        /**
         * Возвращает имя простоя.
         */
        readonly displayName: string,
        /**
         * Возвращает имя источника данных.
         */
        readonly sourceName: string,
        /**
         * Возвращает наименование типа источника данных.
         */
        readonly sourceType: string,
    ) {}
}
