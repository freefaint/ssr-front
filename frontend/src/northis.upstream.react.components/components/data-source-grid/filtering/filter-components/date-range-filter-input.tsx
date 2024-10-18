import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterLuxon} from '@mui/x-date-pickers/AdapterLuxon';
import {ruRU} from '@mui/x-date-pickers/locales';
import classNames from 'classnames';
import {DateTime} from 'luxon';
import {useState} from 'react';
import {DateRange} from '../models/value-range';

import {hasValueNotEmpty} from 'northis.typescript.utils';

/**
 * Представляет поле ввода значения фильтра для диапазона дат.
 */
export function DateRangeFilterInput(props: {
    /**
     * Значение фильтра.
     */
    readonly value: DateRange | null | undefined;
    /**
     * Делегат, вызываемый при изменении значения фильтра.
     */
    readonly onValueChange: (newRange: DateRange) => void;
    /**
     * Возвращает текст ошибки для значения начальной даты.
     */
    readonly startDateErrorMessage?: string | null;
    /**
     * Возвращает текст ошибки для значения конечной даты.
     */
    readonly endDateErrorMessage?: string | null;
}) {
    const {value, onValueChange, startDateErrorMessage, endDateErrorMessage} = props;
    const [startDate, setStartDate] = useState<DateTime | null>(value?.minValue ?? null);
    const [endDate, setEndDate] = useState<DateTime | null>(value?.maxValue ?? null);

    function onDateChanged(leftPart: DateTime | null, rightPart: DateTime | null) {
        setStartDate(leftPart ?? null);
        setEndDate(rightPart ?? null);
        onValueChange({minValue: leftPart, maxValue: rightPart});
    }

    return (
        <LocalizationProvider
            localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
            dateAdapter={AdapterLuxon}
            adapterLocale={'ru-RU'}>
            <div className={'dataRangeContainer'}>
                <DateTimePicker
                    label={'Дата начала'}
                    className={classNames('inputWithHelpText', 'filledInput')}
                    value={startDate}
                    onChange={(date: DateTime | null) => {
                        onDateChanged(date, endDate);
                    }}
                    slotProps={{
                        textField: {
                            variant: 'filled',
                            size: 'small',
                            helperText: startDateErrorMessage,
                            error: hasValueNotEmpty(startDateErrorMessage),
                        },
                    }}
                />
                <span className={'separator'}>-</span>
                <DateTimePicker
                    label={'Дата конца'}
                    className={classNames('inputWithHelpText', 'filledInput')}
                    value={endDate}
                    onChange={(date: DateTime | null) => {
                        onDateChanged(startDate, date);
                    }}
                    slotProps={{
                        textField: {
                            variant: 'filled',
                            size: 'small',
                            helperText: endDateErrorMessage,
                            error: hasValueNotEmpty(endDateErrorMessage),
                        },
                    }}
                />
            </div>
        </LocalizationProvider>
    );
}
