import { FC } from 'react';
import { GenericCardProps } from './types';
import { Text } from '@/6_shared/ui/text';
import { CardWrapper } from './CardWrapper';

export const SimpleUnitCard: FC<
	Omit<GenericCardProps, 'title' | 'subtitle' | 'statusColor'>
> = (props) => {
	const { className, unit, value } = props;

	return (
		<CardWrapper
			className={`h-full items-center justify-center px-5 py-2 ${className}`}
		>
			<div>
				<Text color='gray' size='xxxl'>
					{value}
				</Text>

				<Text color='gray' size='xxxl'>
					{unit}
				</Text>
			</div>
		</CardWrapper>
	);
};
