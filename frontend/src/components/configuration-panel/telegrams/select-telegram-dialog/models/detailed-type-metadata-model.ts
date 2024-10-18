import {NumericValueTypes} from '../../../trends/models/numeric-value-types';

/**
 * Представляет детализированные данные о типе.
 */
export class DetailedTypeMetadataModel {
    /**
     * @param id Идентификатор типа.
     * @param displayName Отображаемое имя.
     * @param onNumeric Данные числового типа, либо null если это словарный тип.
     * @param onValueSet Данные словарного типа, либо null если это числовой тип.
     */
    constructor(
        readonly id: string,
        readonly displayName: string,
        readonly onNumeric: NumericTypeData | null,
        readonly onValueSet: ValueSetTypeData | null,
    ) {}
}

/**
 * Представляет данные числового типа.
 */
export class NumericTypeData {
    /**
     * @param valueType Тип числового значения.
     * @param measure Единицы измерения.
     */
    constructor(readonly valueType: NumericValueTypes, readonly measure: string) {}
}

/**
 * Представляет данные словарного типа.
 */
export class ValueSetTypeData {
    /**
     * @param values
     */
    constructor(readonly values: {readonly value: number; readonly description: string}[]) {}
}
