import { workshopTypes } from '@/5_entities/workshop';

type LineIndicatorMetricSegmentView = Omit<
	workshopTypes.LineIndicatorMetric,
	'value'
>;

type MetricView = {
	currentMetric: LineIndicatorMetricSegmentView;
	maxMetric: LineIndicatorMetricSegmentView;
	minMetric: LineIndicatorMetricSegmentView;
};

type LineIndicatorData = {
	min: number;
	max: number;
	value: number;
	state: number;
};

export const getLineIndicatorMetric = (
	data: LineIndicatorData,
	metricView: MetricView,
) => {
	const { min, max, value } = data;
	const { currentMetric, maxMetric, minMetric } = metricView;

	return {
		currentMetric: { ...currentMetric, value },
		maxMetric: { ...maxMetric, value: max },
		minMetric: { ...minMetric, value: min },
	};
};
