import {IconButton, Switch, TablePagination, Tooltip} from '@mui/material';
import {
    ColumnHeaderFilterIconButtonProps,
    DataGrid,
    GridFilterModel,
    GridLogicOperator,
    GridPaginationModel,
    gridPreferencePanelStateSelector,
    GridPreferencePanelsValue,
    GridRowId,
    GridRowIdGetter,
    GridRowSelectionModel,
    GridSortModel,
    GridValidRowModel,
    useGridApiContext,
    useGridRootProps,
} from '@mui/x-data-grid';
import {DateTime} from 'luxon';
import {assertHasValue, hasValue, hasValueNotEmpty} from 'northis.typescript.utils';
import {ComponentProps, useCallback, useState} from 'react';
import {SkeletonLoadingOverlay} from '../busy/skeleton-loading-overlay';
import {DEFAULT_PAGE_SIZE_OPTIONS} from './paging-consts';
import {SelectionState} from './selection/selection-state';
import {DataSourceState} from './state/data-source-state';
import {TablePagingParameters} from './state/table-paging-parameters';
// @ts-ignore


// @ts-ignore
import {ReactComponent as CheckMark} from '../../assets/svg/check-mark_ic.svg';
import {DataGridColDef} from './data-grid-col-def';
import {DataGridFilterPanel, StringFilterInput} from './filtering/filter-components';
import {FilterOperators} from './filtering/filter-operators';
import {FilterValue} from './filtering/filter-value';
import {FilterValueTypes} from './filtering/filter-value-types';
import {FilterItem} from './filtering/models/filter-item';
import {FilterModel} from './filtering/models/filter-model';
import {DateRange, NumberRange, ValueRange} from './filtering/models/value-range';
// @ts-ignore
import {ReactComponent as FilterIcon} from '../../assets/svg/filter_ic.svg';
// @ts-ignore
import {ReactComponent as FilterAppliedIcon} from '../../assets/svg/filter-applied_ic.svg';
import {FilterPanelPosition} from './filtering/models/filter-panel-position';
import classNames from 'classnames';
import {TooltipOverflowText} from '../tooltip-overflow';

/**
 * Представляет свойства передаваемые, напрямую {@link DataGrid}. Исключая свойства, необходимые для внутренней реализации.
 */
type PassthroughProps<R extends GridValidRowModel> = Pick<
    ComponentProps<typeof DataGrid<R>>,
    'columns' | 'getRowHeight' | 'rowHeight' | 'columnHeaderHeight' | 'hideFooter' | 'apiRef'
>;

const FILTER_DATETIME_FORMAT = 'dd.MM.yyyy HH:mm:ss';

/**
 * Представляет компонент таблицы с данными получаемыми из источника данных.
 * @typeParam Тип модели, которая отображается в строке таблицы.
 */
