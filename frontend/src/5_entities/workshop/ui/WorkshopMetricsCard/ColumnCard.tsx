import { FC } from 'react';
import { GenericCardProps } from './types';
import { Text } from '@/6_shared/ui/text';
import { CardWrapper } from './CardWrapper';

export const ColumnCard: FC<
	Omit<GenericCardProps, 'subtitle' | 'unit' | 'statusColor'>
> = (props) => {
	const { className, title, value } = props;

	return (
		<CardWrapper
			className={`flex-col items-center justify-center px-1 py-0.5 ${className}`}
		>
			<Text>{title}</Text>

			<Text weight='normal'>{value}</Text>
		</CardWrapper>
	);
};
