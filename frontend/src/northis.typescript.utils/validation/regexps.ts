/**
 * Регулярное выражение для исключения соответствия нахождения спецсимволов.
 */
export const specialCharacterRegex = /([^<>()[\]\\%$*&^#={}|\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)$/;
/**
 * Регулярное выражение для ввода неотрицательных целых чисел.
 */
export const notNegativeIntegerRegex = /^[0-9]+$/;

/**
 * Регулярное выражение для определения целого числа.
 */
export const integerRegex = /^-?\d+$/;
/**
 * Регулярное выражение для определения части целого числа.
 */
export const partialIntegerRegex = /^-?\d*$/;
/**
 * Регулярное выражение для чисел.
 */
export const numericRegex = /^-?\d+\.?\d*$/;
/**
 * Регулярное выражение для определения части числа.
 */
export const partialNumericRegexp = /^-?\d*[.]?\d*$/
/**
 * Регулярное выражение для нахождения первых нулей в строке.
 */
export const zeroFirstRegex = /^0+(?!$)/;
/**
 * Регулярное выражение для нахождения первого хеш-символа в строке.
 */
export const hashStartRegex = /^#/;
/**
 * Регулярное выражение для исключения латинских символов ввода для хеш-кода.
 */
export const notLatinRegex = /[^a-fA-F0-9#]+/;
