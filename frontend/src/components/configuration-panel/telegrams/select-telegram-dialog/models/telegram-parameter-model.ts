import {DetailedTypeMetadataModel} from './detailed-type-metadata-model';

/**
 * Представляет параметр телеграммы.
 */
export class TelegramParameterModel {
    constructor(
        /**
         * Возвращает идентификатор.
         */
        readonly id: string,
        /**
         * Возвращает наименование.
         */
        readonly name: string,
        /**
         * Возвращает метаданные типа.
         */
        readonly typeMetadata: DetailedTypeMetadataModel,
    ) {}
}
