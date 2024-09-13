import { getRoutePathWorkshopDetailsById } from '@/6_shared/lib/reactRouter';
import { skeletonConfig } from '@/6_shared/lib/skeletonMammoth';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { WorkshopResponse } from '../../model/types';
import { getColorStatusByState } from '../../model/utils';
import { WorkshopMetricsCard } from '../WorkshopMetricsCard';
import { HeaderPrimary } from './HeaderPrimary';
import { HeaderSecondary } from './HeaderSecondary';
import { Section } from './Section';
import { renderSinterInWorkSectionStubs } from './renderSinterInWorkSectionStubs';

type Props = {
	workshop: WorkshopResponse;
	isLoading: boolean;
};

export const Workshop: FC<Props> = ({ workshop, isLoading }) => {
	const {
		basicity1,
		fe,
		sinterInWork,
		sinterSieve,
		matsSieve,
		sinterReturn,
		ironRaw,
		consumptionLimits,
		plantId,
		batch
	} = workshop;

	const loadingClass = isLoading ? 'sm-loading' : '';
	const linkDisabledClass = isLoading ? 'pointer-events-none' : '';

	return (
		<Link
			to={getRoutePathWorkshopDetailsById(plantId)}
			data-sm-config={skeletonConfig}
			className={`grid gap-px grid-cols-64 rounded-md overflow-auto ${loadingClass} ${linkDisabledClass}`}
		>
			<Section className='grid-cols-2 col-span-44'>
				<HeaderPrimary order='1' className='col-span-2 px-3'>
					АГЦ-<span className='sm-item-primary'>{plantId}</span>
				</HeaderPrimary>

				<WorkshopMetricsCard.StandardMark
					value={basicity1.value}
					title='CaO/SiO2'
					statusColor={getColorStatusByState(basicity1.state)}
				/>

				<WorkshopMetricsCard.StandardMark
					value={fe.value}
					title='Fe'
					statusColor={getColorStatusByState(fe.state)}
				/>
			</Section>

			<Section className='grid-cols-2 row-span-2 col-span-20'>
				<HeaderPrimary size='md' className='col-span-2 px-2 justify-center'>
					А/М в работе
				</HeaderPrimary>

				{sinterInWork.map(({ field, state }) => {
					return (
						<WorkshopMetricsCard.SimpleMark
							key={field}
							value={field}
							statusColor={getColorStatusByState(state)}
						/>
					);
				})}

				{sinterInWork.length
					? renderSinterInWorkSectionStubs(sinterInWork.length)
					: null}
			</Section>

			<Section className='grid-cols-3 col-span-44'>
				<HeaderSecondary className='col-span-3'>
					Рассев агломерата
				</HeaderSecondary>

				{sinterSieve.map(({ field, value }) => {
					return (
						<WorkshopMetricsCard.Column
							key={field}
							value={value}
							title={field}
						/>
					);
				})}
			</Section>

			<Section className='col-span-32'>
				<HeaderSecondary>Рассевы, 0-3 мм, %</HeaderSecondary>

				{matsSieve.map(({ field, value, state }) => {
					return (
						<WorkshopMetricsCard.StandardMark
							key={field}
							value={value}
							title={field}
							statusColor={getColorStatusByState(state)}
						/>
					);
				})}
			</Section>

			<Section className='col-span-32'>
				<HeaderSecondary>Возврат общий</HeaderSecondary>

				<div className='row-span-2'>
					<WorkshopMetricsCard.SimpleUnit value={sinterReturn} unit='%' />
				</div>
			</Section>

			<Section className='col-span-32'>
				<HeaderSecondary>ЖРК заданное, %</HeaderSecondary>

				{ironRaw.map(({ field, value }) => {
					return (
						<WorkshopMetricsCard.Standard
							key={field}
							value={value}
							title={field}
						/>
					);
				})}
			</Section>

			<Section className='col-span-32'>
				<HeaderSecondary>Нормы расхода, кг/т</HeaderSecondary>

				{consumptionLimits.map(({ field, value }) => {
					return (
						<WorkshopMetricsCard.Standard
							key={field}
							value={value}
							title={field}
						/>
					);
				})}
			</Section>
			<div className='col-span-full'>
				<WorkshopMetricsCard.FullMetrics
					title='Шихта'
					subtitle='общая'
					value={batch}
				/>
			</div>
		</Link>
	);
};
