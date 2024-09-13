import { getRoutePathNotAllowed } from '@/6_shared/lib/reactRouter';
import { FC, ReactElement, Suspense } from 'react';
import { Await, Navigate, Outlet, useLoaderData } from 'react-router-dom';
import { AllowedHuidResponse } from '../model/types';

type Props = {
	LoadingComponent: ReactElement;
};

export const ProtectedRoutsPage: FC<Props> = ({ LoadingComponent }) => {
	const { allowedObjectPromise } = useLoaderData() as {
		allowedObjectPromise: Promise<AllowedHuidResponse>;
	};

	return (
		<Suspense fallback={LoadingComponent}>
			<Await
				resolve={allowedObjectPromise}
				errorElement={<div className='text-white'>errorElement</div>}
			>
				{(result) =>
					result.allowed ? (
						<Outlet />
					) : (
						<Navigate to={getRoutePathNotAllowed()} replace />
					)
				}
			</Await>
		</Suspense>
	);
};
