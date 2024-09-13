import { memo } from 'react';
import type { FC, ReactNode } from 'react';

type TextSize = 'sm' | 'md' | 'lg' | 'xxxl';

export type TextColor =
	| 'neutral'
	| 'steel'
	| 'gray'
	| 'red'
	| 'orange'
	| 'yellow'
	| 'green'
	| 'blue';

type TextWeight = 'bold' | 'semibold' | 'normal';

type Props = {
	className?: string;
	children: ReactNode;
	size?: TextSize;
	color?: TextColor;
	weight?: TextWeight;
};

export const Text: FC<Props> = memo(
	({
		size = 'md',
		color = 'neutral',
		weight = 'semibold',
		className = '',
		children,
		...textProps
	}) => {
		return (
			<span
				{...textProps}
				className={`text-${size} text-${color} font-${weight} leading-${size} ${className}`}
			>
				{children}
			</span>
		);
	},
);

Text.displayName = 'Text';
