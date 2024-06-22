import { ComponentType } from "ag-grid-community";
import { MagicButtonType, MagicColorType, MagicSizeType, MagicStylePropertyType } from "../../helper/type/defult.type";
import { IMagicFormatterType } from "./magicFormatterType.interface";


export interface IMagicGridButton<T = any> {
    size?: MagicSizeType;
    buttons: IMagicGridButtonConfig<T>[];
}
export interface IMagicGridButtonConfig<T = any> {
    icon?: string | ((params: IValueGetterParams<T>) => string);
    image?: string | ((params: IValueGetterParams<T>) => string);
    color?: MagicColorType | ((params: IValueGetterParams<T>) => MagicColorType);
    tooltip?: string | ((params: IValueGetterParams<T>) => string);
    countBadge?: string | ((params: IValueGetterParams<T>) => string);
    click: (data: IValueGetterParams<T>) => void;
    disabled?: (data: IValueGetterParams<T>) => boolean;
    show?: (data: IValueGetterParams<T>) => boolean;
    children?: IMagicGridButtonConfig<T>[];
}
export interface IMagicGridConfig<T = any> {
    columns: MagicGridColumns<T>[];
    autoGroup?: MagicGridColumnAutoGroup<T>;
    height?: IMagicHeightPage;
    statusBar?: IMagicGridConfigStatusBar<T>;
    rowMultiSelection?: boolean;
    pagination?: IMagicPagination;
    enableRtl?: boolean;
    noRowTemplate?: string;
    pinnedTop?: any[];
    pinnedBottom?: any[];
    suppressRowClickSelection?: boolean;
    header?: IMagicGridConfigHeader;
    masterDetail?: IMagicGridMasterDetail;
    flex?: 1 | 0;
    rowStyle?: (data: IValueGetterParams<T>) => MagicStyleType;
    filter?: boolean;
    rowBuffer?: number;
}
export interface IMagicGridRowConfig<T = any> {
    isRowSelectable?: boolean | ((params: IValueGetterParams<T>) => boolean);
    selected?: boolean | ((params: IValueGetterParams<T>) => boolean);
}
export interface IMagicValueMasterDetail<T, O = any> {
    otherData?: O;
    data: T;
    rowIndex: number;
    key?: string;
    notScrollingRow?: boolean;
}
export interface IMagicGridConfigHeader {
    button: {
        isAbsolute?: boolean;
        textAlign?: 'left' | 'right';
        buttons: IMagicGridConfigButtonHeader[];
    }
}
export interface IMagicGridConfigButtonHeader {
    icon?: string;
    color?: MagicColorType;
    title: string;
    disabled?: boolean | (() => boolean);
    onlyIcon?: boolean;
    type?: MagicButtonType;
    click?: () => void;
}
export interface IMagicPagination {
    status: boolean;
    countRecordPage: number;
}
export interface IMagicGridMasterDetail {
    component: ComponentType;
    height: number;
    setting?: IMagicGridMasterDetailSetting;
}
export interface IMagicGridMasterDetailSetting {
    multiOpen?: boolean;

}
export interface IValueGetterParams<T = any> {
    data: T;
    rowIndex: number;
    id: number;
    detailNode?: IValueGetterParamsDetailNode;
    key?: string;
}
export interface IValueGetterParamsDetailNode {
    display: boolean;
}
export interface MagicGridColumns<T = any> {
    field: string;
    headerName: string;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    filter?: 'agMultiColumnFilter' | 'agDateColumnFilter' | 'agNumberColumnFilter' | 'agTextColumnFilter' | boolean | IMagicGridColumnFilter<T>;
    pinned?: 'left' | 'right';
    placementOrder?: number;
    checkboxSelection?: boolean | undefined;
    headerCheckboxSelection?: boolean;
    isButtonCell?: boolean;
    cellRenderer?: IMagicGridColumnCellRenderer<T>;
    format?: IMagicFormatterType | ((params: IValueGetterParams<T>) => any);
    sort?: IMagicGridColumnSort;
    editable?: boolean | ((params: IValueGetterParams<T>) => MagicStyleType);
    click?: (params: IValueGetterParams<T>) => void;
    style?: MagicStyleType | ((params: IValueGetterParams<T>) => MagicStyleType);
    rowGroup?: IMagicGridColumnRowGroup;
    flex?: 1 | 0;
    tooltip?: IMagicGridColumnTooltip<T>;
}
export interface IMagicGridColumnRowGroup {
    isGroup: boolean;
    hide?: boolean;
    displayType?: 'singleColumn' | 'multipleColumn' | 'groupRows' | 'custom';
    groupDefaultExpanded?: number;
}
export interface IMagicGridColumnSort {
    sortable?: boolean;
    sort?: 'asc' | 'desc';
}
export interface IMagicGridColumnCellRenderer<T> {
    frameworkComponent?: ComponentType;
    otherData?: (params: IValueGetterParams<T>) => any;
    htmlRenderer?: (params: IValueGetterParams<T>) => string;
}
export interface IMagicGridColumnFilter<T = any> {
    filterListItems: () => string[];
    isFilter: ((request: IMagicGridColumnFilterIsFilter<T>) => boolean);
}
export interface MagicGridColumnAutoGroup<T> {
    suppressCount?: boolean;
    headerName?: string;
    field: string;
    dataGridPath?: (data: IValueGetterParams<T>) => any[];
    checkBoxSelection?: boolean;
    width?: number;
}
export interface IMagicHeightPage {
    size: number;
    type: '%' | 'px' | 'vh' | 'auto';
    max?: IMagicHeightPageMaxOrMin;
    min?: IMagicHeightPageMaxOrMin;
}
export interface IMagicHeightPageMaxOrMin {
    size: number;
    type: '%' | 'px' | 'vh';
}
export interface IMagicEmitRowSelect<T> {
    data: T[];
    rowIndex: number;
    rowClick: T;
    isAdd: boolean;
    child?: {
        rowIndex: number;
        level: number;
    }
    dataCell: T;
}
export interface IMagicGridConfigStatusBar<T> {
    show?: boolean;
    externalFilter?: ((request: IMagicGridConfigStatusBarIsFilter<T>) => boolean)
}
export interface IMagicGridConfigStatusBarIsFilter<T> {
    value: T;
    textSearch: string;
}
export interface IMagicGridColumnTooltipParams<T = any> {
    tooltip: IMagicGridColumnTooltip<T>;
}
export interface IMagicGridColumnTooltip<T = any> {
    text: string | ((data: IValueGetterParams<T>) => string);
    styleText?: MagicStyleType | ((params: IValueGetterParams<T>) => MagicStyleType)
    styleBody?: MagicStyleType | ((params: IValueGetterParams<T>) => MagicStyleType)
}
export type groupDisplayType = 'singleColumn' | 'multipleColumns' | 'groupRows' | 'custom';
export type MagicStyleType = {
    [key in MagicStylePropertyType]?: string | number;
}
export interface MagicGridColumnFilter<T=any> {
    filterListItems: () => string[];
    isFilter: ((request: IMagicGridColumnFilterIsFilter<T>) => boolean)
}
export interface IMagicGridColumnFilterIsFilter<T = any> {
    selectedItem: string[];
    value: T;
}
export class MagicGridFilterChecked {
    title!: string;
    checked!: boolean;
    isMain?: 'full' | 'empty' | 'someChecked';
}