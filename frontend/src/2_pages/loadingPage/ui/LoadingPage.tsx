import { IcoSpinner } from '@/6_shared/assets/icons';

export const LoadingPage = ({ children }: { children?: React.ReactNode }) => {
	return (
		<div className='flex justify-center items-center h-screen bg-black'>
			<div className='flex justify-center flex-col items-center'>
				{children}
				<IcoSpinner className='w-8 h-8 mr-2 animate-spin text-gray fill-blue' />
			</div>
		</div>
	);
};
