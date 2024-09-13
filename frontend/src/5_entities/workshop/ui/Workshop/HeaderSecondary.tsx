import { Title } from '@/6_shared/ui/title';
import { FC, ReactNode } from 'react';

type Props = { children: ReactNode; className?: string };

export const HeaderSecondary: FC<Props> = ({ children, className }) => {
	return (
		<Title
			weight='semibold'
			size='md'
			className={`px-3 py-1 bg-gray-light ${className}`}
		>
			{children}
		</Title>
	);
};
