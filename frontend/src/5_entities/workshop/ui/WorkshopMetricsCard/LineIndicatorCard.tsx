import { FC } from 'react';
import { StatusColor } from '../../model/consts';
import { LineIndicatorMetric } from '../../model/types';
import { Text } from '@/6_shared/ui/text';

type Props = {
	minMetric: LineIndicatorMetric;
	currentMetric: LineIndicatorMetric;
	maxMetric: LineIndicatorMetric;
	statusColor: StatusColor;
	indicatorColors?: StatusColor[];
};

export const LineIndicatorCard: FC<Props> = ({
	minMetric,
	currentMetric,
	maxMetric,
	statusColor,
	indicatorColors,
}) => {
	const mappedStatusColor = statusColor === 'neutral' ? 'green' : statusColor;

	return (
		<div>
			<div className='bg-zinc flex justify-between px-8 pt-1.5 pb-2 sm-item-primary'>
				<div className='flex gap-x-1'>
					<Text weight='normal' color='steel'>
						{minMetric.title}
					</Text>

					<Text color='steel'>{minMetric.value}</Text>

					{minMetric.unit && (
						<Text weight='normal' color='steel'>
							{minMetric.unit}
						</Text>
					)}
				</div>

				<div className='flex gap-x-1'>
					<Text>{currentMetric.title}</Text>

					<Text color={statusColor}>{currentMetric.value}</Text>

					{currentMetric.unit && (
						<Text weight='normal' color='steel'>
							{currentMetric.unit}
						</Text>
					)}
				</div>

				<div className='flex gap-x-1'>
					<Text weight='normal' color='steel'>
						{maxMetric.title}
					</Text>

					<Text color='steel'>{maxMetric.value}</Text>

					{maxMetric.unit && (
						<Text weight='normal' color='steel'>
							{maxMetric.unit}
						</Text>
					)}
				</div>
			</div>

			<div className='flex mt-3 mb-6 sm-item-secondary'>
				{indicatorColors?.map((color, index) => {
					const marker =
						mappedStatusColor === color
							? `after:left-0 after:right-0 after:ml-auto after:mr-auto after:-bottom-1.5 after:absolute after:w-1 after:h-4 after:bg-${color}`
							: '';

					const basisSegment = index === 1 ? '10/12' : '1/12';

					return (
						<div
							key={color}
							className={`h-1 basis- basis-${basisSegment} bg-${color} relative ${marker}`}
						/>
					);
				})}
			</div>
		</div>
	);
};
