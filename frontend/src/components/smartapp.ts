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
export const requestViaFetch = async (requestUrl: string, fetchOptions: FetchOptions = {}) => {
  const response = await fetch(`/api/v2/${requestUrl}`, {
    ...fetchOptions,
    headers: {
      'Authorization': 'Bearer SFMyNTY.g2gDdAAAAAdkAApfX3N0cnVjdF9fZAAhRWxpeGlyLlBsdWcuQ2NzQXV0aC5Vc2VyQXV0aFRva2VuZAAGY3RzX2lkbQAAACQ5MTM5ZDM0MS1lNWUxLTVhMzktOGRlOC03ZjBkODU1NTEyNTlkAAZydHNfaWRkAANuaWxkAAp0b2tlbl9tZXRhdAAAAABkAAR1ZGlkbQAAACRiZGQ3YWEyMy01Y2M4LTUxMzItYjhiMi00MWM1YjU0ZDc4YzJkAAl1c2VyX2h1aWRtAAAAJGJkYTQ1NWU4LWEwYmYtNTlkZS04MDhjLTYwMmE5ZDI1YzI0MWQACXVzZXJfa2luZGQAA25pbG4GAL_asHaSAWIAAVGA.mu2hR_7fgqcr6xZQ7By9LlciDkYgltk0XsfKFERElTk'
    }
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
