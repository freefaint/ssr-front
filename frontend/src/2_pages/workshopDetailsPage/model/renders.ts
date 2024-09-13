import { workshopConsts, workshopTypes } from '@/5_entities/workshop';

export const lineIndicatorWorkshopMetricViews = [
	{
		metricName: workshopTypes.MetricName.basicity1,
		view: {
			currentMetric: {
				title: 'CaO/SiO2',
			},
			maxMetric: {
				title: 'max',
			},
			minMetric: {
				title: 'min',
			},
		},
	},
	{
		metricName: workshopTypes.MetricName.feo,
		view: {
			currentMetric: {
				title: 'FeO',
			},
			maxMetric: {
				title: 'max',
				unit: '%',
			},
			minMetric: {
				title: 'min',
				unit: '%',
			},
		},
	},
] as const;

export const indicatorColorView = {
	[workshopTypes.MetricName.basicity1]: [
		workshopConsts.StatusColor.BLUE,
		workshopConsts.StatusColor.GREEN,
		workshopConsts.StatusColor.RED,
	],
	[workshopTypes.MetricName.feo]: [
		workshopConsts.StatusColor.BLUE,
		workshopConsts.StatusColor.GREEN,
		workshopConsts.StatusColor.RED,
	],
};

export const workshopMetricViews = [
	{
		metricName: workshopTypes.MetricName.return,
		view: {
			title: 'Возврат',
			subtitle: 'агломерата',
			unit: '%',
		},
	},
	{
		metricName: workshopTypes.MetricName.dropout,
		view: {
			title: 'Отсев',
			subtitle: 'агломерата',
			unit: '%',
		},
	},
	{
		metricName: workshopTypes.MetricName.batch,
		view: {
			title: 'Шихта',
			subtitle: 'общая',
			unit: 'т',
		},
	},
] as const;
