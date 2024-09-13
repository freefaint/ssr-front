import { StatusColor } from '../../model/consts';

export type GenericCardProps = {
	value?: number;
	title?: string;
	statusColor?: StatusColor;
	subtitle?: string;
	unit?: string;
	className?: string;
};
