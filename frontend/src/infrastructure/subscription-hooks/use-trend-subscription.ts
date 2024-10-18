import Decimal from 'decimal.js';
import {hasValue} from 'northis.typescript.utils';
import {TrendMessage} from 'northis.upstream.signalr';
import {useEffect, useState} from 'react';
import {CONNECTOR} from '../hub-connector/signal-r-connector-provider';
// import {loggerInstance} from '../logger-instance';
import {parseCommaStringToNumber} from './parse-comma-string-to-number';

/**
 * Хук для получения данных тренда по подписке.
 */
export function useTrendSubscription(trendId: string | undefined) {
    const [trendValue, setTrendValue] = useState<Decimal | undefined>(undefined);

    useEffect(() => {
        try {
            // Перед тем как регистрировать новые обработчики, сбрасываем старые.
            CONNECTOR.unregisterTrendReceiver(onTrendChangedHandler);
            if (hasValue(trendId)) {
                CONNECTOR.registerTrendReceiver(onTrendChangedHandler);
            }
        } catch (e) {
            // loggerInstance.error('Ошибка при подписке на обновления для элемента', e);
        }

        return () => {
            CONNECTOR.unregisterTrendReceiver(onTrendChangedHandler);
        };
    }, [trendId]);

    function onTrendChangedHandler(data: TrendMessage) {
        if (data.trendId === trendId) {
            if (hasValue(data.value)) {
                // Мы ожидаем, что строка будет иметь вид "число с точкой".
                // В каких-то случаях приходит "число с запятой", поэтому пытаемся привести получаемое значение в нужный вид.
                const parsedValue = parseCommaStringToNumber(data.value);
                setTrendValue(hasValue(parsedValue) ? new Decimal(parsedValue) : undefined);
            } else {
                // data.value может быть null, если значения тренда нет.
                setTrendValue(undefined);
            }
        }
    }

    return trendValue;
}
