import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {ClassNameProps} from 'northis.react.components';

/**
 * Представляет поле выбора строкового значения фильтра из списка допустимых вариантов.
 */
export function StringSelectFilterInput<
    T extends {
        toString(): string;
    },
>(
    props: ClassNameProps & {
        /**
         * Возвращает значение фильтра.
         */
        value: T | null;
        /**
         * Возвращает делегат, вызываемый при изменении значения фильтра.
         */
        readonly onValueChange: (newValue: T) => void;
        /**
         * Возвращает допустимые варианты для значения фильтра.
         */
        readonly options: readonly T[];
        /**
         * Возвращает строковое представление для отображения.
         */
        readonly getLabel?: (value: T) => string;
    },
) {
    const {value, onValueChange, options, getLabel = (value) => value.toString(), className} = props;

    return (
        <FormControl
            variant="filled"
            fullWidth
            size={'small'}>
            <InputLabel>Значение фильтра</InputLabel>
            <Select
                value={value !== null ? value : ''}
                onChange={(event: SelectChangeEvent<T>) => onValueChange(event.target.value as T)}
                renderValue={(v) => getLabel(v)}>
                {options.map((option) => (
                    <MenuItem value={`${option}`}>
                        <span className={className}>{getLabel(option)}</span>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
