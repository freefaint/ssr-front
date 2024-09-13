import { FC, ReactNode } from 'react';

type Props = { children: ReactNode; className?: string };

export const Section: FC<Props> = ({ children, className }) => {
	return (
		<div className={`grid gap-px grid-rows-header-1 ${className}`}>
			{children}
		</div>
	);
};
