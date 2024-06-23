import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
  CellClassParams,
  CellClickedEvent, ColDef, EditableCallbackParams, ExcelStyle, GetDataPath, GridApi, GridOptions, IsRowSelectable, RowClassParams,
  RowClickedEvent , StatusPanelDef,
  ValueGetterParams, RowNode,
  IRowNode,
  GridReadyEvent
} from 'ag-grid-community';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { MagicGridCustomLoadingOverlayComponent } from './renderer/custom-loading-overlay/magic-grid-custom-loading-overlay.component';
import { MagicGridFilterHeaderRendererComponent } from './renderer/filter-header-renderer/magic-grid-filter-header-renderer.component';
import { MagicGridTooltipComponent } from './renderer/tooltip/magic-grid-tooltip.component';
import { MagicGridStatusBarComponent } from './renderer/status-bar/magic-grid-status-bar.component';
import { MagicGridValueGetterParamsHelper } from './magic-grid-value-getter-params-helper';
import { MagicGridCellRendererFrameworkComponent } from './renderer/cell-renderer-framework/magic-grid-cell-renderer-framework.component';
import { getValueGetterDate } from './renderer/magic-grid-formatter';
import { MagicGridMasterDetailRendererComponent } from './renderer/grid-master-detail-renderer/magic-grid-master-detail-renderer.component';
import { MagicGridBtnHeaderComponent } from './grid-btn-header/magic-grid-btn-header.component';
import { IMagicEmitRowSelect, IMagicGridButton, IMagicGridConfig, IMagicGridConfigStatusBar, IMagicGridConfigStatusBarIsFilter, IMagicGridRowConfig, IMagicValueMasterDetail, IValueGetterParams } from '../../other/model/interface/magicGrid.interface';
import { MagicTypeHelper } from '../../other/helper/type-helper/magic-type-helper';
import { MagicFormatterTypeEnm } from '../../other/model/enm/magicFormatterTypeEnm';
import { MagicDateCalendarTypeEnm } from '../../other/model/enm/magicDateCalendarTypeEnm';
import { MagicStyleType } from '../../other/helper/type/defult.type';
import { MagicGridBtnRendererComponent } from './renderer/magic-grid-btn-renderer/magic-grid-btn-renderer.component';



