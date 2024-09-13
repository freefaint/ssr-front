export const renderSinterInWorkSectionStubs = (
	sinterInWorkCount: number,
	cells = 6,
) => {
	const stubsCount = cells - sinterInWorkCount;

	return Array.from(Array(stubsCount).keys(), (value) => {
		return (
			<div
				key={value}
				className='bg-zinc self-start justify-center h-8 px-5 pt-1.5 pb-2'
			/>
		);
	});
};
