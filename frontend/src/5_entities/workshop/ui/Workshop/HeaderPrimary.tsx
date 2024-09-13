import { Title } from '@/6_shared/ui/title';
import { FC, ReactNode } from 'react';

type Props = {
	children: ReactNode;
	className?: string;
	size?: 'md';
	order?: '1';
};

export const HeaderPrimary: FC<Props> = ({
	children,
	className,
	size,
	order,
}) => {
	return (
		<Title
			weight='semibold'
			size={size}
			order={order}
			className={`bg-zinc flex items-center ${className}`}
		>
			{children}
		</Title>
	);
};