@Component({
  selector: 'magic-grid',
  templateUrl: './magic-grid.component.html',
  styleUrls: ['./magic-grid.component.scss']
})
export class MagicGridComponent implements OnInit, AfterViewInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular | undefined;
  constructor() {}
  ngAfterViewInit(): void {
    this.setStyleGrid();
  }
  ngOnInit(): void {
  }
  option = {
    Headers: new HttpHeaders({
    })
  }

  private gridApi?: GridApi;
  loadingOverlayComponent = 'loading';
  gridOptions = <GridOptions>{
    context: {
      componentParent: this
    }
  }
  columnDefs: ColDef[] = []
  frameWorkComponent: any = {
    loading: MagicGridCustomLoadingOverlayComponent,
    magicGridFilterHeaderRenderer: MagicGridFilterHeaderRendererComponent,
    magicGridTooltipComponent: MagicGridTooltipComponent,
    magicGridStatusBar: MagicGridStatusBarComponent,
  }
  defaultColDef: ColDef = {
    filter: true,
    sortable: true,
    resizable: true,
    wrapText: false,
    editable: false,
    menuTabs: ['filterMenuTab'],
    flex: 0,
    tooltipComponent: 'MagicGridTooltipComponent',
  }
  masterDetail: boolean = false;
  detailRowHeight: number = 500;
  private nameCellBtnTable: string = 'CellBtnTable';
  rowSelection: 'multiple' | 'single' = 'multiple';
  pagination: boolean = false;
  paginationPageSize: number = 0;
  enableRtl: boolean = true;
  noRowTemplate = `<p>فیلدی جهت نمایش وجود ندارد<p>`;
  excelStyles: ExcelStyle[] = [
    {
      id: 'cell',
      alignment: {
        horizontal: 'Right',
      }
    }
  ];
  suppressRowClickSelection: boolean = true;
  groupDisplayType: any = 'multipleColumns';
  isTreeDate: boolean = false;
  groupDefaultExpanded?: number;
  statusBar: { statusPanels: StatusPanelDef[]; } = {
    statusPanels: [
      {
        statusPanel: 'magicGridStatusBar',
        align: 'left',
      }
    ]
  };
  animateRows: boolean = false;
  autoGroupColumnDef: ColDef = {};
  rowBuffer: number = 5;
  AG_GRID_LOCALE_FA = {
    selectAll: '(انتخاب همه)',
    selectAllSearchResult: '(انتخاب همه نتایج جستجو)',
    searchOoo: 'جستجو...',
    blank: 'خالی',
    notBlank: 'پُر',
    blanks: '(جای خالی)',
    noMatches: 'بدون منتطق',
    filterOoo: 'فیلتر...',
    equals: 'برابر',
    notEqual: 'نه برابر',
    empty: 'یکی را انتخاب کن',
    lesThan: 'کمتر از',
    greaterThan: 'بزرگتر از',
    lassThanOrEqual: 'کمتر یا مساوی',
    greaterThanOrEqual: 'بزرگتر یا مساوی',
    isRange: 'در محدوده',
    isRangeStart: 'به',
    isRangeEnd: 'از',
    contains: 'حاوی',
    notContains: 'شامل نشود',
    startWidth: 'شروع با',
    endsWidth: 'مختوم به',
    dataFormatOoo: 'yyyy-mm-dd',
    andCondition: 'و',
    orCondition: 'یا',
    applyFilter: 'اعمال',
    resatFilter: 'بازنشانی',
    clearFilter: 'پاک کردن',
    cancelFilter: 'لغو',
    textFilter: 'فیلتر متن',
    numberFilter: 'فیلتر عدد',
    dataFilter: 'فیلتر تاریخ',
    setFilter: 'تنظیم فیلتر',
    columns: 'ستون ها',
    filters: 'فیلترها',
    pivotMode: 'حالت محوری',
    groups: 'گروه های ردیف',
    rowGroupColumnsEmptyMessage: 'برای تنظیم گروه های ردیف اینجا بکشید',
    values: 'ارزش ها',
    valueColumnsEmptyMessage: 'برای جمع آوری اینجا را بکشید',
    pivots: 'برچسب های ستون',
    pivotColumnsEmptyMessage: 'برای تنظیم برچسب های ستون به اینجا بکشید',
    group: 'گروه',
    loadingOoo: 'در حال بارگیری...',
    noRowsToShow: 'هیچ ردیفی برای نمایش وجود ندارد',
    enabled: 'فعال ',
    pinColumn: 'سنجاق کردن ستون',
    pinLeft: 'سنجاق کردن به چپ',
    pinRight: 'سنجاق کردن به راست',
    noPin: 'بدون پین',
    valueAggregation: 'تجمیع مقادیر',
    autosizeThisColumns: 'اندازه خودکار این ستون',
    autosizeAllColumns: 'اندازه خودکار همه ستون ها',
    groupBy: 'گروه بندب براساس',
    ungroupBy: 'لغو گروه بندی براساس',
    resetColumns: 'بازنشانی ستون ها',
    expandAll: 'گسترش همه',
    collapseAll: 'بستن همه',
    copy: 'کپی',
    ctrlC: 'Ctrl+C',
    copyWidthHeaders: 'کپی با سرستون',
    paste: 'چسباندن',
    ctrlV: 'Ctrl+V',
    export: 'خروجی',
    csvExport: 'خروجی CSv',
    excelExport: 'خروجی اکسل (.xlsx)',
    excelXmlExport: 'خروجی اکسل (.xml)',
    sum: 'جمع',
    min: 'دقیقه',
    max: 'حداکثر',
    none: 'هیچ',
    count: 'شمار',
    avg: 'متوسط',
    filteredRows: 'فیلتر شده',
    selectedRows: 'انتخاب شده',
    totalRows: 'همه ردیف ها',
    totalAndFilteredRows: 'ردیف',
    more: 'بیشتر',
    to: 'به',
    of: 'از',
    page: 'صفحه',
    nextPage: 'صفحه بعدی',
    lastPage: 'آخرین صفحه',
    firstPage: 'صفحه اول',
    previousPage: 'صفحه قبلی',
    pivotChartAndPivotMode: 'نمودار محوری و حالت محوری',
    pivotChart: 'نمودار محوری',
    chartRange: 'محدوده نمودار',
    columnChart: 'ستونی',
    groupedColumn: 'گروه بندی شده',
    stakedBarColumn: 'انباشته شده',
    normalizedColumn: '100% انباشته شده',
    barChart: 'میله ای',
    groupedBar: 'گروه بندی شده',
    stackedBar: 'انباشته شده',
    normalizedBar: '100% انباشته شده',
    pieChart: 'پای',
    pie: 'پای',
    doughnut: 'دونات',
    line: 'خط',
    xyChart: 'XY (اسکتر)',
    scatter: 'اسکتر',
    bubble: 'حباب',
    areaChart: 'منطقه',
    area: 'منطقه',
    stackedArea: 'انباشته شده',
    normalizesArea: '100% انباشته شده',
    histogramChart: 'هیستوگرام',
    pivotChartTitle: 'نمودار محوری',
    rangeChartTitle: 'نمودار محدوده',
    settings: 'تنظیمات',
    data: 'داده',
    format: 'فرمت',
    categories: 'دسته ها',
    defaultCategory: '(هیچ)',
    series: 'سریال',
    xyValues: 'مقادیر xy',
    paired: 'حالت جفت',
    axis: 'محور',
    navigator: 'هدایتگر',
    color: 'رنگ',
    tickness: 'ضخامت',
    xType: 'نوع x',
    outomatic: 'اتوماتیک',
    category: 'دسته',
    number: 'شماره',
    time: 'زمان',
    xRotaion: 'چرخش x',
    yRotaion: 'چرخش Y',
    ticks: 'کنه',
    width: 'عرض',
    height: 'ارتفاع',
    length: 'طول',
    padding: 'فاصله',
    spacing: 'فاصله گذاری',
    chart: 'نمودار',
    title: 'عنوان',
    titlePlaceholdr: 'عنوان نمودار - برای ویرایش دوبار کلیک کنید',
    bachground: 'پس زمینه',
    font: 'فونت',
    top: 'بالا',
    right: 'راست',
    bottom: 'پایین',
    left: 'چپ',
    labels: 'افسانه',
    size: 'اندازه',
    minSize: 'حداقل اندازه',
    maxSize: 'حداکثر اندازه',
    position: 'مقام',
    markerSize: 'اندازه نشانگر',
    markerStroke: 'حرکت نشانگر',
    markerPadding: 'پدینگ نشانگر',
    itemSpacing: 'فاصله مورد',
    itemPaddingX: 'پدینگ آیتم X',
    itemPaddingY: 'پدینگ آیتم Y',
    layoutHorizontalSpacing: 'فاصله افقی',
    layoutVarticalSpacing: 'فاصله عمدی',
    strokewidth: 'عرض ضربه',
    offSet: 'افست',
    offSets: 'افست ها',
    tooltips: 'نکات ابزار',
    callout: 'فراخوانی',
    markers: 'نشانگرها',
    shadow: 'سایه',
    blur: 'تار',
    xOffset: 'افست X',
    yOffset: 'افست Y',
    lineWidth: 'عرض خط',
    normal: 'عادی',
    bold: 'پررنگ',
    italic: 'مورب',
    boldItalic: 'پررنگ مورب',
    predefined: 'از پیش تعریف شده',
    fillOpacity: 'تاری انباشته',
    strokeOpacity: 'تاری خط',
    histogramBinCount: 'تعداد جعبه',
    columnGroup: 'ستون',
    barGroup: 'میله',
    pieGroup: 'پای',
    lineGroup: 'خط',
    scatterGroup: 'XY (اسکتر)',
    areaGroup: 'منطقه',
    histogramGroup: 'هیستوگرام',
    groupedColumnTooltip: 'گروه بندی',
    stackedColumnTooltip: 'انباشته شده',
    normalizedColumnTooltip: '100% انباشته شده',
    groupedBarTooltip: 'گروه بندی',
    stackedBarTooltip: 'انباشته شده',
    normalizedBarTooltip: '100% انباشته شده',
    pieTooltip: 'پای',
    doughnutTooltip: 'دونات',
    lineTooltip: 'Line',
    groupedAreaTooltip: 'Area',
    stackedAreaTooltip: 'انباشته شده',
    normalizedAreaTooltip: '100% انباشته شده',
    sccaterTooltip: 'اسکتر',
    bubbleTooltip: 'حباب',
    histogramTooltip: 'هیستوگرام',
    noDataToChart: 'داده ای برای ترسیم در دسترس نیست.',
    pivotChartRequiresPivotMode: 'نمودار محوری نیاز به فعال کردن حالت محوری دارد.',
    ChartSettingToolbarTooltip: 'منو',
    chartLinkToolbarTooltip: 'پیوند با جدول',
    chartUnlinkToolbarTooltip: 'لغو پیوند از جدول',
    chartDownloadToolbarTooltip: 'دانلود نمودار',
    ariaHidden: 'پنهان',
    ariaVisible: 'مرئی',
    ariaChecked: 'بررسی',
    ariaUnCkecked: 'چک نشده',
    ariaIndeterminate: 'نامعین',
    ariaColumnSelectAll: 'تغییر وضعیت انتخاب همه ستون ها',
    ariaInputEditor: 'ویرایشگر ورودی',
    ariaDateFilterInput: 'ورودی فیلتر تاریخ',
    ariaFilterInput: 'ورودی فیلتر',
    ariaFilterColumnsInput: 'ورودی ستون های فیلتر',
    ariaFilterValue: 'مقدار فیلتر',
    ariaFilterFromValue: 'فیلتر از مقدار',
    ariaFilterToValue: 'فیلتر به مقدار',
    ariaFilteringOprator: 'اپراتور فیلتر کردن',
    ariaColumnToggleVisibility: 'نمایش تغییر ستون',
    ariaColumnGroupToggleVisibility: 'تغییر نمای گروه ستون',
    ariaRowSelect: 'برای انتخاب این ردیف SPACE را فشار دهید',
    ariaRowDeselect: 'برای لغو انتخاب این سطر SPACE را فشار دهید',
    ariaRowToggleSelection: 'برای جابه جایی انتخاب ردیف  space را فشار دهید',
    ariaRowSeelectAll: 'برای جابه جایی انتخاب همه ردیف ها space را فشار دهید',
    ariaSearch: 'جستجو',
    ariaSearchFilterValue: 'مقادیر فیلتر جستجو',
  }
  private _textInputSearchStatusBar: string = '';
  set textInputSearchStatusBar(value: string) {
    this._textInputSearchStatusBar = value;
  }
  get textInputSearchStatusBar() {
    return this._textInputSearchStatusBar;
  }

  @Output() onRowSelect = new EventEmitter<IMagicEmitRowSelect<any>>();
  @Output() onCellEditing = new EventEmitter();

  private _data: any[] = [];
  @Input() set data(value: any[]) {
    this._data = value;
    this.agGrid?.api?.setRowData(value);
  }
  get data() {
    return this._data;
  }
  private _gridConfig: IMagicGridConfig = { columns: [] }
  @Input() set gridConfig(data: IMagicGridConfig) {
    this._gridConfig = data;
    statusBarGridConfig = data?.statusBar;
    const columnDefs: ColDef[] = [];
    for (let i = 0; i < data?.columns?.length; i++) {
      if (data?.columns[i]?.placementOrder == undefined || data?.columns[i]?.placementOrder == null) {
        if (data?.columns?.some(c => c?.placementOrder == i)) {
          data.columns[i].placementOrder = i + 0.1;
        } else {
          data.columns[i].placementOrder = i;
        }
      }
    }
    data.columns.sort((a, b) => (a.placementOrder ?? 0) < (b.placementOrder ?? 0) ? -1 : 1);
    data.columns.forEach(element => {

      const colIdColumn: ColIdColumn = new ColIdColumn();
      const columnDef: ColDef = {};
      if (element?.field)
        columnDef.field = element?.field;
      if (element?.headerName)
        columnDef.headerName = element?.headerName;

      if (element?.filter == false || element?.isButtonCell == true)
        columnDef.floatingFilter = false;
      else
        columnDef.floatingFilter = true;
      if (element?.filter == 'agNumberColumnFilter' || element?.filter == 'agTextColumnFilter' ||
        element?.filter == false || element?.filter == true) {
        columnDef.filter = element?.filter;
      } else if (element?.filter != undefined) {
        columnDef.filter = 'MagicGridFilterHeaderRendererComponent';
        this.frameWorkComponent['MagicGridFilterHeaderRendererComponent'] = MagicGridFilterHeaderRendererComponent
      }
      columnDef.suppressMenu = true;

      if (element?.cellRenderer) {
        if (element?.cellRenderer?.htmlRenderer) {
          columnDef.cellRenderer = function (params: any) {
            if (element?.cellRenderer?.htmlRenderer?.name) {
              return element.cellRenderer.htmlRenderer.call(element.cellRenderer.htmlRenderer,
                MagicGridValueGetterParamsHelper.getCellRendererParams(params)
              )
            }
            return '';
          }
        } else {
          columnDef.cellRenderer = String(element?.cellRenderer?.frameworkComponent?.propertyName);
          this.frameWorkComponent[columnDef.cellRenderer] = MagicGridCellRendererFrameworkComponent
        }
      }
      if (element?.format) {
        if (MagicTypeHelper.isIMagicFormatterType(element?.format)) {
          if (element.format.type == MagicFormatterTypeEnm.date) {
            if (element.format.input == MagicDateCalendarTypeEnm.gregorian || element.format.input == undefined) {
              if (element.format.output == MagicDateCalendarTypeEnm.shamsi || element.format.input == undefined) {
                columnDef.valueGetter = getValueGetterDate;
              }
            }
          }
        } else {
          columnDef.valueGetter = function (params: ValueGetterParams) {
            if ((element.format as any)?.name) {
              const valueGetterParam = MagicGridValueGetterParamsHelper.getCellRendererParams(params);
              return (element.format as any).call((element.format as any), valueGetterParam)
            }
            return '';
          }
        }
      }
      if (element.pinned) {
        columnDef.pinned = element.pinned;
      }
      if (element.sort != undefined) {
        columnDef.sortable = element.sort.sortable;
        columnDef.sort = element.sort.sort;
      } else {
        columnDef.sortable = true;
      }
      if (element?.isButtonCell) {
        columnDef.cellRenderer = this.nameCellBtnTable;
        this.frameWorkComponent[this.nameCellBtnTable] = MagicGridBtnRendererComponent
      }
      if (element.checkboxSelection) {
        columnDef.checkboxSelection = () => true;
      }
      if (element.headerCheckboxSelection) {
        columnDef.headerCheckboxSelection = element.headerCheckboxSelection
      }
      if (element.width)
        columnDef.width = element.width;
      if (element.maxWidth)
        columnDef.maxWidth = element.maxWidth;
      if (element.minWidth)
        columnDef.minWidth = element.minWidth;
      if (element.editable)
        if (typeof element.editable == 'boolean')
          columnDef.editable = element.editable
        else {
          colIdColumn.editable = element.editable.toString();
          columnDef.editable = getCallFunctioneEditable;
        }
      columnDef.colId = JSON.stringify(colIdColumn);
      if (element.style) {
        if ((element?.style as any)?.name) {
          columnDef.cellStyle = function (params: CellClassParams) {
            return (element?.style as any).call((element.style as any),
              MagicGridValueGetterParamsHelper.getCellRendererParams(params))
          }
        } else {
          columnDef.cellStyle = (element?.style as any);
        }
      }
      if (element?.rowGroup) {
        this.groupDefaultExpanded = element?.rowGroup?.groupDefaultExpanded;
        columnDef.rowGroup = element?.rowGroup?.isGroup;
        if (element?.rowGroup?.hide)
          columnDef.hide = element.rowGroup.hide;
        if (element.rowGroup.displayType)
          this.groupDisplayType = element.rowGroup.displayType;
      }
      if (element.flex != null || element.flex != undefined)
        columnDef.flex = element.flex;
      if (element.tooltip) {
        columnDef.tooltipField = element.field;
        columnDef.tooltipComponentParams = { 'tooltip': element.tooltip }
      }
      columnDefs.push(columnDef);
    });
    if (data?.autoGroup) {
      this.groupDefaultExpanded = -1;
      this.isTreeData = true;
      this.autoGroupColumnDef = {
        headerName: data?.autoGroup?.headerName,
        cellRendererParams: {
          supperessCount: data?.autoGroup?.suppressCount,
          checkbox: data.autoGroup?.checkBoxSelection,
        },
        width: data.autoGroup.width,
      }
    }
    if (this.masterDetail) {
      this.masterDetail = true;
      this.frameWorkComponent['myDetailCellRenderer'] = MagicGridMasterDetailRendererComponent;
      this.detailRowHeight = data.masterDetail?.height ?? 500;
    }
    if (!data.statusBar?.show) {
      this.statusBar.statusPanels = [];
    }
    if (data.rowMultiSelection == false) {
      this.rowSelection = 'single'
    } else if (data.rowMultiSelection) {
      this.rowSelection = 'multiple'
    }
    if (data.pagination) {
      this.pagination = data.pagination.status;
      if (data.pagination.countRecordPage > 0)
        this.paginationPageSize = data.pagination.countRecordPage;
    } else {

    }
    if (data.enableRtl)
      this.enableRtl = data?.enableRtl;
    if (data.noRowTemplate)
      this.noRowTemplate = data.noRowTemplate;
    if (data.pinnedTop) {
      this.gridApi?.setPinnedTopRowData(data.pinnedTop)
    }
    if (data?.pinnedBottom) {
      this.gridApi?.setPinnedBottomRowData(data?.pinnedBottom)
    }
    if (data?.suppressRowClickSelection)
      this.suppressRowClickSelection = true;
    if (data?.flex != null || data?.flex != undefined)
      this.defaultColDef.flex = data.flex;
    if (data?.filter == true || data?.filter == false)
      this.defaultColDef.filter = data.filter;
    if (data.rowBuffer != null && data.rowBuffer != undefined) {
      this.rowBuffer = data.rowBuffer;
    }
    this.columnDefs = [...columnDefs];
    this.setStyleGrid();

  }
  get gridConfig() {
    return this._gridConfig;
  }
  private _gridButtons: IMagicGridButton = { buttons: [] };
  @Input() set gridButtons(data: IMagicGridButton) {
    this._gridButtons = data;
    const index = this.columnDefs.findIndex(c => c?.cellRenderer == this.nameCellBtnTable);
    if (index >= 0) {
      this.columnDefs[index].width = widthCellBtnAgGrid(data);
      this.columnDefs = [...this.columnDefs];
    }
  }
  get gridButtons(): IMagicGridButton {
    return this._gridButtons;
  }
  private _loading: boolean = false;
  @Input() set loading(value: boolean) {
    this._loading = value;
    if (value == true) {
      setTimeout(() => {
        this.gridApi?.showLoadingOverlay();
      }, 0);
    } else {
      setTimeout(() => {
        this.gridApi?.hideOverlay();
      }, 0);
    }
  }
  get loading() {
    return this._loading;
  }

  private _showExpanded!: IMagicValueMasterDetail<any>;
  @Input() set showExpanded(model: IMagicValueMasterDetail<any>) {
    this._showExpanded = model;
    if (this.agGrid && model) {
      this.agGrid.api.forEachLeafNode(node => {
        if (node?.childIndex == model?.rowIndex) {
          if (node?.displayed) {
            node.setExpanded(false);
          } else {
            node.setExpanded(true);
          }
        } else if (!this.gridConfig?.masterDetail?.setting?.multiOpen) {
          node.setExpanded(false);
        }
      });
      if (!model?.notScrollingRow) {
        setTimeout(() => {
          this.scrollToIndex(model?.rowIndex);
        });
      }
    }
  }
  get showExpanded() {
    return this._showExpanded;
  }
  private _rowConfig!: IMagicGridRowConfig<any>;
  @Input() set rowConfig(value: IMagicGridRowConfig) {
    this._rowConfig = value;
    this.gridApi?.forEachNode(node => {
      if (value.isRowSelectable != undefined) {
        if (!value.isRowSelectable) {
          node.selectable = false;
        } else {
          const a: any = value?.isRowSelectable;
          if (a?.name) {
            const valueGetterParams = MagicGridValueGetterParamsHelper.getRowNode(node);
            const res = a.call(a, valueGetterParams);
            node.selectable = res;
          } else {
            node.selectable = a;
          }
        }
      }
      if (value.selected != undefined) {
        const a: any = value.selected;
        if (a?.name) {
          const valueGetterParams = MagicGridValueGetterParamsHelper.getRowNode(node);
          node.setSelected(a.call(a, valueGetterParams));
        } else {
          node.setSelected(a);
        }
      }
    })
  }
  get rowConfig() {
    return this._rowConfig;
  }

  rowData!: any[];
  isTreeData: boolean = false;

  scrollToIndex(index: number, posation: 'top' | 'bottom' = 'top') {
    if (index >= 0) {
      this.gridApi?.ensureIndexVisible(index, posation);
    }
  }
  isRowSelectable: IsRowSelectable = (rowNode: IRowNode) => {
    if (!this.rowConfig?.isRowSelectable)
      return true;
    else {
      const a: any = this.rowConfig?.isRowSelectable;
      if (a?.name) {
        const valueGetterParams = MagicGridValueGetterParamsHelper.getRowNode(rowNode);
        return a.call(a, valueGetterParams);
      } else {
        return a;
      }
    }
  }
  gridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowConfig = this._rowConfig;
    if (this.gridConfig.pinnedTop) {
      this.gridApi.setPinnedTopRowData(this.gridConfig.pinnedTop)
    }
    if (this.gridConfig.pinnedBottom) {
      this.gridApi.setPinnedBottomRowData(this.gridConfig.pinnedBottom)
    }
    this.gridApi.setSuppressRowDrag(true);
  }
  rowSelected(model: any) {
    const select: any[] | undefined = this.agGrid?.api.getSelectedNodes();
    const selectIndex: any[] = [];
    if (select) {
      select.forEach(element => {
        selectIndex.push(element?.data);
      })
    }
    let rowClick = this.agGrid?.rowData;
    if (rowClick) {
      rowClick = rowClick[model.rowIndex];
    }
    const send: IMagicEmitRowSelect<any> = {
      data: selectIndex,
      rowIndex: model?.rowIndex,
      rowClick: model?.data,
      isAdd: selectIndex.some(d => d == model?.daa),
      child: {
        rowIndex: model?.node?.childIndex,
        level: model?.node?.level
      },
      dataCell: model?.data,
    }
    this.onRowSelect.emit(send);
  }
  cellEditingstopped() {
    this.onCellEditing.emit();
  }
  getRowHeight(data: any) {
    if (data?.node.detail) {
      return this.detailRowHeight;
    } else
      return 28;
  }
  getDataPath: GetDataPath = (data: any) => {
    let list: string[] = [];
    if (this.gridConfig.autoGroup?.field?.length) {
      list = this.gridConfig.autoGroup?.field.split('.');
    }
    return this.getDataOption(list, data)
  }
  getDataOption(list: string[], item: any) {
    let res = item;
    for (let i = 0; i < list.length; i++) {
      res = res[list[i]];
    }
    return res
  }
  getRowStyle = (params: RowClassParams) => {
    if (!this.gridConfig.rowStyle)
      return {};
    var model = MagicGridValueGetterParamsHelper.getCellRendererParams(params);
    const res = this.gridConfig.rowStyle(model);
    return res;
  }
  cellClicked(model: CellClickedEvent) {
    if (!model.colDef.field)
      return;
    const index = this.gridConfig.columns.findIndex(c => c.field == model?.colDef?.field);
    if (index < 0)
      return;
    const params: IValueGetterParams<any> = MagicGridValueGetterParamsHelper.getCellRendererParams(model);
    if (this.gridConfig.columns[index]?.click)
      this.gridConfig.columns[index]?.click!(params);
  }
  rowClicked(model: RowClickedEvent) {
    const rowNode = this.gridApi?.getDisplayedRowAtIndex(model?.rowIndex ?? -1);
    if (rowNode)
      this.gridApi?.flashCells({
        rowNodes: [rowNode]
      })
  }
  exportDataAsExcel() {
    this.gridApi?.exportDataAsExcel();
  }
  exportDataAsCsv() {
    this.gridApi?.exportDataAsCsv();
  }
  isExternalFilterPresent(): boolean {
    if (!statusBarGridConfig?.externalFilter?.name?.length)
      return false;
    return true;
  }
  doesExternalFilterPass(node: RowNode) {
    if (node.data) {
      const data: IMagicGridConfigStatusBarIsFilter<any> = {
        value: node?.data,
        textSearch: this.textInputSearchStatusBar,
      }
      if (statusBarGridConfig?.externalFilter?.name?.length)
        return statusBarGridConfig.externalFilter.call(statusBarGridConfig.externalFilter, data);
    }
    return true;
  }
  styleBodyGrid: MagicStyleType = {} = {};
  setStyleGrid() {
    this.styleBodyGrid = {};
    let domLayout: 'autoHeight' | 'normal' = 'normal';
    if (this.gridConfig?.height) {
      if (this.gridConfig?.height?.type == 'auto') {
        this.styleBodyGrid['height'] = 'auto';
        domLayout = 'autoHeight'
      } else {
        this.styleBodyGrid['height'] = this.gridConfig.height.size + this.gridConfig.height.type;
      }
      if (this.gridConfig?.height?.min || this.gridConfig?.height?.max) {
        if (this.gridConfig?.height?.max) {
          this.styleBodyGrid['max-height'] = this.gridConfig?.height?.max?.size + this.gridConfig?.height?.max?.type;
        }
        if (this.gridConfig?.height?.min) {
          this.styleBodyGrid['max-height'] = this.gridConfig?.height?.min?.size + this.gridConfig?.height?.min?.type;
        }
        const nativeElementAgGrid: HTMLElement = (this.agGrid as any)?._nativeElement;
        if (nativeElementAgGrid) {
          const rootWrapperElement = this.findElementByClassName(nativeElementAgGrid, 'ag-root-wrapper');
          if (rootWrapperElement) {
            const rootWrapperBodyElement = this.findElementByClassName(rootWrapperElement, 'ag-root-wrapper-body');
            if (rootWrapperBodyElement) {
              const rootElement = this.findElementByClassName(rootWrapperBodyElement, 'ag-root');
              if (rootElement) {
                const bodyViewportElement = this.findElementByClassName(rootElement, 'ag-body-viewport');
                if (bodyViewportElement) {
                  const heightHeaderAndFooter = ((this.findElementByClassName(rootElement, 'ag-body-viewport')?.clientHeight) ?? 0) +
                    ((this.findElementByClassName(rootWrapperElement, 'status-bar')?.clientHeight) ?? 0)
                  if (this.gridConfig?.height?.max?.size) {
                    (bodyViewportElement as HTMLElement).style.maxHeight =
                      `calc(${String(this.gridConfig?.height?.max?.size) + this.gridConfig?.height?.max?.type} - ${heightHeaderAndFooter}px)`;
                  }
                  if (this.gridConfig?.height?.min?.size) {
                    (bodyViewportElement as HTMLElement).style.minHeight =
                      `calc(${String(this.gridConfig?.height?.min?.size) + this.gridConfig?.height?.min?.type} - ${heightHeaderAndFooter}px)`;
                  }
                  (bodyViewportElement as HTMLElement).style.overflow = 'auto';
                }
              }
            }
          }
        }
      }
    } else {
      this.styleBodyGrid['height'] = '50vh';
    }
    this.gridApi?.setDomLayout(domLayout);
  }
  findElementByClassName(model: HTMLElement | Element, className: string) {
    return Array.from(model?.children)?.find(ch => Array.from(ch?.classList)?.some(c => c == className));
  }
}


var widthCellBtnAgGrid = function (sharedBtnTable: IMagicGridButton): number {
  const countButtom: number = sharedBtnTable.buttons.length;
  if (countButtom == 1) return 48;
  if (countButtom == 2) return 72;
  if (countButtom == 3) return 105;
  if (countButtom == 4) return 140;
  if (countButtom == 5) return 165;
  if (countButtom == 6) return 190;
  if (countButtom == 7) return 220;
  if (countButtom == 8) return 260;
  if (countButtom == 9) return 290;
  if (countButtom == 10) return 325;
  return countButtom * 36;
}
var getCallFunctioneEditable = function (data: EditableCallbackParams): boolean {
  const colIdColumn: ColIdColumn = JSON.parse(data?.column?.getColId());
  const valueGetterParams = MagicGridValueGetterParamsHelper.getCellRendererParams(data);
  const fun = new Function('return ' + colIdColumn?.editable)();
  return fun(valueGetterParams)
}
var statusBarGridConfig: IMagicGridConfigStatusBar<any> | undefined;

class ColIdColumn {
  checkBoxSelection?: string;
  editable?: string;
}