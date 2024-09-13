import { get } from '@/6_shared/api';
import {
	getRoutePathNotAllowed,
	getRoutePathWorkshopDetailsById,
	getRoutePathWorkshopsList,
} from '@/6_shared/lib/reactRouter';
import { Text } from '@/6_shared/ui/text';
import { Title } from '@/6_shared/ui/title';
import { useMutation } from '@tanstack/react-query';
import { Suspense, lazy, useState } from 'react';
import { Outlet, createHashRouter, useNavigate } from 'react-router-dom';
import { LoadingPage } from './loadingPage/ui/LoadingPage';
import { fetchAuth } from './protectedRoutsPage/api';
import { ProtectedRoutsPage } from './protectedRoutsPage/ui/ProtectedRoutsPage';
import { AllowedHuidResponse } from './protectedRoutsPage/model/types';
export { LoadingPage };

const WorkshopsListPageLazy = lazy(
	async () => import('./workshopsListPage/ui/WorkshopsListPage'),
);

const WorkshopDetailsPageLazy = lazy(
	async () => import('./workshopDetailsPage/ui/WorkshopDetailsPage'),
);

const NotAllowedPageLazy = lazy(
	async () => import('./notAllowedPage/ui/NotAllowedPage'),
);

export const router = createHashRouter([
	{
		path: getRoutePathWorkshopsList(),
		element: (
			<ProtectedRoutsPage
				LoadingComponent={
					<LoadingPage>
						<Title className='mb-4'>Авторизация</Title>
					</LoadingPage>
				}
			/>
		),
		loader: fetchAuth,
		children: [
			{
				path: getRoutePathWorkshopsList(),
				element: (
					<Suspense fallback={<LoadingPage />}>
						<WorkshopsListPageLazy />
					</Suspense>
				),
			},
			{
				path: getRoutePathWorkshopDetailsById(),
				element: (
					<Suspense fallback={<LoadingPage />}>
						<WorkshopDetailsPageLazy />
					</Suspense>
				),
			},
		],
	},
	{
		path: getRoutePathNotAllowed(),
		element: <NotAllowedPageLazy />,
	},
	{
		path: '*',
		element: <div className='text-white'>Not Found</div>,
	},
]);

// TODO: весь код ниже необходимо удалить, после того как на iOS обновят клиент, станет доступен метод requestSelfProfile
const sha256 = async (message: string) => {
	// encode as UTF-8
	const msgBuffer = new TextEncoder().encode(message);

	// hash the message
	const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

	// convert ArrayBuffer to Array
	const hashArray = Array.from(new Uint8Array(hashBuffer));

	// convert bytes to hex string
	const hashHex = hashArray
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
	return hashHex;
};

const setAuth = () =>
	useMutation({
		mutationKey: ['Auth'],
		mutationFn: (hash: string) => {
			return get<AllowedHuidResponse>(`/rpc/check_user_hash_agp?hash=${hash}`);
		},
	});

const SignIn = () => {
	const [isAuth, setIsAuth] = useState(false);
	const navigate = useNavigate();

	const mutation = setAuth();

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = new FormData(e.currentTarget);

		const inputData = Object.fromEntries(form.entries());

		mutation.mutate(
			await sha256(`${inputData.tableNumber}${inputData.pinCode}`),
			{
				onSuccess(data) {
					setIsAuth?.(data.allowed);
					navigate(getRoutePathWorkshopsList());
				},
			},
		);
	};

	return isAuth ? (
		<Outlet />
	) : (
		<div className='flex flex-col mt-16 gap-2 p-6'>
			<Title className='self-center'>Авторизация</Title>
			<Text className='self-center' size='lg' weight='normal' color='steel'>
				Введите табельный номер и PIN-код
			</Text>
			<form className='flex flex-col gap-2 mt-4' onSubmit={handleFormSubmit}>
				<input
					className='bg-zinc text-base px-2 py-3 text-white outline-none'
					name='tableNumber'
					type='number'
					placeholder='Табельный номер'
					required
				/>
				<input
					className='bg-zinc text-base px-2 py-3 text-white outline-none'
					name='pinCode'
					type='password'
					placeholder='PIN-код'
					required
				/>
				<button
					disabled={mutation.isLoading}
					className='bg-blue rounded-sm p-2 mt-4'
					type='submit'
				>
					<Text>ВХОД</Text>
				</button>
			</form>
		</div>
	);
};

export const routerIos = createHashRouter([
	{
		path: getRoutePathWorkshopsList(),
		element: <SignIn />,
		children: [
			{
				path: getRoutePathWorkshopsList(),
				element: (
					<Suspense fallback={<LoadingPage />}>
						<WorkshopsListPageLazy />
					</Suspense>
				),
			},
			{
				path: getRoutePathWorkshopDetailsById(),
				element: (
					<Suspense fallback={<LoadingPage />}>
						<WorkshopDetailsPageLazy />
					</Suspense>
				),
			},
		],
	},
	{
		path: '*',
		element: <div className='text-white'>Not Found</div>,
	},
	{
		path: getRoutePathNotAllowed(),
		element: <NotAllowedPageLazy />,
	},
]);
