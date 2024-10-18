/**
 * Запускает таймер, при истечении времени которого завершается Promise.
 * @param ms Время в миллисекундах.
 */
export function Delay(ms: number = 1000): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
