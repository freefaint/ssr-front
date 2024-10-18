import {ElementTypes} from './elements/element-types/element-types';

/**
 * Представляет базовую конфигурацию элемента главного экрана.
 */
export abstract class ElementConfigurationBase {
    protected constructor(
        /**
         * Возвращает текущую версию конфигурации.
         */
        readonly version: number | undefined,
        /**
         * Возвращает идентификатор элемента.
         */
        readonly elementId: string,
        /**
         * Возвращает тип элемента.
         */
        readonly elementType: ElementTypes,
        /**
         * Возвращает отображаемое имя элемента.
         */
        readonly displayName: string,
    ) {}
}
