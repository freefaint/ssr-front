import { FC } from 'react';
import { GenericCardProps } from './types';
import { CardWrapper } from './CardWrapper';
import { Text } from '@/6_shared/ui/text';

export const SimpleMarkCard: FC<
	Omit<GenericCardProps, 'title' | 'subtitle' | 'unit'>
> = (props) => {
	const { statusColor, className, value } = props;

	return (
		<CardWrapper
			statusColor={statusColor}
			className={`self-start justify-center px-5 pt-1.5 pb-2 ${className}`}
		>
			<Text color={statusColor}>{value}</Text>
		</CardWrapper>
	);
};
