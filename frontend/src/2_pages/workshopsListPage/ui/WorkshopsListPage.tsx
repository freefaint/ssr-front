import {
	Workshop,
	workshopApi,
	workshopConsts,
	workshopTypes,
} from '@/5_entities/workshop';
import { ScrollRestoration } from 'react-router-dom';

const WorkshopsListPage = () => {
	const {
		data: workshopsList = workshopConsts.PLACEHOLDER_WORKSHOP_LIST,
		isFetching,
	} = workshopApi.useWorkshopsListQuery<workshopTypes.WorkshopResponse[]>();

	return (
		<div className='grid gap-y-4 mt-7 text-md text-white'>
			<ScrollRestoration />

			{workshopsList.map((workshop) => {
				return (
					<Workshop
						workshop={workshop}
						isLoading={isFetching}
						key={workshop.plantId}
					/>
				);
			})}
		</div>
	);
};

export default WorkshopsListPage;
