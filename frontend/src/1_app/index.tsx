import { LoadingPage, router, routerIos } from '@/2_pages';
import { Title } from '@/6_shared/ui/title';
import { ready, useQuery } from '@expressms/smartapp-sdk';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import 'skeleton-mammoth/dist/skeleton-mammoth.min.css';
import './index.css';
import { withProviders } from './providers';

export const App = () => {
	// TODO: проверку платформы с помощью хука useQuery, routerIos необходимо удалить, после того как на iOS обновят клиент, станет доступен метод requestSelfProfile
	const urlParams = useQuery();
	const isIosPlatform =
		urlParams?.platform === '---';

	useEffect(() => {
		ready();
	}, []);

	return (
		<div className='p-4 min-h-screen bg-black'>
			<RouterProvider
				router={isIosPlatform ? routerIos : router}
				fallbackElement={
					<LoadingPage>
						<Title className='mb-4'>
							Произошла ошибка авторизации. Попробуйте повторить действия
							сначала.
						</Title>
					</LoadingPage>
				}
			/>
		</div>
	);
};

export default withProviders(App);
