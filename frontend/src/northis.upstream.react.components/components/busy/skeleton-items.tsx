import {Skeleton} from '@mui/material';
import classNames from 'classnames';
import {SkeletonPassthroughProps} from './skeleton-passthrough-props';


/**
 * Представляет скелетон набора элементов.
 */
export function SkeletonItems(
    props: SkeletonPassthroughProps & {
        /**
         * Возвращает истину, если нужно отображать скелетон вместо данных.
         */
        readonly isBusy: boolean;
        /**
         * Возвращает высоту одного элемента в px.
         */
        readonly itemHeight?: number;
        /**
         * Возвращает ширину одного элемента в процентах.
         */
        readonly itemWidth?: number;
        /**
         * Возвращает класс одного элемента.
         */
        readonly itemClassName?: string;
        /**
         * Возвращает количество элементов.
         */
        readonly count?: number;
        /**
         * Возвращает класс контейнера элементов.
         */
        readonly itemContainerClassName?: string;
    },
) {
    const {
        isBusy,
        itemHeight = 48,
        itemWidth = 100,
        itemClassName = 'skeletonItem',
        count = 1,
        itemContainerClassName = 'skeletonItemsContainer',
    } = props;

    function getSkeletonItem(index: number) {
        return (
            <Skeleton
                key={index}
                animation="wave"
                height={`${itemHeight}px`}
                width={`${itemWidth}%`}
                className={itemClassName}
                variant={props.variant ?? 'rounded'}
            />
        );
    }

    function getSkeletonItems() {
        const items = [];
        for (let i = 0; i < count; i++) {
            items.push(getSkeletonItem(i));
        }
        return items;
    }

    if (isBusy) {
        if (count === 1) {
            return getSkeletonItem(0);
        } else {
            return <div className={classNames(itemContainerClassName, props.className)}>{getSkeletonItems()}</div>;
        }
    } else {
        return <>{props.children}</>;
    }
}
