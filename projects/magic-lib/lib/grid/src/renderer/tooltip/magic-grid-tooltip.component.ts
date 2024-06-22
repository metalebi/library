import { Component } from '@angular/core';
import { ITooltipAngularComp } from 'ag-grid-angular';
import { ITooltipParams } from 'ag-grid-community';
import { MagicGridValueGetterParamsHelper } from '../../magic-grid-value-getter-params-helper';
import { IMagicGridColumnTooltipParams, IValueGetterParams } from 'projects/magic-lib/lib/other/model/interface/magicGrid.interface';
import { MagicStyleType } from 'projects/magic-lib/lib/other/helper/type/defult.type';

@Component({
  selector: 'me-magic-grid-tooltip',
  templateUrl: './magic-grid-tooltip.component.html',
  styleUrls: ['./magic-grid-tooltip.component.css']
})
export class MagicGridTooltipComponent implements ITooltipAngularComp {
  constructor() { }
  agInit(params: any): void {
    this.params = params;
    this.value = this.getCallFunction(params?.tooltip?.text);
    this.styleBody = this.getCallFunctionStyle(params?.tooltip?.styleBody ?? {});
    this.styleText = this.getCallFunctionStyle(params?.tooltip?.styleText ?? {});
  }
  private params!: IMagicGridColumnTooltipParams & ITooltipParams;
  value!: string;
  styleBody: MagicStyleType = {}
  styleText: MagicStyleType = {}
  getCallFunction(model?: string | ((params: IValueGetterParams<any>) => string)): string {
    if ((model as any)?.name)
      return (model as any).call((model as any), MagicGridValueGetterParamsHelper.getCellRendererParams(this.params));
    return (model as any)
  }
  getCallFunctionStyle(model: MagicStyleType | ((params: IValueGetterParams<any>) => MagicStyleType)): MagicStyleType {
    if ((model as any)?.name)
      return (model as any).call((model as any), MagicGridValueGetterParamsHelper.getCellRendererParams(this.params));
    return (model as any);
  }
}
