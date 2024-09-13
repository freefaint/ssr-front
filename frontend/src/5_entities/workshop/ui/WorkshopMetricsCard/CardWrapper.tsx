import { FC, ReactNode } from 'react';
import { StatusColor } from '../../model/consts';

type Props = {
	children: ReactNode;
	statusColor?: StatusColor;
	className?: string;
};

export const CardWrapper: FC<Props> = ({
	children,
	className,
	statusColor,
}) => {
	const markedStatusClass = statusColor
		? `after:left-0 after:bottom-0 after:absolute after:w-full after:h-0.5 after:bg-${statusColor}`
		: '';

	return (
		<div
			className={`bg-zinc relative sm-item-secondary flex w-full ${markedStatusClass} ${className}`}
		>
			{children}
		</div>
	);
};
