import {Skeleton} from '@mui/material';
import {ComponentProps} from 'react';

/**
 * Представляет свойства компонентов скелетонов передаваемые напрямую mui компоненту Skeleton.
 */
export type SkeletonPassthroughProps = Pick<ComponentProps<typeof Skeleton>, 'variant' | 'className' | 'children'>;
