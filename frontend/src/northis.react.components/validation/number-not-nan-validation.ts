/**
 * Проверяет, что значение является числом, если оно не пустое (null и undefined игнорируются). Необходимо для проверки всех чисел
 * которые используются с NumericTextField.
 */
export function numberNotNanValidation(value: number | undefined | null) {
    return Number.isNaN(value) ? 'Не является числом' : true;
}
