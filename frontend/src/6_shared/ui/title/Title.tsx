import { memo } from 'react';
import type { FC, ReactNode } from 'react';

type TitleSize = 'lg' | 'xl' | 'md';

type TitleColor = 'neutral' | 'steel' | 'gray' | 'white';

type TitleWeight = 'bold' | 'semibold';

type TitleTagOrder = '1' | '2' | '3';

type MapHeaderTag = {
	[key in TitleTagOrder]: keyof JSX.IntrinsicElements;
};

const mapHeaderTag: MapHeaderTag = {
	1: 'h1',
	2: 'h2',
	3: 'h3',
};

type Props = {
	className?: string;
	children: ReactNode;
	size?: TitleSize;
	color?: TitleColor;
	weight?: TitleWeight;
	order?: TitleTagOrder;
};

export const Title: FC<Props> = memo(
	({
		size = 'xl',
		color = 'gray',
		weight = 'bold',
		className = '',
		order = '2',
		children,
		...textProps
	}) => {
		const TitleTag = mapHeaderTag[order];

		return (
			<TitleTag
				{...textProps}
				className={`text-${size} text-${color} font-${weight} leading-${size} ${className}`}
			>
				{children}
			</TitleTag>
		);
	},
);

Title.displayName = 'Title';
