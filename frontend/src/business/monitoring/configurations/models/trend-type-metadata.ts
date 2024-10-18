/**
 * Представляет данные о типе тренда.
 */
export interface TrendTypeMetadata {
    /**
     * Возвращает идентификатор типа
     */
    readonly id: string;
    /**
     * Возвращает имя типа.
     */
    readonly displayName: string;
    /**
     * Возвращает набор значений типа в виде пары (значение, название) либо null, если тип - не набор значений.
     */
    readonly values:
        | [
              {
                  value: number;
                  description: string;
              },
          ]
        | null;
}
