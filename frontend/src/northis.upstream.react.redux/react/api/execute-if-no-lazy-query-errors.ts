/**
 * Выполняет функцию onSuccess, если в результате выполнения lazy-запроса не возникла ошибка.
 * @param request Запрос, который необходимо выполнить.
 * @param onSuccess Функция, которую необходимо выполнить в случае отсутствия ошибки.
 */
// TODO: Это было взято из ExecuteIfNoRequestErrors. Оригинальный метод написан для мутаций, для lazyQuery не подходит
//  по типу "request: () => Promise<any>", поэтому используется any. Сделать строгий тип.
export async function ExecuteIfNoLazyQueryErrors<TData>(request: () => Promise<any>, onSuccess: (data: TData) => void) {
    const queryResult = await request();
    if (!('error' in queryResult)) {
        onSuccess(queryResult.data as TData);
    }
}
