import { FC } from 'react';
import { GenericCardProps } from './types';
import { CardWrapper } from './CardWrapper';
import { Text } from '@/6_shared/ui/text';

export const StandardMarkCard: FC<Omit<GenericCardProps, 'subtitle' | 'unit'>> =
	(props) => {
		const { statusColor, className, title, value } = props;

		return (
			<CardWrapper
				statusColor={statusColor}
				className={`justify-between px-3 pt-1.5 pb-2 ${className}`}
			>
				<Text color='gray'>{title}</Text>

				<Text color={statusColor}>{value}</Text>
			</CardWrapper>
		);
	};
