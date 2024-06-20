import { CellClassParams, CellClickedEvent, EditableCallback, EditableCallbackParams, ICellRendererParams, IRowNode, RowClassParams, RowNode, ValueGetterParams } from "ag-grid-community";
import { IValueGetterParams } from '../other/model/interface/magicGrid.interface';

export class MagicGridValueGetterParamsHelper {
    static getCellRendererParams(params: EditableCallbackParams | ICellRendererParams | RowClassParams | CellClassParams | ValueGetterParams): IValueGetterParams {
        return {
            data: params.data,
            rowIndex: params?.node?.childIndex ?? -1,
            id: +(params?.node?.id ?? 0),
            detailNode: {
                display: params?.node?.displayed ?? false
            },
        }
    }
    static getRowNode(params: IRowNode): IValueGetterParams {
        return {
            data: params.data,
            rowIndex: params.childIndex ?? -1,
            id: +(params?.id ?? 0),
            detailNode: {
                display: params?.displayed ?? false,
            }
        }
    }
}