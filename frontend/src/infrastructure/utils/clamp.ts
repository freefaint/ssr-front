/**
 * Возвращает значение {@link value}, если оно попадает в диапазон, или возвращает границу, если оно за нее выходит.
 * @param value Проверяемое значение.
 * @param min Нижняя граница диапазона.
 * @param max Верхняя граница диапазона.
 */
export function clamp(value: number, min: number, max: number) {
    return Math.max(Math.min(value, max), min);
}
