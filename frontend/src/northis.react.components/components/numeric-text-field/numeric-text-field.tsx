import {TextField} from '@mui/material';
import {TextFieldProps} from '@mui/material/TextField/TextField';
import {Decimal} from 'decimal.js';
import {hasValue, hasValueNotEmpty, partialNumericRegexp} from 'northis.typescript.utils';
import {ChangeEvent, forwardRef, useEffect, useState} from 'react';

type NumericTextFieldProps = Omit<TextFieldProps, 'value' | 'onChange' | 'ref' | 'defaultValue'> & {
    /**
     * Возвращает значение.
     */
    readonly value?: number | null;
    /**
     * Возвращает делегат, вызываемый при изменении значения.
     */
    readonly onChange?: (changedValue: number | null) => void;
    /**
     * Возвращает один из предзаданных диапазонов доступных значений числа.
     * @default Если не указано, то диапазон не ограничен.
     */
    readonly range?: NumericTextFieldRange;
    /**
     * Возвращает истину, если значениями могут быть только целые числа.
     * @default Если не указано, то используются числа с плавающей точкой.
     */
    readonly integersOnly?: boolean;
    /**
     * Возвращает истину, если требуется не отображать текст ошибки под полем ввода.
     * @default Если не указано, то текст с ошибкой будет отображаться.
     */
    readonly hideErrorText?: boolean;
};

/**
 * Представляет обертку над текстовым полем для работы с числами.
 */
export const NumericTextField = forwardRef<HTMLDivElement, NumericTextFieldProps>(function (props, ref) {
    const {onChange, value, range, integersOnly, hideErrorText = false, ...other} = props;
    const stringValue = toString(value);
    const [visualValue, setVisualValue] = useState<string>(stringValue);
    const visualValueErrorMessage = hideErrorText ? null : getLooseValidationError(visualValue) ?? getStrongValidationError(visualValue);

    useEffect(() => {
        if (!Number.isNaN(value)) {
            // Проверка необходима, т.к. при преобразовании из строки в число и обратно во время ввода теряются десятичные разряды равные
            // 0, что мешает вводить числа типа 2.001.
            if (value !== toNumberOrNull(visualValue)) {
                setVisualValue(stringValue);
            }
        }
        // Возможна ситуация, когда внешнее значение числа равно NaN, но внутреннее представление имеет полностью корректный формат.
        // В результате внешняя валидация покажет ошибку, хотя пользователь будет видеть правильное число. Это возможно только если
        // установить из вне значение NaN, что очень маловероятно. Если все же возникнет подобная ситуация, то ее можно поправить расширив
        // апи, добавив туда строковое значение и ошибку валидации в дополнение к числу.
    }, [value]);

    useEffect(() => {
        const valueIsNotValid = hasValue(getLooseValidationError(stringValue) ?? getStrongValidationError(stringValue));
        // Когда полученное число не соответствует внутренним правилам валидации, необходимо сделать невалидным и внешнее значение.
        // Чтобы внешняя валидация тоже среагировала на ошибки внутренней валидации.
        if (onChange && valueIsNotValid && !Number.isNaN(value)) {
            onChange(Number.NaN);
        }
    }, [value]);

    /**
     * Возвращает сообщение об ошибке, если строка {@link newValue} не удовлетворяет слабым ограничениям, применяемым при блокировке
     * ввода символов.
     * Возвращает null, если строка корректна.
     */
    function getLooseValidationError(newValue: string): string | null {
        if (!hasValueNotEmpty(newValue)) {
            return null;
        }
        if (!newValue.match(partialNumericRegexp)) {
            return wrongFormatMessage;
        }

        if (newValue.includes('-')) {
            if (range === 'positive') {
                return onlyPositiveMessage;
            } else if (range === 'zeroPositive') {
                return negativeValuesProhibitedMessage;
            }
        }
        if (integersOnly && (newValue.includes(',') || newValue.includes('.'))) {
            return integerRequiredMessage;
        }

        return null;
    }

    /**
     * Возвращает сообщение об ошибке, если строка {@link newValue} не удовлетворяет сильным ограничениям, применяемым при определении того,
     * получит ли внешний компонент значение NaN.
     * Возвращает null, если строка корректна.
     */
    function getStrongValidationError(newValue: string): string | null {
        const numberValue = toNumberOrNull(newValue);
        if (!hasValue(numberValue)) {
            return null;
        }
        if (!newValue.match(strongNumberRegex)) {
            return wrongFormatMessage;
        }
        if (Number.isNaN(numberValue)) {
            return wrongFormatMessage;
        }
        const numberAbs = Math.abs(numberValue);
        if (numberAbs > Number.MAX_VALUE) {
            return maxValueExceededMessage;
        }
        if (integersOnly && !Number.isSafeInteger(numberValue)) {
            return maxValueExceededMessage;
        }
        if (numberValue === 0 && range === 'positive') {
            return onlyPositiveMessage;
        }
        return null;
    }

    function onInputChange(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        const inputValue = event.target.value;
        const looseErrorMessage = getLooseValidationError(inputValue);
        if (!hasValue(looseErrorMessage)) {
            setVisualValue(inputValue);
            if (onChange) {
                const strongErrorMessage = getStrongValidationError(inputValue);
                if (hasValue(strongErrorMessage)) {
                    onChange(Number.NaN);
                } else {
                    onChange(toNumberOrNull(inputValue));
                }
            }
        }
    }

    return (
        <TextField
            {...other}
            ref={ref}
            onChange={onInputChange}
            value={visualValue}
            error={hasValue(visualValueErrorMessage) || other.error}
            helperText={hasValue(visualValueErrorMessage) ? visualValueErrorMessage : other.helperText}
        />
    );
});

/**
 * Представляет возможные варианты ограничения диапазона при вводе.
 */
export type NumericTextFieldRange = 'positive' | 'zeroPositive';

function toString(value: number | null | undefined): string {
    if (hasValue(value)) {
        const stringValue = value.toString();
        const numberAbs = Math.abs(value);
        if ((numberAbs > minNumberWithoutScientific && numberAbs < maxNumberWithoutScientific) || numberAbs === 0) {
            return stringValue;
        } else {
            return new Decimal(stringValue).toFixed();
        }
    } else {
        return '';
    }
}

function toNumberOrNull(inputValue: string): number | null {
    if (hasValueNotEmpty(inputValue)) {
        return Number(inputValue);
    }
    return null;
}

/**
 * Максимальное число, при котором значение не приобретает экспоненциальное представление при конвертации в строку.
 * Необходимо, чтобы число можно было конвертировать обратно в строку при редактировании.
 */
const maxNumberWithoutScientific = Math.pow(10, 21);
/**
 * Минимальное число, при котором значение не приобретает экспоненциальное представление при конвертации в строку.
 */
const minNumberWithoutScientific = Math.pow(10, -6);

const negativeValuesProhibitedMessage = 'Отрицательные значения недопустимы';
const integerRequiredMessage = 'Введите целое число';
const maxValueExceededMessage = 'Превышение предельного диапазона числа';
const onlyPositiveMessage = 'Только положительные значения';
const wrongFormatMessage = 'Строка не является числом';
const strongNumberRegex = /^-?\d+(\.\d+)?$/;
