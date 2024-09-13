import { FC } from 'react';
import { CardWrapper } from './CardWrapper';
import { GenericCardProps } from './types';
import { Text } from '@/6_shared/ui/text';

export const StandardCard: FC<
	Omit<GenericCardProps, 'subtitle' | 'unit' | 'statusColor'>
> = (props) => {
	const { className, title, value } = props;

	return (
		<CardWrapper
			className={`items-center justify-between px-3 pt-1.5 pb-2 ${className}`}
		>
			<Text color='gray' size='sm'>
				{title}
			</Text>

			<Text color='gray'>{value}</Text>
		</CardWrapper>
	);
};
