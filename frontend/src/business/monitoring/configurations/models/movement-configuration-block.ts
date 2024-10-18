/**
 * Представляет часть конфигурации, отвечающую за положение подъемника.
 */
export class MovementConfigurationBlock {
    /**
     * @param leftDepthParamId Идентификатор параметра для глубины левой части подъемника.
     * @param rightDepthParamId Идентификатор параметра для глубины правой части подъемника.
     * @param leftDepthMin Минимальная глубина левой части подъемника.
     * @param leftDepthMax Максимальная глубина левой части подъемника.
     * @param leftDepthInvert Определяет, какое из значений, минимальное или максимальное, считается верхней точкой левой части подъемника.
     * По умолчанию верх это минимальное значение, дно это максимальное, если истина, то верхней точкой становится максимальное значение.
     * @param rightDepthMin Минимальная глубина правой части подъемника.
     * @param rightDepthMax Максимальная глубина правой части подъемника.
     * @param rightDepthInvert Определяет, какое из значений, минимальное или максимальное, считается верхней точкой правой части подъемника.
     * По умолчанию верх это минимальное значение, а дно это максимальное, если истина, то верхней точкой становится максимальное значение.
     * @param speedParamId Идентификатор параметра для скорости подъемника.
     */
    constructor(
        readonly leftDepthParamId: string | undefined,
        readonly rightDepthParamId: string | undefined,
        readonly leftDepthMin: number | undefined,
        readonly leftDepthMax: number | undefined,
        readonly leftDepthInvert: boolean | undefined,
        readonly rightDepthMin: number | undefined,
        readonly rightDepthMax: number | undefined,
        readonly rightDepthInvert: boolean | undefined,
        readonly speedParamId: string | undefined,
    ) {}
}
