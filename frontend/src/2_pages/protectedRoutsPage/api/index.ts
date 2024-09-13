import { get } from '@/6_shared/api';
import { IS_DEV } from '@/6_shared/consts/env';
import { requestSelfProfile } from '@expressms/smartapp-sdk';
import { defer } from 'react-router-dom';
import { AllowedHuidResponse, ProfileResponse } from '../model/types';

/**
 * имитирует авторизацию так как в DEV режиме нет доступа к профилю пользователя и huid в нем.
 */
const getFakeAllowedObjectPromise = async () => {
	const allowedObjectPromise = new Promise((resolve) => {
		setTimeout(() => resolve({ allowed: true }), 300);
	});

	return defer({ allowedObjectPromise });
};

const getAllowedObjectPromise = async () => {
	const profileData = (await requestSelfProfile()) as ProfileResponse;
	const huid = profileData.payload.data.userHuid;

	const allowedObjectPromise = get<AllowedHuidResponse>(
		`/rpc/check_user_agp?huid=${huid}`,
	);

	return defer({ allowedObjectPromise });
};

export const fetchAuth = IS_DEV
	? getFakeAllowedObjectPromise
	: getAllowedObjectPromise;
