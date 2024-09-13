import { Title } from '@/6_shared/ui/title';
import { Text } from '@/6_shared/ui/text';
import { SinterInWork } from '../model/types';
import { IcoSinteringMachine } from '@/6_shared/assets/icons';
import { getColorStatusByState } from '../model/utils';
import { WorkshopMetricsCard } from './WorkshopMetricsCard';
import { sinteringMachineMetricsViews } from '../model/renders';
import { useSinteringMachineChartListQuery } from '../api';
import { SinteringMachineChart } from './SinteringMachineChart';
import {
	SINTERING_MACHINE_CHART_PLACEHOLDER_DATA,
	SINTERING_MACHINE_METRICS,
	StatusColor,
} from '../model/consts';
import { Accordion } from '@/6_shared/ui/accordion';
import { skeletonConfig } from '@/6_shared/lib/skeletonMammoth';

type Props = SinterInWork & { isLoading: boolean };

export const SinteringMachine: React.FC<Props> = ({
	state,
	field,
	isLoading,
	...sinteringMachineMetric
}) => {
	const {
		data: chartList = SINTERING_MACHINE_CHART_PLACEHOLDER_DATA,
		isFetching: isChartFetching,
	} = useSinteringMachineChartListQuery(field);

	const loadingClass = isChartFetching ?? isLoading ? 'sm-loading' : '';

	return (
		<div
			className={`grid gap-4 ${loadingClass}`}
			data-sm-config={skeletonConfig}
		>
			<div className='grid grid-cols-chart-2 gap-1'>
				<div className='grid gap-1 col-span-2'>
					<Text color='gray' className='ml-24'>
						{SINTERING_MACHINE_METRICS.speedAm.title}{' '}
						{SINTERING_MACHINE_METRICS.speedAm.subtitle},{' '}
						{SINTERING_MACHINE_METRICS.speedAm.unit}
					</Text>
				</div>

				<div className='relative mt-6'>
					<IcoSinteringMachine
						className={`text-${getColorStatusByState(state)} sm-item-secondary`}
					/>

					<Title
						size='md'
						color='white'
						weight='semibold'
						className='absolute top-8 left-7'
					>
						<span className='sm-item-secondary'>АМ {`${field}`}</span>
					</Title>
				</div>

				<SinteringMachineChart
					chart={chartList}
					isLoading={isChartFetching}
					statusColor={getColorStatusByState(state)}
					metricNames={[SINTERING_MACHINE_METRICS.speedAm.field]}
				/>
			</div>

			<div className='grid gap-px'>
				{sinteringMachineMetricsViews.map(
					({ field, subtitle, title, unit }) => {
						if (field === SINTERING_MACHINE_METRICS.lev.field) {
							return (
								<WorkshopMetricsCard.FullMetrics
									key={field}
									title={title}
									subtitle={subtitle}
									value={sinteringMachineMetric[field]}
									unit={unit}
									className='pr-6'
								/>
							);
						}

						const statusColor =
							field === SINTERING_MACHINE_METRICS.speedAm.field
								? getColorStatusByState(state)
								: StatusColor.NEUTRAL;

						return (
							<Accordion
								key={field}
								ButtonComponent={
									<WorkshopMetricsCard.FullMetrics
										key={field}
										title={title}
										subtitle={subtitle}
										value={sinteringMachineMetric[field]}
										unit={unit}
										className='pr-0'
										statusColor={statusColor}
									/>
								}
							>
								<SinteringMachineChart
									chart={chartList}
									isLoading={isChartFetching}
									statusColor={getColorStatusByState(state)}
									metricNames={[field]}
								/>
							</Accordion>
						);
					},
				)}
			</div>
		</div>
	);
};
