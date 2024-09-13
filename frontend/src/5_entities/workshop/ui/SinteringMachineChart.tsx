import { skeletonConfig } from '@/6_shared/lib/skeletonMammoth';
import { FC } from 'react';
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	XAxisProps,
	YAxis,
} from 'recharts';
import { StatusColor } from '../model/consts';
import { SinteringMachineChartResponse } from '../model/types';

const CustomTick = ({
	className,
	x,
	y,
	textAnchor,
	baselineShift,
	children,
}: XAxisProps) => {
	return (
		<g transform={`translate(${x},${y})`}>
			<text
				className={className}
				baselineShift={baselineShift}
				textAnchor={textAnchor}
				fontSize='10px'
				fill='currentColor'
			>
				{children}
			</text>
		</g>
	);
};

type CustomAxisTickProps = {
	payload: {
		value: string | number;
	};
} & XAxisProps;

const CustomXAxisTick = ({ x, y, payload: { value } }: CustomAxisTickProps) => {
	return (
		<CustomTick
			baselineShift={0}
			textAnchor='middle'
			className='text-steel'
			y={y}
			x={x}
		>
			{value}
		</CustomTick>
	);
};

const CustomYAxisTick = ({ x, y, payload: { value } }: CustomAxisTickProps) => {
	return (
		<CustomTick
			baselineShift={-2}
			textAnchor='end'
			className='text-steel'
			y={y}
			x={x}
		>
			{value}
		</CustomTick>
	);
};

type Props = {
	metricNames?: Array<
		keyof Omit<SinteringMachineChartResponse, 'field' | 'date'>
	>;
	statusColor: StatusColor;
	isLoading: boolean;
	chart: SinteringMachineChartResponse[];
};

export const SinteringMachineChart: FC<Props> = ({
	metricNames = [],
	statusColor,
	isLoading,
	chart,
}) => {
	const loadingClass = isLoading ? 'sm-loading' : '';

	return (
		<div
			className={`w-full h-32 ${loadingClass}`}
			data-sm-config={skeletonConfig}
		>
			<ResponsiveContainer className='sm-item-primary'>
				<LineChart margin={{ top: 6 }} data={chart}>
					<CartesianGrid
						strokeWidth={1}
						className='text-steel opacity-60'
						stroke='currentColor'
					/>

					<YAxis
						domain={['auto', 'auto']}
						width={40}
						tickMargin={2}
						interval={0}
						type='number'
						axisLine={false}
						tickLine={false}
						tick={(data) => <CustomYAxisTick {...data} />}
					/>

					<XAxis
						tickMargin={10}
						tick={(data) => <CustomXAxisTick {...data} />}
						width={20}
						tickLine={false}
						axisLine={false}
						interval='preserveStartEnd'
						dataKey='date'
					/>

					{metricNames.map((metricName) => {
						return (
							<Line
								key={metricName}
								animationDuration={600}
								dot={false}
								strokeWidth={2}
								dataKey={metricName}
								className={`text-${statusColor}`}
								stroke='currentColor'
							/>
						);
					})}
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};
