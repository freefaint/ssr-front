import { FC } from 'react';
import { GenericCardProps } from './types';
import { CardWrapper } from './CardWrapper';
import { Text } from '@/6_shared/ui/text';

export const FullMetricsCard: FC<GenericCardProps> = (props) => {
	const { statusColor, className, unit, title, value, subtitle } = props;

	return (
		<CardWrapper
			statusColor={statusColor}
			className={`justify-between px-3 pt-1.5 pb-2 ${className}`}
		>
			<div className='flex gap-x-1'>
				<Text>{title}</Text>

				<Text weight='normal' color='steel'>
					{subtitle}
				</Text>
			</div>

			<div className='flex gap-x-1'>
				<Text color={statusColor}>{value}</Text>

				{unit && (
					<Text className='w-12 text-start' weight='normal' color='steel'>
						{unit}
					</Text>
				)}
			</div>
		</CardWrapper>
	);
};
