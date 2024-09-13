type WorkshopMainMetrics = {
	min: number;
	max: number;
	value: number;
	state: number;
};

type WorkshopSecondaryMetrics = {
	field: string;
	value: number;
};

export type SinterInWork = {
	field: number;
	speedAm: number;
	tKol: number;
	pKol: number;
	tShihtPb: number;
	tGorn: number;
	speedLo: number;
	tLo: number;
	lev: number;
	state: number;
};

export enum MetricName {
	basicity1 = 'basicity1',
	feo = 'feo',
	return = 'return',
	dropout = 'dropout',
	batch  = 'batch',
}

export type WorkshopResponse = {
	plantId: number;
	[MetricName.basicity1]: WorkshopMainMetrics;
	fe: WorkshopMainMetrics;
	[MetricName.feo]: WorkshopMainMetrics;
	sinterInWork: SinterInWork[];
	sinterSieve: WorkshopSecondaryMetrics[];
	matsSieve: Array<WorkshopSecondaryMetrics & { state: number }>;
	sinterReturn: number;
	[MetricName.return]: number;
	dropout: number;
	batch: number;
	ironRaw: WorkshopSecondaryMetrics[];
	consumptionLimits: WorkshopSecondaryMetrics[];
};

export type LineIndicatorMetric = {
	value: number;
	title: string;
	unit?: string;
};

type ChartMetric = number | null;

export type SinteringMachineChartResponse = {
	field: number;
	date: string;
	speedAm?: ChartMetric;
	tKol?: ChartMetric;
	pKol?: ChartMetric;
	tShihtPb?: ChartMetric;
	tGorn?: ChartMetric;
	speedLo?: ChartMetric;
	tLo?: ChartMetric;
	lev?: ChartMetric;
};
