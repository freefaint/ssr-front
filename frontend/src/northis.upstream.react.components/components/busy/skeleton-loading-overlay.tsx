import {Box, LinearProgress, Skeleton, styled} from '@mui/material';
import {gridColumnPositionsSelector, gridColumnsTotalWidthSelector, useGridApiContext} from '@mui/x-data-grid';
import {ReactNode, useMemo} from 'react';

/**
 * Возвращает минимальную высоту строки в px.
 */
const MIN_ROW_HEIGHT = 48;

/**
 * Представляет скелетон для DataGrid.
 */
export function SkeletonLoadingOverlay() {
    const apiRef = useGridApiContext();
    const dimensions = apiRef.current?.getRootDimensions();
    const viewportHeight = dimensions?.viewportInnerSize.height ?? 0;
    const skeletonRowsCount = Math.ceil(viewportHeight / MIN_ROW_HEIGHT) - 1;
    const totalWidth = gridColumnsTotalWidthSelector(apiRef);
    const positions = gridColumnPositionsSelector(apiRef);
    const inViewportCount = useMemo(() => positions.filter((value) => value <= totalWidth).length, [totalWidth, positions]);
    const columns = apiRef.current.getVisibleColumns().slice(0, inViewportCount);

    const children = useMemo(() => {
        const array: ReactNode[] = [];
        for (let i = 0; i < skeletonRowsCount; i += 1) {
            for (const column of columns) {
                const width = 90;
                array.push(
                    <SkeletonCell key={`column-${i}-${column.field}`}>
                        <Skeleton
                            animation="wave"
                            sx={{mx: 1}}
                            width={`${width}%`}
                        />
                    </SkeletonCell>,
                );
            }
            array.push(<SkeletonCell key={`fill-${i}`} />);
        }
        return array;
    }, [skeletonRowsCount, columns]);

    const rowsCount = apiRef.current.getRowsCount();

    return rowsCount > 0 ? (
        <LinearProgress />
    ) : (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `${columns.map(({computedWidth}) => `${computedWidth}px`).join(' ')} 1fr`,
                gridAutoRows: MIN_ROW_HEIGHT,
            }}>
            {children}
        </div>
    );
}

const SkeletonCell = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
}));
