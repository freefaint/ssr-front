import {
	SinteringMachine,
	WorkshopMetricsCard,
	workshopApi,
	workshopConsts,
	workshopUtils,
} from '@/5_entities/workshop';
import { IcoArrowLeft } from '@/6_shared/assets/icons';
import { getRoutePathWorkshopsList } from '@/6_shared/lib/reactRouter';
import { Title } from '@/6_shared/ui/title';
import { Link, useParams, ScrollRestoration } from 'react-router-dom';
import {
	indicatorColorView,
	lineIndicatorWorkshopMetricViews,
	workshopMetricViews,
} from '../model/renders';
import { getLineIndicatorMetric } from '../model/utils';
import { skeletonConfig } from '@/6_shared/lib/skeletonMammoth';

const WorkshopDetailsPage = () => {
	const { id } = useParams();
	const workshopId = id ? Number(id) : 0;

	const { data: workshop = workshopConsts.PLACEHOLDER_WORKSHOP, isFetching } =
		workshopApi.useWorkshopQuery(workshopId);

	const loadingClass = isFetching ? 'sm-loading' : '';

	return (
		<div
			className={`grid gap-4 ${loadingClass}`}
			data-sm-config={skeletonConfig}
		>
			<ScrollRestoration />

			<div className='grid gap-2'>
				<Link to={getRoutePathWorkshopsList()}>
					<IcoArrowLeft className='text-white' />
				</Link>

				<Title size='lg' weight='semibold'>
					АГЦ <span className='sm-item-primary'>{workshop.plantId}</span>
				</Title>

				{lineIndicatorWorkshopMetricViews.map(({ metricName, view }) => {
					return (
						<WorkshopMetricsCard.LineIndicator
							{...getLineIndicatorMetric(workshop[metricName], view)}
							key={metricName}
							statusColor={workshopUtils.getColorStatusByState(
								workshop[metricName].state,
							)}
							indicatorColors={indicatorColorView[metricName]}
						/>
					);
				})}

				<div className='grid gap-px'>
					{workshopMetricViews.map(({ metricName, view }) => {
						return (
							<WorkshopMetricsCard.FullMetrics
								key={metricName}
								title={view.title}
								subtitle={view.subtitle}
								value={workshop[metricName]}
								unit={view.unit}
								className='sm-item-secondary'
							/>
						);
					})}
				</div>
			</div>

			{workshop.sinterInWork.map((sinterMachine) => {
				return (
					<SinteringMachine
						key={sinterMachine.field}
						isLoading={isFetching}
						{...sinterMachine}
					/>
				);
			})}
		</div>
	);
};

export default WorkshopDetailsPage;
