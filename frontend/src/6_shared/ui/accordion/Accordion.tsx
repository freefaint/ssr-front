import { IcoChevron } from '@/6_shared/assets/icons';
import { FC, useState } from 'react';

type Props = {
	children: JSX.Element;
	ButtonComponent: JSX.Element;
	buttonBackgroundColor?: string;
};

export const Accordion: FC<Props> = ({
	children,
	buttonBackgroundColor = 'bg-zinc',
	ButtonComponent,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenCloseAccordionClick = () => {
		setIsOpen((state) => !state);
	};

	return (
		<div>
			<button
				onClick={handleOpenCloseAccordionClick}
				type='button'
				className={`flex items-center justify-between w-full ${buttonBackgroundColor}  `}
			>
				{ButtonComponent}

				<IcoChevron
					className={`w-3 mx-2 h-3 ${
						isOpen ? 'rotate-180 text-neutral' : 'text-steel'
					} shrink-0`}
				/>
			</button>

			<div
				className={`${
					isOpen ? 'visible' : 'hidden'
				} grid grid-cols-chart-1 py-2`}
				onClick={handleOpenCloseAccordionClick}
				onKeyDown={handleOpenCloseAccordionClick}
			>
				{isOpen ? children : null}
			</div>
		</div>
	);
};
