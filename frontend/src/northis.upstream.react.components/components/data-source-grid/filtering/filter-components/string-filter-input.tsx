import TextField from '@mui/material/TextField';

/**
 * Представляет поле ввода значения фильтра для строк.
 */
export function StringFilterInput(props: {
    /**
     * Значение фильтра.
     */
    value: string | null;
    /**
     * Делегат, вызываемый при изменении значения фильтра.
     */
    readonly onValueChange: (newValue: string) => void;
}) {
    const {value, onValueChange} = props;
    return (
        <>
            <TextField
                autoFocus
                size={'small'}
                value={value ?? ''}
                onChange={(e) => onValueChange(e.target.value)}
                label="Значение фильтра"
                fullWidth
                variant="filled"
            />
        </>
    );
}
