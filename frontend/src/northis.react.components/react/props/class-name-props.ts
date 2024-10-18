import {HTMLAttributes} from 'react';

/**
 * Позволяет передавать {@link HTMLAttributes.className} вложенному элементу компонента.
 */
export type ClassNameProps = Pick<HTMLAttributes<unknown>, 'className'>;
