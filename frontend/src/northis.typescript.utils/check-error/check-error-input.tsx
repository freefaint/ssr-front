/**
 * Проверяет отсутствие спецсимволов во входной строке.
 * @param value Входная строка.
 * @param regex Регулярное выражение для исключения соответствия нахождения спецсимволов.
 * @param textError Текст ошибки.
 * @param onHasError Коллбэк наличия ошибки.
 * @param onNameError Коллбэк текста ошибки.
 */
export function CheckTextErrorInput(
    value: string,
    regex: RegExp,
    textError: string,
    onHasError: (value: boolean) => void,
    onNameError: (value: string) => void,
) {
    if (value.match(regex) || value === '') {
        onHasError(false);
        onNameError('');
    } else {
        onHasError(true);
        onNameError(textError);
    }
}
