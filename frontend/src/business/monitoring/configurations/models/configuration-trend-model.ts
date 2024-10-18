/**
 * Представляет модель тренда для конфигурации.
 */
export class ConfigurationTrendModel {
    constructor(
        /**
         * Возвращает идентификатор тренда.
         */
        readonly trendId: string,
        /**
         * Возвращает имя тренда.
         */
        readonly trendName: string,
        /**
         * Возвращает имя типа тренда.
         */
        readonly typeName: string,
        /**
         * Возвращает true, если тренд является числовым.
         */
        readonly isNumeric: boolean,
    ) {}
}