export function DataSourceGrid<R extends GridValidRowModel>(
    props: PassthroughProps<R> & {
        /**
         * Возвращает источник данных.
         */
        readonly dataSource: DataSourceState<R>;
        /**
         * Возвращает делегат получения идентификатора модели.
         */
        readonly getRowId: GridRowIdGetter<R>;
        /**
         * Возвращает модель выбора.
         */
        readonly selection?: SelectionState<R>;
    },
) {
    const {dataSource, selection, getRowId, ...passthrough} = props;
    const {paging, items, totalCount, filtering, sorting} = dataSource;
    const [filterableField, setFilterableField] = useState<string>();
    let selectedFilterField = filterableField;
    const [filterPanelPosition, setFilterPanelPosition] = useState<FilterPanelPosition>({x: 0, y: 0});
    let filterPosition: FilterPanelPosition = filterPanelPosition;

    const isFooterShow = paging || selection;

    const paginationModel = paging
        ? {
              page: paging.parameters.pageNumber,
              pageSize: paging.parameters.pageSize,
          }
        : undefined;

    const onPaginationModelChange = async (model: GridPaginationModel) => {
        if (paging) {
            paging.onParametersChange(new TablePagingParameters(model.page, model.pageSize));
        }
    };

    const [multipleSelection, setMultipleSelection] = useState<boolean>(
        selection?.selectionMode.defaultSelectionMode === 'Multiple',
    );
    const rowSelectionModel = multipleSelection
        ? selection?.selectedItems.map((x) => getRowId(x))
        : hasValue(selection) && hasValue(selection.selectedItems[0])
        ? [getRowId(selection.selectedItems[0])]
        : [];

    const textTooltipSwitch = multipleSelection ? 'Отключить множественный выбор' : 'Включить множественный выбор';
    const isShowSwitch = selection ? selection.selectionMode.selectionModes.length > 1 : false;

    const SelectedRowsCount = (props: {count: number}) => {
        let text = '';

        const lastTwoDigits = props.count % 100;
        if (lastTwoDigits !== 11 && lastTwoDigits !== 12 && lastTwoDigits !== 13 && lastTwoDigits !== 14) {
            const lastDigit = props.count % 10;
            if (lastDigit === 1) {
                text = `${props.count} строка выбрана`;
            } else if (lastDigit >= 2 && lastDigit <= 4) {
                text = `${props.count} строки выбрано`;
            }
        }

        if (text === '') {
            text = `${props.count} строк выбрано`;
        }

        return <div>{text}</div>;
    };

    const multipleSelectionHandler = () => {
        selection?.updateSelectedItems(rowSelectionModel ? [rowSelectionModel[rowSelectionModel.length - 1]] : []);
        setMultipleSelection((prev) => !prev);
    };

    /**
     * Представляет компонент кастомной навигации.
     * С реализованным свичем для включения/выключения мультиселекта.
     */
    const CustomSelectionToolbar = () => {
        return (
            <>
                {isFooterShow ? (
                    <div>
                        {selection ? (
                            <div>
                                {isShowSwitch && (
                                    <Tooltip title={textTooltipSwitch}>
                                        <Switch
                                            className={'customSwitch'}
                                            icon={<CheckMark />}
                                            checkedIcon={<CheckMark />}
                                            checked={multipleSelection}
                                            onClick={multipleSelectionHandler}
                                        />
                                    </Tooltip>
                                )}
                                <SelectedRowsCount count={rowSelectionModel?.length || 0} />
                            </div>
                        ) : (
                            <div />
                        )}
                        {paging ? (
                            <TablePagination
                                sx={{border: 'none', marginLeft: 'auto'}}
                                count={dataSource.totalCount}
                                page={paginationModel?.page || 0}
                                rowsPerPage={paginationModel?.pageSize || 0}
                                onPageChange={(e, n) =>
                                    onPaginationModelChange({
                                        page: n,
                                        pageSize: paginationModel?.pageSize || 0,
                                    })
                                }
                                onRowsPerPageChange={(e) =>
                                    onPaginationModelChange({page: paginationModel?.page || 0, pageSize: parseInt(e.target.value)})
                                }
                                rowsPerPageOptions={hasValue(paging) ? DEFAULT_PAGE_SIZE_OPTIONS : undefined}
                            />
                        ) : null}
                    </div>
                ) : null}
            </>
        );
    };

    const onFilterModelChange = (model: GridFilterModel) => {
        if (filtering) {
            filtering.onFilterChange(new FilterModel(model.items, GridLogicOperator.And));
        }
    };

    const onSortingModelChange = (model: GridSortModel) => {
        if (sorting) {
            sorting.onSortModelChange(model);
        }
    };

    const filterApply = (newValue: FilterValue) => {
        assertHasValue(selectedFilterField, 'Не указано поле для фильтрации');
        const filterableColumn = passthrough.columns.find((f) => f.field === selectedFilterField) as DataGridColDef;
        const items: FilterItem[] = [];
        if (filterableColumn.filterValueType === FilterValueTypes.ValueRange) {
            items.push({field: selectedFilterField, operator: FilterOperators.Between, value: newValue});
        } else {
            items.push({field: selectedFilterField, operator: FilterOperators.Contains, value: newValue});
        }
        onFilterModelChange(new FilterModel(items, GridLogicOperator.And));
    };

    function FilterPanel() {
        const gridContext = useGridApiContext();
        const preSetFilterValue = filtering?.filterModel.items.find((i) => i.field === selectedFilterField);
        const [filterValue, setFilterValue] = useState<FilterValue>(preSetFilterValue?.value ?? null);
        const filterableColumn = passthrough.columns.find((f) => f.field === selectedFilterField) as DataGridColDef;
        assertHasValue(filterableColumn, 'Не найден столбец для фильтрации');

        const isValidValue = () => {
            if (filterableColumn.filterValueType === FilterValueTypes.ValueRange) {
                const checkingValue = filterValue as ValueRange<Number> | ValueRange<DateTime> | null;
                const hasOneValue = hasValue(checkingValue) && (hasValue(checkingValue.minValue) || hasValue(checkingValue.maxValue));
                const hasValues =
                    hasValue(checkingValue) &&
                    hasValue(checkingValue.minValue) &&
                    !Number.isNaN(checkingValue.minValue) &&
                    hasValue(checkingValue.maxValue) &&
                    !Number.isNaN(checkingValue.maxValue);

                if (hasValues) {
                    if (checkingValue.minValue <= checkingValue.maxValue) {
                        if (DateTime.isDateTime(checkingValue.minValue) && DateTime.isDateTime(checkingValue.maxValue)) {
                            return checkingValue.minValue.isValid && checkingValue.maxValue.isValid;
                        }
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (hasOneValue) {
                        if (DateTime.isDateTime(checkingValue.minValue) || DateTime.isDateTime(checkingValue.maxValue)) {
                            //Проверка валидности поля даты, имеющего значение.
                            if (DateTime.isDateTime(checkingValue.minValue)) {
                                return checkingValue.minValue.isValid;
                            }

                            if (DateTime.isDateTime(checkingValue.maxValue)) {
                                return checkingValue.maxValue.isValid;
                            }
                        } else {
                            // Если одно из чисел равно NaN, то возвращаем валидацию "false".
                            if (Number.isNaN(checkingValue.maxValue) || Number.isNaN(checkingValue.minValue)) {
                                return false;
                            }

                            return true;
                        }
                    }

                    return false;
                }
            }
            return hasValue(filterValue);
        };

        function resetFieldFilter() {
            assertHasValue(filtering, 'Не указана модель фильтрации');
            const items = filtering.filterModel.items.filter((i) => i.field !== selectedFilterField);
            filtering.onFilterChange(new FilterModel(items, filtering.filterModel.logicOperator));
            setFilterValue(null);
            gridContext.current.hideFilterPanel();
        }

        function isValuesHasNoValidationErrors() {
            if (hasValue(filterableColumn.filterComponent) && filterableColumn.filterComponent.filterValueValidation) {
                const errorMessage = filterableColumn.filterComponent.filterValueValidation({
                    value: filterValue,
                });

                return !(hasValue(errorMessage.startValueValidationMessage) || hasValue(errorMessage.endValueValidationMessage));
            } else {
                return true;
            }
        }

        return (
            <DataGridFilterPanel
                panelPosition={filterPosition}
                onConfirm={() => {
                    gridContext.current.hideFilterPanel();
                    filterApply(filterValue);
                }}
                onClose={() => gridContext.current.hideFilterPanel()}
                onReset={() => resetFieldFilter()}
                isFilterValueValid={isValidValue() && isValuesHasNoValidationErrors()}
                fieldName={filterableColumn.headerName}>
                {filterableColumn.filterComponent ? (
                    filterableColumn.filterComponent.renderFilterComponent({
                        onChange: (newValue: FilterValue) => {
                            setFilterValue(newValue);
                        },
                        value: filterValue,
                    })
                ) : (
                    <StringFilterInput
                        value={filterValue as string | null}
                        onValueChange={(newValue: string) => {
                            setFilterValue(newValue);
                        }}
                    />
                )}
            </DataGridFilterPanel>
        );
    }

    function CustomFilterIconButton(props: ColumnHeaderFilterIconButtonProps) {
        const {field, onClick} = props;
        const apiRef = useGridApiContext();
        const column = apiRef.current.getColumn(field);

        if (column.filterable)
            column.renderHeader = () => (
                <TooltipOverflowText>
                    {column.headerName}
                    <span>{getFilterDisplayValue(field)}</span>
                </TooltipOverflowText>
            );

        const toggleFilter = useCallback(
            (event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                event.stopPropagation();
                const btnEl = event.currentTarget.getBoundingClientRect();
                filterPosition = {
                    x: btnEl.x,
                    y: btnEl.y + btnEl.height,
                };
                setFilterPanelPosition({
                    x: btnEl.x,
                    y: btnEl.y + btnEl.height,
                });

                const {open, openedPanelValue} = gridPreferencePanelStateSelector(apiRef.current.state);

                if (onClick) {
                    onClick(apiRef.current.getColumnHeaderParams(field), event);
                }

                if (open && openedPanelValue === GridPreferencePanelsValue.filters) {
                    apiRef.current.hideFilterPanel();
                } else {
                    apiRef.current.showFilterPanel();
                }
            },
            [apiRef, field, onClick, filterPosition],
        );

        if (!column.filterable) {
            return null;
        }

        const iconButton = (
            <IconButton
                onClick={toggleFilter}
                color="default"
                aria-label={apiRef.current.getLocaleText('columnHeaderFiltersLabel')}
                size="small"
                tabIndex={-1}>
                {getFilterButtonIcon(field)}
            </IconButton>
        );

        return iconButton;
    }

    function getFilterDisplayValue(field: string) {
        const filterableField = filtering?.filterModel.items.find((i) => i.field === field);
        const filterableColumn = passthrough.columns.find((f) => f.field === field) as DataGridColDef;

        let filterValue = '';
        if (filterableField?.value) {
            if (filterableColumn.filterValueType === FilterValueTypes.ValueRange) {
                const value = filterableField.value as ValueRange<Number | DateTime> | undefined | null;
                if (filterableColumn.type === 'dateTime') {
                    const dateRange = value as DateRange | null | undefined;
                    if (hasValue(dateRange)) {
                        const minValue = dateRange.minValue ? dateRange.minValue.toFormat(FILTER_DATETIME_FORMAT) : null;
                        const maxValue = dateRange.maxValue ? dateRange.maxValue.toFormat(FILTER_DATETIME_FORMAT) : null;
                        filterValue = `${minValue ?? ''} ${getRangeFilterSeparator(minValue, maxValue)} ${maxValue ?? ''}`;
                    } else {
                        filterValue = '';
                    }
                } else {
                    const numRange = value as NumberRange | null | undefined;
                    if (hasValue(numRange)) {
                        const minValue = hasValue(numRange.minValue) ? numRange.minValue.toString() : '';
                        const maxValue = hasValue(numRange.maxValue) ? numRange.maxValue.toString() : '';
                        filterValue = `${minValue} ${getRangeFilterSeparator(minValue, maxValue)} ${maxValue}`;
                    } else {
                        filterValue = '';
                    }
                }
            } else if (hasValue(filterableColumn.filterGetLabelFunc)) {
                filterValue = filterableColumn.filterGetLabelFunc(filterableField.value);
            } else {
                filterValue = filterableField.value.toString();
            }
        }
        return filterValue;
    }

    function getFilterButtonIcon(field: string) {
        const isFilterAppLied = filtering?.filterModel && filtering.filterModel.items.length > 0;
        const filterableField = filtering?.filterModel.items.find((i) => i.field === field);

        return isFilterAppLied && hasValue(filterableField) ? <FilterAppliedIcon /> : <FilterIcon />;
    }

    return (
        <DataGrid
           
            {...passthrough}
            checkboxSelection={multipleSelection}
            rows={items}
            onRowSelectionModelChange={(model: GridRowSelectionModel) => {
                selection?.updateSelectedItems(model.map(i => i.toString()));
            }}
            rowSelectionModel={rowSelectionModel}
            getRowId={getRowId}
            disableColumnMenu
            disableColumnSelector
            disableDensitySelector
            pagination={hasValue(paging) ? true : undefined}
            paginationMode={'server'}
            onPaginationModelChange={hasValue(paging) ? onPaginationModelChange : undefined}
            paginationModel={paginationModel}
            pageSizeOptions={hasValue(paging) ? DEFAULT_PAGE_SIZE_OPTIONS : undefined}
            rowCount={totalCount}
            hideFooterPagination={!hasValue(paging)}
            keepNonExistentRowsSelected
            loading={dataSource.isFetching}
            slots={{
                loadingOverlay: SkeletonLoadingOverlay,
                footer: CustomSelectionToolbar,
                filterPanel: FilterPanel,
                columnHeaderFilterIconButton: CustomFilterIconButton,
            }}
            slotProps={{
                columnHeaderFilterIconButton: {
                    onClick: (params) => {
                        selectedFilterField = params.field;
                        setFilterableField(params.field);
                    },
                },
            }}
            filterMode={filtering?.filterMode}
            filterModel={filtering?.filterModel}
            onFilterModelChange={(model) => onFilterModelChange(model)}
            sortingMode={sorting?.sortingMode}
            sortModel={sorting?.sortingModel}
            onSortModelChange={(model) => onSortingModelChange(model)}
        />
    );
}

function getRangeFilterSeparator(minValue: string | null, maxValue: string | null): string {
    if (hasValueNotEmpty(minValue) && !hasValueNotEmpty(maxValue)) {
        return '>';
    }
    if (hasValueNotEmpty(maxValue) && !hasValueNotEmpty(minValue)) {
        return '<';
    }
    return '-';
}
