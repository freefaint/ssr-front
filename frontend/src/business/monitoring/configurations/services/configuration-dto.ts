/**
 * Представляет dto для конфигурации элементов главного экрана.
 */
export interface ConfigurationDto {
    /**
     * Возвращает идентификатор элемента, к которому привязана конфигурация.
     */
    readonly id: string;
    /**
     * Возвращает данные конфигурации (в виде строки JSON).
     */
    readonly configurationData: string;
}
