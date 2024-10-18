/**
 * Представляет свойства компонента страницы ошибок получаемых из приложения.
 */
export interface ErrorPageAppProps {
    /**
     * Возвращает путь для перехода на главную страницу.
     */
    readonly rootPath: string;
    /**
     * Возвращает полное имя приложения.
     */
    readonly appName: string;
}
