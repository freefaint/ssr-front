import { get } from '@/6_shared/api';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import {
	SinteringMachineChartResponse,
	WorkshopResponse,
} from '../model/types';
import { REFETCH_INTERVAL, STALE_TIME } from '@/6_shared/lib/reactQuery/consts';

const createSelectorWorkshopById =
	(plantId: number) => (furnaces: WorkshopResponse[]): WorkshopResponse => {
		return furnaces.find(
			(furnace) => furnace.plantId === plantId,
		) as WorkshopResponse;
	};

export const useWorkshopsListQuery = <T>(
	select?: (workshopsList: WorkshopResponse[]) => T,
): UseQueryResult<T, Error> =>
	useQuery({
		queryKey: ['WorkshopsList'],
		queryFn: () => get<WorkshopResponse[]>('/v_agp_state'),
		select,
		refetchInterval: REFETCH_INTERVAL,
		staleTime: STALE_TIME,
	});

export const useWorkshopQuery = (plantId: number) => {
	const selectWorkshopById = createSelectorWorkshopById(plantId);
	return useWorkshopsListQuery(selectWorkshopById);
};

export const useSinteringMachineChartListQuery = (id: number) =>
	useQuery({
		queryKey: ['SinteringMachineChartList', id],
		queryFn: () =>
			get<SinteringMachineChartResponse[]>(
				`/v_smartapp_agp_graph?field=eq.${id}`,
			),
		refetchInterval: REFETCH_INTERVAL,
		staleTime: STALE_TIME,
	});
