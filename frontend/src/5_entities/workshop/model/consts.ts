import { SinteringMachineChartResponse, WorkshopResponse } from './types';

export enum StatusColor {
	RED = 'red',
	ORANGE = 'orange',
	YELLOW = 'yellow',
	GREEN = 'green',
	BLUE = 'blue',
	NEUTRAL = 'neutral',
}

export const PLACEHOLDER_WORKSHOP: WorkshopResponse = {
	plantId: 2,
	basicity1: {
		min: 1,
		max: 2,
		value: 1.09,
		state: 3,
	},
	fe: {
		min: 58,
		max: 65,
		value: 60.22,
		state: 3,
	},
	feo: {
		min: 58,
		max: 65,
		value: 60.22,
		state: 3,
	},
	sinterInWork: [
		{
			field: 4,
			speedAm: 2.104,
			tKol: 94,
			pKol: -643.808,
			tShihtPb: 57.45,
			tGorn: 1124.75,
			speedLo: 1.801,
			tLo: 72.67,
			lev: 452.133,
			state: 3,
		},
		{
			field: 5,
			speedAm: 2.074,
			tKol: 130,
			pKol: -839.12,
			tShihtPb: 58.42,
			tGorn: 1128.5,
			speedLo: 1.832,
			tLo: 77,
			lev: 459.87,
			state: 3,
		},
		{
			field: 6,
			speedAm: 2.104,
			tKol: 94,
			pKol: -643.808,
			tShihtPb: 57.45,
			tGorn: 1124.75,
			speedLo: 1.801,
			tLo: 72.67,
			lev: 452.133,
			state: 3,
		},
		{
			field: 7,
			speedAm: 2.104,
			tKol: 94,
			pKol: -643.808,
			tShihtPb: 57.45,
			tGorn: 1124.75,
			speedLo: 1.801,
			tLo: 72.67,
			lev: 452.133,
			state: 3,
		},
		{
			field: 8,
			speedAm: 2.104,
			tKol: 94,
			pKol: -643.808,
			tShihtPb: 57.45,
			tGorn: 1124.75,
			speedLo: 1.801,
			tLo: 72.67,
			lev: 452.133,
			state: 3,
		},
		{
			field: 9,
			speedAm: 2.104,
			tKol: 94,
			pKol: -643.808,
			tShihtPb: 57.45,
			tGorn: 1124.75,
			speedLo: 1.801,
			tLo: 72.67,
			lev: 452.133,
			state: 3,
		},
	],
	sinterSieve: [
		{
			field: '0-5мм',
			value: 6.4,
		},
		{
			field: '5-10мм',
			value: 31.6,
		},
		{
			field: '10-25мм',
			value: 42.1,
		},
	],
	matsSieve: [
		{
			field: 'Топливо',
			value: 90.5,
			state: 3,
		},
		{
			field: 'Флюсы',
			value: 93,
			state: 0,
		},
	],
	sinterReturn: 0,
	return: 0,
	dropout: 0,
	batch: 0,
	ironRaw: [
		{
			field: 'Яковлевская руда',
			value: 38,
		},
		{
			field: 'Ол.+Леб.',
			value: 28,
		},
		{
			field: 'Ковдорский ЖРК',
			value: 34,
		},
	],
	consumptionLimits: [
		{
			field: 'Шлаковая смесь',
			value: 135,
		},
		{
			field: 'Смесь ЖСО',
			value: 84,
		},
	],
};

export const PLACEHOLDER_WORKSHOP_LIST = Array.from(
	Array(2).keys(),
	(value) => {
		return { ...PLACEHOLDER_WORKSHOP, plantId: value };
	},
);

export const UNICODE = {
	DEGREE: '\u00B0',
	SQUARE: '\u00B2',
	CUBE: '\u00B3',
} as const;

export const SINTERING_MACHINE_CHART_PLACEHOLDER_DATA: SinteringMachineChartResponse[] =
	[
		{ field: 1, date: '12:00' },
		{ field: 2, date: '13:00' },
		{ field: 3, date: '13:30' },
		{ field: 4, date: '14:00' },
	];

export const SINTERING_MACHINE_METRICS = {
	tKol: {
		field: 'tKol',
		title: 'T',
		subtitle: 'колл',
		unit: `${UNICODE.DEGREE}C`,
	},
	pKol: {
		field: 'pKol',
		title: 'P',
		subtitle: 'колл',
		unit: `кгс/м${UNICODE.SQUARE}`,
	},
	tShihtPb: {
		field: 'tShihtPb',
		title: 'T',
		subtitle: 'ш',
		unit: `${UNICODE.DEGREE}C`,
	},
	tGorn: {
		field: 'tGorn',
		title: 'T',
		subtitle: 'горн',
		unit: `${UNICODE.DEGREE}C`,
	},
	speedAm: {
		field: 'speedAm',
		title: 'V',
		subtitle: 'а/м',
		unit: 'м/мин',
	},
	speedLo: {
		field: 'speedLo',
		title: 'V',
		subtitle: 'ло',
		unit: 'м/мин',
	},
	tLo: {
		field: 'tLo',
		title: 'T',
		subtitle: 'ло',
		unit: `${UNICODE.DEGREE}C`,
	},
	lev: {
		field: 'lev',
		title: 'H',
		subtitle: 'сл',
		unit: 'мм',
	},
} as const;
