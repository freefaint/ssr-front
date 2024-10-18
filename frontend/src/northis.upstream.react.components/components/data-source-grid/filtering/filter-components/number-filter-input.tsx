import {ClassNameProps, NumericTextField, NumericTextFieldRange} from 'northis.react.components';


/**
 * Представляет поле ввода числового значения фильтра.
 */
export function NumberFilterInput(
    props: ClassNameProps & {
        /**
         * Значение фильтра.
         */
        readonly value: number | null | undefined;
        /**
         * Делегат, вызываемый при изменении значения фильтра.
         */
        readonly onValueChange: (result: number | null) => void;
        /**
         * Возвращает один из предзаданных диапазонов доступных значений числа.
         * @default Если не указано, то диапазон не ограничен.
         */
        readonly range?: NumericTextFieldRange | undefined;
        /**
         * Возвращает истину, если значениями могут быть только целые числа.
         * @default Если не указано, то используются числа с плавающей точкой.
         */
        readonly integersOnly?: boolean | undefined;
    },
) {
    const {value, onValueChange, className, range, integersOnly} = props;

    return (
        <NumericTextField
            size={'small'}
            value={value}
            label="Значение фильтра"
            fullWidth
            variant="filled"
            onChange={(value) => {
                onValueChange(value);
            }}
            className={className}
            autoFocus
            range={range}
            integersOnly={integersOnly}
        />
    );
}
