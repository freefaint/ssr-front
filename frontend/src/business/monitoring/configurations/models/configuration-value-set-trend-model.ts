import {TrendTypeMetadata} from './trend-type-metadata';

/**
 * Представляет модель тренда с набором значений для конфигурации.
 */
export class ConfigurationValueSetTrendModel {
    constructor(
        /**
         * Возвращает идентификатор.
         */
        readonly trendId: string,
        /**
         * Возвращает отображаемое имя.
         */
        readonly displayName: string,
        /**
         * Возвращает данные типа, но поле values будет null если тип - не набор значений.
         */
        readonly typeMetadata: TrendTypeMetadata,
    ) {}
}
