import {Chip} from '@mui/material';
import classNames from 'classnames';
import {ReactNode} from 'react';
import {ClassNameProps} from 'northis.react.components';

// @ts-ignore
import {ReactComponent as CloseChipIcon} from '../../assets/svg/close-chip_ic.svg';

/**
 * Представляет компонент списка чипов.
 * @typeParam R Тип отображаемых моделей.
 */
function ChipsList<R>(
    props: ClassNameProps & {
        /**
         * Возвращает список отображаемых моделей.
         */
        readonly list: readonly R[];
        /**
         * Возвращает делегат отрисовки надписи чипа.
         */
        readonly renderChipLabel: (item: R, index: number) => ReactNode;
        /**
         * Возвращает делегат обработки удаления элемента списка.
         */
        readonly onRemoveItem: (item: R, index: number) => void;
        /**
         * Возвращает делегат обработки удаления всех элементов списка.
         */
        readonly onRemoveAllItems: () => void;
    },
) {
    const {list, renderChipLabel, onRemoveAllItems, onRemoveItem, className} = props;
    return list.length > 0 ? (
        <div className={classNames('chipsListRoot', className)}>
            {list.map((item, index) => {
                return (
                    <Chip
                        deleteIcon={
                            <span className={'chipDeleteIconSvg'}>
                                <CloseChipIcon />
                            </span>
                        }
                        className={'chipRoot'}
                        key={index}
                        label={renderChipLabel(item, index)}
                        onDelete={() => onRemoveItem(item, index)}
                    />
                );
            })}
            <div
                className={'chipClearButton'}
                onClick={onRemoveAllItems}>
                Очистить
            </div>
        </div>
    ) : null;
}

export default ChipsList;
