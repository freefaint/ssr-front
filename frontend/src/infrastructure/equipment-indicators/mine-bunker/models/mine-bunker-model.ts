import Decimal from 'decimal.js';

/**
 * Представляет данные бункера рудника.
 */
export class MineBunkerModel {
    /**
     * @param weight Значение массы бункера.
     * @param measureUnit Единицы измерения.
     */
    constructor(readonly weight: Decimal, readonly measureUnit: string) {}
}
