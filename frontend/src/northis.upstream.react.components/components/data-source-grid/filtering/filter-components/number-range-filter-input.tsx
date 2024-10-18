import {NumericTextField} from 'northis.react.components';
import {useState} from 'react';
import {NumberRange} from '../models/value-range';


/**
 * Представляет поле ввода значения фильтра для диапазона чисел.
 */
export function NumberRangeFilterInput(props: {
    /**
     * Значение фильтра.
     */
    readonly value: NumberRange | null | undefined;
    /**
     * Делегат, вызываемый при изменении значения фильтра.
     */
    readonly onValueChange: (result: NumberRange) => void;
}) {
    const {value, onValueChange} = props;
    const [minValue, setMinValue] = useState<number | null>(value?.minValue ?? null);
    const [maxValue, setMaxValue] = useState<number | null>(value?.maxValue ?? null);

    function onChanged(minValuePart: number | null, maxValuePart: number | null) {
        setMinValue(minValuePart);
        setMaxValue(maxValuePart);
        onValueChange({minValue: minValuePart, maxValue: maxValuePart});
    }

    return (
        <div className={'dataRangeContainer'}>
            <NumericTextField
                size={'small'}
                value={minValue}
                label="Значение от"
                fullWidth
                variant="filled"
                onChange={(changed) => {
                    onChanged(changed, maxValue);
                }}
            />
            <span className={'separator'}>-</span>
            <NumericTextField
                size={'small'}
                value={maxValue}
                label="Значение до"
                fullWidth
                variant="filled"
                onChange={(changed) => {
                    onChanged(minValue, changed);
                }}
            />
        </div>
    );
}

/**
 * Регулярное выражение, проверяющее строку на строгое соответствие числу.
 */
const validNumberRegexp = /^[-]?\d+([.]\d+)?$/;
