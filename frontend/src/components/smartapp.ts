import { Bridge as bridge } from '@expressms/smartapp-sdk';

type FetchOptions = {
	params?: Record<string, unknown>;
} & RequestInit

const BASE_URL = "api/v1/scada/"; // "/api" // prod

const isNil = (val: unknown) => val === undefined || val === null;

const buildSearchParams = (
	params: Record<string, unknown>,
): URLSearchParams => {
	const searchParams = new URLSearchParams();

	for (const [key, value] of Object.entries(params)) {
		if (isNil(value)) continue;
		searchParams.append(key, String(value));
	}

	return searchParams;
};

export const requestViaBridge = async (requestUrl: string) => {
	const response = await bridge?.sendBotEvent({
    method: `${'GET'} ${BASE_URL}${requestUrl}`,
    params: {},
  }).then(resp => {
    // console.log('resp', resp);
    return resp;
  }).catch(e => {
    // console.log(e);
    return Promise.reject(e);
  });

  // @ts-ignore
  if (!response || response?.payload?.status !== 'success') {
    throw new Error(`Response ${response}`);
  }

  // console.log('response', (response.payload as any)?.data);
  // @ts-ignore
  return response.payload?.data as T;
}

/**
 * используется в DEV режиме, так как нет доступа к bridge для отправки запросов через бота.
 */
const requestViaFetch = async (requestUrl: string, fetchOptions: FetchOptions = {}) => {
  const response = await fetch(`${BASE_URL}${requestUrl}`, {
    ...fetchOptions,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const a = await response.json();

  return a
}

const fetchApi = async <T>(url: string, options: FetchOptions = {}): Promise<T> => {
	const { params, ...fetchOptions } = options;

	const queryParams = params ? buildSearchParams(params).toString() : null;
	const requestUrl = queryParams ? `${url}?${queryParams}` : url;

	return true
    ? requestViaFetch(requestUrl, fetchOptions)
    : requestViaBridge(requestUrl)
};

export const get = <T>(url: string, params?: Record<string, unknown>): Promise<T> => {
	return fetchApi(url, { params, method: 'GET' });
};
